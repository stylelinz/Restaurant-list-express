// 套入框架與樣板引擎模組
// Import modules
const express = require('express')
const exphdb = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

// Connect mongoose by config/mongoose.js
require('./config/mongoose')

// Import local resources
const routes = require('./routes')
const usePassport = require('./config/passport')

const app = express()
const port = 3000
// 設定使用handlebars樣板引擎
// Set template engine handlebars
app.engine('handlebars', exphdb({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 加上靜態資源
// Apply static resources(bootstrap5, popper)
app.use(express.static('public'))
app.use(session({
  secret: 'ThisIsASecret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(flash())
// Use passport authenticate configuration (middleware)
usePassport(app)
// Set these variable to global so every views can access them
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.successMsg = req.flash('successMsg')
  res.locals.warningMsg = req.flash('warningMsg')
  next()
})
// 設定路由
// Set routes
app.use(routes)

// 不要忘記開監聽
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
