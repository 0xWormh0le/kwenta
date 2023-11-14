import MockAdapter from 'axios-mock-adapter'

import proxy from 'utils/proxy'

const mock = new MockAdapter(proxy)

export default mock
