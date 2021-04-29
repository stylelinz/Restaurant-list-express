const mongoose = require('mongoose')
const Rest = require('../restaurant-list')
const { results: restData } = require('./restaurant.json')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => console.log('mongodb error!'))

db.once('open', () => {
  console.log('mongodb connected!')

  restData.forEach(item => {
    const { id, ...rest } = item
    Rest.create(rest)
  })
  console.log('Seeding is done.')
})
