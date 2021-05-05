// 套入框架與樣板引擎模組
// Import modules
const express = require('express')
const exphdb = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

// Import local resources
const routes = require('./routes')

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
app.use(routes)

// 不要忘記開監聽
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
