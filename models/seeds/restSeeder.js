const bcrypt = require('bcryptjs')

const User = require('../User')
const Rest = require('../restaurant-list')
const db = require('../../config/mongoose')
const { results: restData } = require('./restaurant.json')

const SEED_USERS = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', async () => {
  try {
    for (const [index, user] of SEED_USERS.entries()) {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(user.password, salt)
      const newUser = await User.create({ email: user.email, password: hash })
      const userId = newUser._id
      for (let i = 0; i < 3; i++) {
        const { id, ...rest } = restData[i + (index * 3)]
        await Rest.create({ ...rest, userId })
      }
      console.log(`SEED USER${index - 1} complete.`)
    }
    console.log('Seeder is done.')
    process.exit()
  } catch (err) {
    console.log(err)
    process.exit()
  }
})
