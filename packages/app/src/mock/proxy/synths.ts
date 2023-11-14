import mock from './adapter'

mock.onGet('synths/synth-balances').reply(200, {
	balancesMap: 0,
	totalUSDBalance: 0,
	susdWalletBalance: 0,
})

mock.onGet('synths/syncth-v3-balance-and-allowances').reply(200, {
	SNXUSD: {
		balance: 0,
		allowances: {},
	},
})
