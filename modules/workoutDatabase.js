var mysql = require('mysql')

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
  const workoutSchema = {
      abs: [],
      arms: [],
      legs: [],
      back: [],
      chest: []
    }
  const query = `SELECT * FROM workouts`
  const connection = connectToDatabase()

  connection.connect()
  connection.query(query, function(err, rows, fields) {
    if(err) throw err
    for(let i = 0; i < rows.length; i++) {
      workoutSchema[rows[i].area].push({workoutName: rows[i].name, workoutWeight: rows[i].weight})
    }
    res.json(workoutSchema)
  })

  connection.end()
}

module.exports = {
  getFromDatabase: getFromDatabase,
  insertIntoDatabase: insertIntoDatabase
}