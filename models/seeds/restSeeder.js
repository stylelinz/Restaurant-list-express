const Rest = require('../restaurant-list')
const db = require('../../config/mongoose')
const { results: restData } = require('./restaurant.json')

db.once('open', () => {
  restData.forEach(item => {
    const { id, ...rest } = item
    Rest.create(rest)
  })
  console.log('Seeder is done.')
})
