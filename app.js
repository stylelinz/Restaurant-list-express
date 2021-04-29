// 套入框架與樣板引擎模組
// Import modules anc set port
const express = require('express')
const exphdb = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurants = require('./models/restaurant-list')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

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
app.use(bodyParser.urlencoded({ extended: true }))

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
  const restaurant = restaurants.find(rest => rest.id.toString() === req.params.id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const { keyword } = req.query
  // 關鍵字可搜尋'餐廳名字'、'餐廳英文名字'、'餐廳類別'
  const result = restaurants.filter(rest => {
    const { name, name_en, category } = rest
    return [name, name_en, category].some(props => props.toLowerCase().includes(keyword.trim().toLowerCase()))
  })
  // 如果搜尋結果為空，回傳所有結果
  res.render('index', { restaurants: result, keyword })
})

app.post('/restaurants', (req, res) => {
  const newRest = req.body
  return Restaurants.create(newRest)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 不要忘記開監聽
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
