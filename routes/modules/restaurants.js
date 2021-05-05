const express = require('express')
const router = express.Router()

const Restaurants = require('../../models/restaurant-list')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  return Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const { id } = req.params
  return Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

router.post('/', (req, res) => {
  const newRest = req.body
  return Restaurants.create(newRest)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const editedRest = req.body
  return Restaurants.findByIdAndUpdate(id, editedRest)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  return Restaurants.findByIdAndRemove(id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
