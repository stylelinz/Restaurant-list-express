const express = require('express')
const router = express.Router()

const Restaurants = require('../../models/restaurant-list')

router.get('/', (req, res) => {
  // 在 index.handlebars 渲染餐廳資料
  Restaurants.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
})

router.get('/search', (req, res) => {
  const { keyword } = req.query
  const query = new RegExp(keyword.trim(), 'i')
  // 關鍵字可搜尋'餐廳名字'、'餐廳英文名字'、'餐廳類別'
  return Restaurants.find({
    $or: [{ name: query }, { name_en: query }, { category: query }]
  }).lean()
    .then(results => res.render('index', { restaurants: results, keyword }))
})

module.exports = router
