const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/User')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      console.log('the user is already exist')
      return res.render('login')
    }
    await User.create({ name, email, password })
    return res.redirect('/users/login')
  } catch (error) {
    console.log(error)
  }
})

router.post('/logout', (req, res) => {
  console.log(req.body)
})

module.exports = router
