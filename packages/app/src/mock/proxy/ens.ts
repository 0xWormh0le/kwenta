import mock from './adapter'

mock.onGet(/lookup-address\/*/).reply(200, 'mock-ens')

mock.onGet(/resolve-name\/*/).reply(200, 'mock-ens')

mock.onGet(/avatar\/*/).reply(200, 'mock-avatar')
