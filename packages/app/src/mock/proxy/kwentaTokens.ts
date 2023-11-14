import mock from './adapter'

mock.onGet('kwenta-token/earn-details').reply(200, {
	balance: 0,
	endDate: 0,
	totalSupply: 0,
	lpTokenBalance: 0,
	allowance: 0,
	wethAmount: 0,
	kwentaAmount: 0,
	lpTotalSupply: 0,
})

mock.onGet('kwenta-token/earn-token-prices').reply(200, {
	kwentaPrice: 0,
	wethPrice: 0,
	opPrice: 0,
})

mock.onGet('kwenta-token/futures-fee').reply(200, 0)

mock.onGet('kwenta-token/futures-fee-for-account').reply(200, 0)

mock.onGet('kwenta-token/kwenta-rewards-by-epoch').reply(200, 0)

mock.onGet('kwenta-token/escrow-data').reply(200, {
	escrowData: [],
	totalVestable: 0,
})

mock.onGet('kwenta-token/escrow-v2-data').reply(200, {
	escrowData: [],
	totalVestable: 0,
})

mock.onGet('kwenta-token/estimated-rewards').reply(200, {
	estimatedKwentaRewards: 0,
	estimatedOpRewards: 0,
})

mock.onGet('kwenta-token/staking-data').reply(200, {
	rewardEscrowBalance: 0,
	stakedNonEscrowedBalance: 0,
	stakedEscrowedBalance: 0,
	claimableBalance: 0,
	kwentaBalance: 0,
	weekCounter: 0,
	totalStakedBalance: 0,
	vKwentaBalance: 0,
	vKwentaAllowance: 0,
	kwentaAllowance: 0,
	epochPeriod: 0,
	veKwentaBalance: 0,
	veKwentaAllowance: 0,
})

mock.onGet('kwenta-token/staking-v2-data').reply(200, {
	rewardEscrowBalance: 0,
	stakedNonEscrowedBalance: 0,
	stakedEscrowedBalance: 0,
	claimableBalance: 0,
	totalStakedBalance: 0,
	stakedResetTime: 0,
	kwentaStakingV2Allowance: 0,
})

mock.onGet('kwenta-token/claimable-all-rewards').reply(200, {
	claimableRewards: [],
	totalRewards: 0,
})
