const express = require('express')
const router = express.Router()

const Restaurants = require('../../models/restaurant-list')

router.get('/', (req, res) => {
  const sorting = {
    ia: { _id: 'asc' },
    id: { _id: 'desc' },
    ra: { rating: 'asc' },
    rd: { rating: 'desc' }
  }
  const sortParams = req.query.sort
  const userId = req.user._id
  // 在 index.handlebars 渲染餐廳資料
  return Restaurants.find({ userId })
    .lean()
    .sort(sorting[sortParams])
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})

router.get('/search', (req, res) => {
  const { keyword } = req.query
  const userId = req.user._id
  const query = new RegExp(keyword.trim(), 'i')
  // 關鍵字可搜尋'餐廳名字'、'餐廳英文名字'、'餐廳類別'
  return Restaurants.find({
    $and: [
      { userId },
      { $or: [{ name: query }, { name_en: query }, { category: query }] }
    ]
  }).lean()
    .then(results => res.render('index', { restaurants: results, keyword }))
    .catch(err => console.log(err))
})

module.exports = router
