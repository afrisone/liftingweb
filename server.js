var stormpath = require('express-stormpath')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config')
var ora = require('ora')
var port = process.env.PORT || 5000
var app = express()
var compiler = webpack(config)
var workoutDatabase = require('./modules/workoutDatabase')


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))
app.use(require("webpack-hot-middleware")(compiler))
app.use('/css', express.static(__dirname + '/src/css'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((request, response, next) => {
	response.header('Access-Control-Allow-Origin', '*')
	response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
	response.header('Access-Control-Allow-Headers', 'Content-Type')

	next()
})

app.post('/testingPost', function (req, res) {
  const workoutInfo = {
    workoutName: req.body.workoutName,
    workoutWeight: req.body.workoutWeight
  }

  workoutDatabase.insertIntoDatabase(req.body.targetArea, req.body.workoutName, req.body.workoutWeight)
})

app.get('/getWorkouts', function (req, res) {
  workoutDatabase.getFromDatabase(res)
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'src/html/index.html'))
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})