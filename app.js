// 套入框架與樣板引擎模組
// Import modules
const express = require('express')
const exphdb = require('express-handlebars')
const methodOverride = require('method-override')

// Connect mongoose by config/mongoose.js
require('./config/mongoose')

// Import local resources
const routes = require('./routes')

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
app.use(routes)

// 不要忘記開監聽
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
