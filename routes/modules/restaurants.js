const express = require('express')
const router = express.Router()

const Restaurants = require('../../models/restaurant-list')
const validator = require('../../middleware/validator')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:id/edit', (req, res) => {
  const { id: _id } = req.params
  const userId = req.user._id
  return Restaurants.findOne({ userId, _id })
    .lean()
    .then(restInfo => res.render('edit', { restInfo }))
    .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  return Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

router.post('/', validator.restaurant, (req, res) => {
  const newRest = req.body
  const userId = req.user._id
  return Restaurants.create(Object.assign(newRest, { userId }))
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.put('/:id', validator.restaurant, (req, res) => {
  const { id: _id } = req.params
  const userId = req.user._id
  const editedRest = req.body
  return Restaurants.findOneAndUpdate({ userId, _id }, editedRest)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const { id: _id } = req.params
  const userId = req.user._id
  return Restaurants.findByIdAndRemove({ userId, _id })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
