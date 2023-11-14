import mock from './adapter'

mock.onGet('stats/future-stats').reply(200, [])

mock.onGet('stats/leader-board').reply(200, {
	top: [
		{
			account: 'mock account',
			pnlWithFeesPaid: 0,
			liquidations: 0,
			totalTrades: 9,
			totalVolume: 0,
			trader: '',
			traderShort: '',
			rank: 1,
			rankText: '1',
		},
	],
	bottom: [
		{
			account: 'mock account',
			pnlWithFeesPaid: 0,
			liquidations: 0,
			totalTrades: 9,
			totalVolume: 0,
			trader: '',
			traderShort: '',
			rank: 1,
			rankText: '1',
		},
	],
	wallet: [
		{
			account: 'mock account',
			pnlWithFeesPaid: 0,
			liquidations: 0,
			totalTrades: 9,
			totalVolume: 0,
			trader: '',
			traderShort: '',
			rank: 1,
			rankText: '1',
		},
	],
	search: [
		{
			account: 'mock account',
			pnlWithFeesPaid: 0,
			liquidations: 0,
			totalTrades: 9,
			totalVolume: 0,
			trader: '',
			traderShort: '',
			rank: 1,
			rankText: '1',
		},
	],
	all: [
		{
			account: 'mock account',
			pnlWithFeesPaid: 0,
			liquidations: 0,
			totalTrades: 9,
			totalVolume: 0,
			trader: '',
			traderShort: '',
			rank: 1,
			rankText: '1',
		},
	],
})
