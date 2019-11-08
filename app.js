const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const resturantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { lists: resturantList.results })
})

app.get('/restaurants/:diner_id', (req, res) => {
  const diner = resturantList.results.find(diner => diner.id.toString() === req.params.diner_id)
  res.render('show', { diner: diner })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const diners = resturantList.results.filter(diner => {
    return diner.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { lists: diners })
})

app.listen(port, () => {
  console.log(`express is listening on localhost:${port}`)
})

