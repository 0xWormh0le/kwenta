import { SynthPrice, PricesMap, PriceType } from '@kwenta/sdk/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { notifyError } from 'components/ErrorNotifier'
import { selectPrices } from 'state/prices/selectors'
import { AppThunk } from 'state/store'
import { ThunkConfig } from 'state/types'
import { getPricesInfo } from 'utils/prices'
import proxy from 'utils/proxy'

import { setOffChainPrices, setOnChainPrices } from './reducer'

export const updatePrices =
	(newPrices: PricesMap<string>, type: PriceType): AppThunk =>
	(dispatch, getState) => {
		const { prices } = getState()
		if (type === 'off_chain') {
			dispatch(setOffChainPrices(getPricesInfo(prices.offChainPrices, newPrices)))
		} else {
			dispatch(setOnChainPrices(getPricesInfo(prices.onChainPrices, newPrices)))
		}
	}

export const fetchPreviousDayPrices = createAsyncThunk<
	SynthPrice[],
	boolean | undefined,
	ThunkConfig
>('prices/fetchPreviousDayPrices', async (mainnet, { getState }) => {
	try {
		const prices = selectPrices(getState())
		const marketAssets = Object.keys(prices)

		const { data: laggedPrices } = await proxy.get('prices/previous-day-prices', {
			params: {
				marketAssets,
				networkId: mainnet,
			},
		})

		return laggedPrices
	} catch (err) {
		notifyError('Failed to fetch historical prices', err)
		throw err
	}
})
