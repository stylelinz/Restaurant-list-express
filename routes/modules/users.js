const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

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
      // TODO: This message should be flashed.
      console.log('the user is already exist')
      return res.render('register', {
        name, email, password, confirmPassword
      })
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await User.create({ name, email, password: hash })
    return res.redirect('/users/login')
  } catch (error) {
    console.log(error)
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('successMsg', '您已成功登出。')
  return res.redirect('/users/login')
})

module.exports = router
