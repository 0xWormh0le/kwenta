import mock from './adapter'

mock.onGet('staking-migration/registered-vesting-entry-ids').reply(200, [])

mock.onGet('staking-migration/vesting-entry-ids').reply(200, [])

mock.onGet('staking-migration/registered-vesting-entry-ids').reply(200, [])

mock.onGet('staking-migration/registered-vesting-schedules').reply(200, [])

mock.onGet('staking-migration/to-pay-by-user').reply(200, 0)

mock.onGet('staking-migration/escrow-migrator-allowance').reply(200, 0)

mock.onGet('staking-migration/total-escrow-unmigrated').reply(200, 0)

mock.onGet('staking-migration/migration-deadline').reply(200, {
	startBN: 0,
	endBN: 0,
})
