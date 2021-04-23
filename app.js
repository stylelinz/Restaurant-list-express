// 套入框架與樣板引擎模組
// Import modules anc set port
const express = require('express')
const app = express()
const exphdb = require('express-handlebars')
const { results: restaurants } = require('./restaurant.json')
const port = 3000

// 設定使用handlebars樣板引擎
// Set template engine handlebars
app.engine('handlebars', exphdb({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// 加上靜態資源
// Apply static resources(bootstrap5, popper)
app.use(express.static('public'))

// 設定路由
// Set routes
app.get('/', (req, res) => {
  // 在 index.handlebars 渲染餐廳資料
  res.render('index', {restaurants})
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.find(rest => rest.id.toString() === req.params.id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) =>{
  const { keyword } = req.query
  // 關鍵字可搜尋'餐廳名字'、'餐廳英文名字'、'餐廳類別'
  const result = restaurants.filter(rest => {
    const { name, name_en, category } = rest
    return [name, name_en, category].some(props => props.toLowerCase().includes(keyword.trim().toLowerCase()))
  })
  // 如果搜尋結果為空，回傳所有結果
  res.render('index', { restaurants: result , keyword})
})

// 不要忘記開監聽
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})