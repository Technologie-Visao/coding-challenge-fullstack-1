// (not necessary) mock database in case writes will be written to file

const data = require('../../src/utils/data')

jest.mock('../../src/utils/data')

// simply change the returned data
const sample = {
  name: 'Name',
  description: 'Description',
  thumbnail_url: 'Thumbnail',
}
const samples = Array(100).fill(sample)
data.data = samples
