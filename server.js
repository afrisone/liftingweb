var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var ora = require('ora');
var mysql = require('mysql')

var port = process.env.PORT || 5000;

var app = express()
var compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))
app.use(require("webpack-hot-middleware")(compiler));

const pretendDatabase = {
    arms: [
    ],
    legs: [
    ],
    back: [
    ],
    chest: [
    ],
    abs: [
    ]
  }

app.use('/css', express.static(__dirname + '/src/css'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(methodOverride())

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

  insertIntoDatabase(req.body.targetArea, req.body.workoutName, req.body.workoutWeight)

})

app.get('/getWorkouts', function (req, res) {
  getFromDatabase(res)
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'src/html/index.html'));
});

function connectToDatabase() {
  return mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'Workouts'
  })
}

function insertIntoDatabase(area, name, weight) {
  const query = `INSERT INTO workouts VALUES("${area}", "${name}", ${weight})`
  const connection = connectToDatabase()

  connection.connect()
  connection.query(query, function(err, rows, fields) {
    if(err) {
      console.log("Workout already exists")
    }
  })
  connection.end()
}

function getFromDatabase(res) {
  flushPretendDatabase()

  const query = `SELECT * FROM workouts`
  const connection = connectToDatabase()
  connection.connect()
  connection.query(query, function(err, rows, fields) {
    if(err) throw err
    for(let i = 0; i < rows.length; i++) {
      pretendDatabase[rows[i].area].push({workoutName: rows[i].name, workoutWeight: rows[i].weight})
    }
    res.json(pretendDatabase)
    console.log(pretendDatabase)
  })
  connection.end()
}

function flushPretendDatabase() {
  pretendDatabase.abs = []
  pretendDatabase.arms = []
  pretendDatabase.back = []
  pretendDatabase.chest = []
  pretendDatabase.legs = []
}

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})