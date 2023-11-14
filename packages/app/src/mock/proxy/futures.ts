import { MOCK_TRADE_PREVIEW, SDK_MARKETS } from '../../../testing/unit/mocks/data/futures'

import mock from './adapter'

mock.onGet('futures/cumulative-stats').reply(200, {
	totalVolume: '0',
	averageTradeSize: '0',
	totalTraders: '0',
	totalTrades: '0',
	totalLiquidations: '0',
})

mock.onPost('futures/trades').reply(200, [])

mock.onGet('futures/aggregate-stats').reply(200, {})

mock.onGet('futures/position-history').reply(200, [])

mock.onGet('futures/market-funding-rates-history').reply(200, [])

mock.onGet('futures/markets').reply(200, SDK_MARKETS)

mock.onGet('futures/smart-margin-balance-info').reply(200, {
	freeMargin: 0,
	keeperEthBal: 0,
	allowance: 0,
	walletEthBal: 0,
	balances: {},
	allowances: {},
})

mock.onGet('futures/future-positions').reply(200, [])

mock.onGet('futures/smart-margin-accounts').reply(200, [])

mock.onGet('futures/daily-volumes').reply(200, {})

mock.onGet('futures/conditional-orders').reply(200, [])

mock.onGet('futures/delayed-orders').reply(200, [])

mock.onGet('futures/smart-margin-trade-preview').reply(200, MOCK_TRADE_PREVIEW)

mock.onGet('futures/position-history').reply(200, [])

mock.onGet('futures/trades-for-markets').reply(200, [])

mock.onGet('futures/all-trades').reply(200, [])

mock.onGet('futures/market-margin-transfers').reply(200, [])

mock.onGet('futures/smart-margin-account-transfers').reply(200, [])

mock.onGet('futures/smart-margin-accounts').reply(200, [])

mock.onGet('futures/market-funding-rates-history').reply(200, [])
