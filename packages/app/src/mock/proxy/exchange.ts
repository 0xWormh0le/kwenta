import mock from './adapter'

mock.onGet('exchange/batch-coingecko-prices').reply(200, {})

mock.onGet('exchange/token-balances').reply(200, 0)

mock.onGet('exchange/transaction-fee').reply(200, 0)

mock.onGet('exchange/fee-cost').reply(200, 0)

mock.onGet('exchange/one-inch-tokens').reply(200, {
	tokensMap: {},
	tokenList: [],
})

mock.onGet('exchange/tynth-suspensions').reply(200, {})

mock.onGet('exchange/coingecko-prices').reply(200, 0)

mock.onGet('exchange/base-fee-rate').reply(200, 0)

mock.onGet('exchange/rate').reply(200, 0)

mock.onGet('exchange/exchange-fee-rate').reply(200, 0)

mock.onGet('exchange/price-rate').reply(200, 0)

mock.onGet('exchange/check-allowance').reply(200, 0)

mock.onGet('exchange/fee-reclaim-period').reply(200, 0)

mock.onGet('exchange/num-entries').reply(200, 0)

mock.onGet('exchange/one-inch-quote').reply(200, 0)

mock.onGet('exchange/slippage-percent').reply(200, 0)
