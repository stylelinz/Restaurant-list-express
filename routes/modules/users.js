const express = require('express')
const router = express.Router()

const User = require('../../models/User')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  console.log(req.body)
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  console.log(req.body)
})

router.post('/logout', (req, res) => {
  console.log(req.body)
})

module.exports = router
