import mock from './adapter'

mock.onGet('referrals/tier-by-referral-code').reply(200, 0)

mock.onGet('referrals/referrer-by-code').reply(200, 'mock-referrer')

mock.onGet('referrals/boost-nft-tier-by-holder').reply(200, 0)

mock.onGet('referrals/check-nft-minted-for-account').reply(200, true)

mock.onGet('referrals/cumulative-stats-by-referrer-and-epoch-time').reply(200, [])

mock.onGet('referrals/referral-nft-tier-by-referrer').reply(200, 0)

mock.onGet('referrals/referral-score-by-referrer').reply(200, 0)
