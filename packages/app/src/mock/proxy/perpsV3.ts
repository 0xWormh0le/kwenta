import mock from './adapter'

mock.onGet('perps-v3/markets').reply(200, [])

mock.onGet('perps-v3/positions').reply(200, [])

mock.onGet('perps-v3/pending-async-orders').reply(200, [])

mock.onGet('perps-v3/trade-preview').reply(200, {
	fillPrice: 0,
	fee: 0,
	settlementFee: 0,
})

mock.onGet('perps-v3/available-margin').reply(200, 0)

mock.onGet('perps-v3/perps-v3-account-ids').reply(200, [])
