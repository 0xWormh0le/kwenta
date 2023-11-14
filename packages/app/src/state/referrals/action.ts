import { REFERRAL_PROGRAM_START_EPOCH } from '@kwenta/sdk/constants'
import { TransactionStatus } from '@kwenta/sdk/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { wei } from '@synthetixio/wei'

import { notifyError } from 'components/ErrorNotifier'
import { REFFERAL_TIERS } from 'sections/referrals/constants'
import {
	ReferralTiers,
	ReferralsRewardsPerCode,
	ReferralsRewardsPerEpoch,
} from 'sections/referrals/types'
import { calculateTotal } from 'sections/referrals/utils'
import { monitorAndAwaitTransaction } from 'state/app/helpers'
import { handleTransactionError, setOpenModal, setTransaction } from 'state/app/reducer'
import {
	selectEpochData,
	selectEpochPeriod,
	selectTradingRewardsSupportedNetwork,
} from 'state/staking/selectors'
import { ThunkConfig } from 'state/types'
import { selectWallet } from 'state/wallet/selectors'
import logError from 'utils/logError'
import proxy from 'utils/proxy'

import { setMintedBoostNft } from './reducer'

export const mintBoostNft = createAsyncThunk<void, string, ThunkConfig>(
	'referrals/mintBoostNft',
	async (referralCode, { dispatch, getState, extra: { sdk } }) => {
		const wallet = selectWallet(getState())
		const supportedNetwork = selectTradingRewardsSupportedNetwork(getState())

		try {
			if (!wallet) throw new Error('Wallet not connected')
			if (!supportedNetwork)
				throw new Error(
					'Minting Boost NFT is unsupported on this network. Please switch to Optimism.'
				)

			dispatch(
				setTransaction({
					status: TransactionStatus.AwaitingExecution,
					type: 'mint_boost_nft',
					hash: null,
				})
			)

			const tx = await sdk.referrals.mintBoostNft(referralCode)
			await monitorAndAwaitTransaction(dispatch, tx)
			dispatch(fetchBoostNftForAccount())
			dispatch(setMintedBoostNft(true))
		} catch (err) {
			logError(err)
			dispatch(handleTransactionError(err.message))
			throw err
		}
	}
)

export const createNewReferralCode = createAsyncThunk<void, string, ThunkConfig>(
	'referrals/createReferralCode',
	async (referralCode, { dispatch, getState, extra: { sdk } }) => {
		const wallet = selectWallet(getState())
		const supportedNetwork = selectTradingRewardsSupportedNetwork(getState())

		try {
			if (!wallet) throw new Error('Wallet not connected')
			if (!supportedNetwork)
				throw new Error(
					'Creating new code is unsupported on this network. Please switch to Optimism.'
				)

			dispatch(
				setTransaction({
					status: TransactionStatus.AwaitingExecution,
					type: 'register_referral_code',
					hash: null,
				})
			)
			const tx = await sdk.referrals.registerReferralCode(referralCode)
			await monitorAndAwaitTransaction(dispatch, tx)
			dispatch(fetchReferralCodes())
			dispatch(setOpenModal(null))
		} catch (err) {
			logError(err)
			dispatch(handleTransactionError(err.message))
			throw err
		}
	}
)

export const fetchUnmintedBoostNftForCode = createAsyncThunk<ReferralTiers, string, ThunkConfig>(
	'referrals/fetchUnmintedBoostNftForCode',
	async (code, { getState }) => {
		const supportedNetwork = selectTradingRewardsSupportedNetwork(getState())

		try {
			if (!supportedNetwork)
				throw new Error('Boost NFT is unsupported on this network. Please switch to Optimism.')
			return await proxy
				.get('referrals/tier-by-referral-code', { params: { code } })
				.then((response) => response.data)
		} catch (err) {
			logError(err)
			notifyError('Failed to fetch Boost NFT for referral code.', err)
			return ReferralTiers.INVALID
		}
	}
)

export const checkSelfReferredByCode = createAsyncThunk<boolean, string, ThunkConfig>(
	'referrals/fetchReferrerByCode',
	async (code, { getState }) => {
		try {
			const wallet = selectWallet(getState())
			const { data: owner } = await proxy.get('referrals/referrer-by-code', { params: { code } })
			return wallet && owner ? wallet.toLowerCase() === owner.toLowerCase() : false
		} catch (err) {
			logError(err)
			notifyError('Failed to fetch referrer by referral code.', err)
			return false
		}
	}
)

export const fetchBoostNftForAccount = createAsyncThunk<ReferralTiers, void, ThunkConfig>(
	'referrals/fetchTraderNftForAccount',
	async (_, { getState }) => {
		try {
			const wallet = selectWallet(getState())
			if (!wallet) return ReferralTiers.INVALID
			return await proxy
				.get('referrals/boost-nft-tier-by-holder', { params: { account: wallet } })
				.then((response) => response.data)
		} catch (err) {
			logError(err)
			notifyError('Failed to fetch Boost NFT for account', err)
			return ReferralTiers.INVALID
		}
	}
)

export const fetchBoostNftMinted = createAsyncThunk<boolean, void, ThunkConfig>(
	'referrals/fetchBoostNftMinted',
	async (_, { getState }) => {
		try {
			const wallet = selectWallet(getState())
			if (!wallet) return false
			return await proxy
				.get('referrals/check-nft-minted-for-account', {
					params: { account: wallet },
				})
				.then((response) => response.data)
		} catch (err) {
			logError(err)
			notifyError('Failed to check Boost NFT for account', err)
			return false
		}
	}
)

export const fetchReferralEpoch = createAsyncThunk<ReferralsRewardsPerEpoch[], void, ThunkConfig>(
	'referrals/fetchReferralEpoch',
	async (_, { getState, extra: { sdk } }) => {
		try {
			const wallet = selectWallet(getState())
			if (!wallet) return []
			const epochData = selectEpochData(getState())
			if (!epochData) return []
			const epochPeriod = selectEpochPeriod(getState())
			const statsPerEpoch: ReferralsRewardsPerEpoch[] = await Promise.all(
				epochData
					.slice(REFERRAL_PROGRAM_START_EPOCH)
					.sort((a, b) => Number(b.period) - Number(a.period))
					.map(async ({ period, start, end }) => {
						const { data: referralEpoch } = await proxy.get(
							'referrals/cumulative-stats-by-referrer-and-epoch-time',
							{
								params: {
									account: wallet,
									start,
									end,
								},
							}
						)

						const kwentaRewards =
							period !== Number(epochPeriod)
								? await proxy
										.get('kwenta-token/kwenta-rewards-by-epoch', {
											params: {
												epochPeriod: period,
											},
										})
										.then((response) => response.data)
								: wei(0)
						const referralVolume = calculateTotal(referralEpoch, 'referralVolume')
						const referredCount = calculateTotal(referralEpoch, 'referredCount')
						const tradesCount = calculateTotal(referralEpoch, 'tradesCount')

						return {
							epoch: period.toString(),
							referralVolume: referralVolume.toString(),
							referredCount: referredCount.toString(),
							earnedRewards: kwentaRewards.toString(),
							tradesCount: tradesCount.toString(),
						}
					})
			)

			return statsPerEpoch
		} catch (err) {
			logError(err)
			notifyError('Failed to fetch referral rewards per epoch', err)
			return []
		}
	}
)

export const fetchReferralNftForAccount = createAsyncThunk<ReferralTiers, void, ThunkConfig>(
	'referrals/fetchReferralNft',
	async (_, { getState }) => {
		try {
			const wallet = selectWallet(getState())
			if (!wallet) return ReferralTiers.BRONZE
			const { data: tier } = await proxy.get('referrals/referral-nft-tier-by-referrer', {
				params: {
					account: wallet,
				},
			})
			return tier ?? ReferralTiers.BRONZE
		} catch (err) {
			logError(err)
			notifyError('Failed to fetch Referral NFT for account', err)
			return ReferralTiers.BRONZE
		}
	}
)

export const fetchReferralScoreForAccount = createAsyncThunk<number, void, ThunkConfig>(
	'referrals/fetchReferralScoreForAccount',
	async (_, { getState }) => {
		try {
			const wallet = selectWallet(getState())
			if (!wallet) return 0
			const { data: score } = await proxy.get('referrals/referral-score-by-referrer', {
				params: {
					account: wallet,
				},
			})
			const maxScore = REFFERAL_TIERS[ReferralTiers.GOLD].threshold
			return Math.min(maxScore, wei(score).toNumber()) ?? 0
		} catch (err) {
			logError(err)
			notifyError('Failed to fetch referral score for account', err)
			return 0
		}
	}
)

export const fetchReferralCodes = createAsyncThunk<ReferralsRewardsPerCode[], void, ThunkConfig>(
	'referrals/fetchReferralCodes',
	async (_, { getState }) => {
		try {
			const wallet = selectWallet(getState())
			const period = Number(selectEpochPeriod(getState()))
			if (!wallet || !period) return []
			return await proxy
				.get('referrals/cumulative-stats-by-referrer-and-epoch', {
					params: {
						account: wallet,
						period,
					},
				})
				.then((response) => response.data)
		} catch (err) {
			logError(err)
			notifyError('Failed to fetch cumulative stats by referral codes', err)
			return []
		}
	}
)

export const fetchAllReferralData = createAsyncThunk<void, void, ThunkConfig>(
	'referrals/fetchAllReferralData',
	async (_, { dispatch }) => {
		dispatch(fetchBoostNftMinted())
		dispatch(fetchBoostNftForAccount())
		dispatch(fetchReferralScoreForAccount())
		dispatch(fetchReferralNftForAccount())
		dispatch(fetchReferralCodes())
		dispatch(fetchReferralEpoch())
	}
)
