import mock from './adapter'

mock.onGet('system/synthetix-status').reply(200, true)

mock.onGet('system/kwenta-status').reply(200, {
	status: 'Offline',
	message: 'sample message',
})
