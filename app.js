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
  // 在index.hendlebars渲染餐廳資料
  res.render('index', {restaurants})
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})