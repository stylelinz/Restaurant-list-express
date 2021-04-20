// 套入框架與樣板引擎模組
// Import modules anc set port
const express = require('express')
const app = express()
const exphdb = require('express-handlebars')
const port = 3000

// 設定使用handlebars樣板引擎
// Set template engine handlebars
app.engine('handlebars', exphdb({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// 加上靜態資源
// Apply static resources(bootstrap5, popper)
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})