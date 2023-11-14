import mock from './adapter'

mock.onGet('prices/previous-day-prices').reply(200, [])
