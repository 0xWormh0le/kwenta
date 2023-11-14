import mock from './adapter'

mock.onGet('balance').reply(200, 0)
