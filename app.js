// 套入框架與樣板引擎模組
// Import modules
const express = require('express')
const exphdb = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const db = mongoose.connection

db.on('error', () => console.log('mongodb error!'))
db.once('open', () => console.log('mongodb connected!'))

const app = express()
const port = 3000
// 設定使用handlebars樣板引擎
// Set template engine handlebars
app.engine('handlebars', exphdb({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 加上靜態資源
// Apply static resources(bootstrap5, popper)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 設定路由
// Set routes
app.get('/', (req, res) => {
  // 在 index.handlebars 渲染餐廳資料
  Restaurants.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
})

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.get('/restaurants/:id', (req, res) => {
  const { id } = req.params
  return Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const { id } = req.params
  return Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

app.get('/search', (req, res) => {
  const { keyword } = req.query
  const query = new RegExp(keyword.trim(), 'i')
  // 關鍵字可搜尋'餐廳名字'、'餐廳英文名字'、'餐廳類別'
  return Restaurants.find({
    $or: [{ name: query }, { name_en: query }, { category: query }]
  }).lean()
    .then(results => res.render('index', { restaurants: results, keyword }))
})

app.post('/restaurants', (req, res) => {
  const newRest = req.body
  return Restaurants.create(newRest)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const { id } = req.params
  const editedRest = req.body
  return Restaurants.findByIdAndUpdate(id, editedRest)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

app.post('/restaurants/:id/delete', (req, res) => {
  const { id } = req.params
  return Restaurants.findByIdAndRemove(id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 不要忘記開監聽
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
