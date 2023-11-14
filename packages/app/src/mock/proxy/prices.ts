import mock from './adapter'

mock.onGet('prices/previous-day-prices').reply(200, [])

mock.onGet('prices/onchain-prices').reply(200, {})
