import KwentaSDK from '@kwenta/sdk'
import { PerpsMarketV2 } from '@kwenta/sdk/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { providers } from 'ethers'

import { notifyError } from 'components/ErrorNotifier'
import { ThunkConfig } from 'state/types'
import { serializeV2Markets } from 'utils/futures'
import logError from 'utils/logError'
import proxy from 'utils/proxy'

export const fetchOptimismMarkets = createAsyncThunk<
	{ markets: PerpsMarketV2<string>[] },
	providers.Provider,
	ThunkConfig
>('home/fetchOptimismMarkets', async () => {
	// For the home page we always fetch OP mainnet markets
	const { data: markets } = await proxy.get('futures/markets', { params: { networkId: 10 } })
	const serializedMarkets = serializeV2Markets(markets)
	return { markets: serializedMarkets }
})

export const fetchFuturesStats = createAsyncThunk<
	Awaited<ReturnType<KwentaSDK['stats']['getFuturesStats']>>,
	void,
	ThunkConfig
>('home/fetchFuturesStats', async () => {
	try {
		return await proxy.get('stats/future-stats').then((response) => response.data)
	} catch (error) {
		logError(error)
		notifyError('Failed to fetch futures stats', error)
		throw error
	}
})
