import mock from './adapter'

mock.onPost('candles').reply(200, [])
