import KwentaSDK from '@kwenta/sdk'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { notifyError } from 'components/ErrorNotifier'
import { ThunkConfig } from 'state/types'
import logError from 'utils/logError'
import proxy from 'utils/proxy'

import { selectLeaderboardSearchTerm } from './selectors'

export const fetchLeaderboard = createAsyncThunk<
	Awaited<ReturnType<KwentaSDK['stats']['getLeaderboard']>>,
	void,
	ThunkConfig
>('stats/fetchLeaderboard', async (_, { getState }) => {
	const searchTerm = selectLeaderboardSearchTerm(getState())

	try {
		return await proxy
			.get('stats/leader-board', {
				params: {
					searchTerm,
				},
			})
			.then((response) => response.data)
	} catch (error) {
		logError(error)
		notifyError(error)
		throw error
	}
})
