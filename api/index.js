// const express = require('express')
// const app = express()
// const mySql = require('mysql')
// const cors = require('cors')
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200
// }
// app.use(cors(corsOptions))
// app.use(express.json())

// const db = mySql.createConnection({
//   user: 'root',
//   host: 'localhost',
//   password: 'Cuentarocko2',
//   database: 'userWebsite'
// })

// app.post('/comment', (req, res) => {
//   const userEmail = req.body.userEmail
//   const comment = req.body.comment

//   db.query(
//     'INSERT INTO users (user_email, comment) VALUES (?,?)',
//     [userEmail, comment],
//     (err, result) => {
//       if (err) {
//         console.log(err)
//       } else {
//         res.send('Values inderted')
//       }
//     }
//   )
// })

// app.get('/users', (req, res) => {
//   db.query(
//     'SELECT * FROM users WHERE user_email IS NOT NULL',
//     (err, result) => {
//       if (err) {
//         console.log(err)
//       } else {
//         res.send(result)
//       }
//     }
//   )
// })

// app.listen(3001, () => {
//   console.log('This is port 3306')
// })

'use strict'
const express = require('express')
const mysql = require('promise-mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.set('view engine', 'pug')
app.enable('trust proxy')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())
app.use((req, res, next) => {
  res.set('Content-Type', 'text/html')
  next()
})
// Create a Winston logger that streams to Stackdriver Logging.
const winston = require('winston')
const { LoggingWinston } = require('@google-cloud/logging-winston')
const loggingWinston = new LoggingWinston()
const logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console(), loggingWinston]
})
const createTcpPool = async config => {
  // Extract host and port from socket address
  console.log('Inside TCP')
  // Establish a connection to the database
  return await mysql.createPool({
    user: 'root', // e.g. 'my-db-user'
    password: 'Cuentarocko2', // e.g. 'my-db-password'
    database: 'userWebsite',
    host: '127.0.0.1', //dbSocketAddr[0], // e.g. '127.0.0.1'
    port: '3306', //dbSocketAddr[1], // e.g. '3306'
    // … Specify additional properties here.
    ...config
  })
  console.log('End of TCP')
}
const createUnixSocketPool = async config => {
  console.log('Inside Socket')
  return await mysql.createPool({
    user: 'root', // e.g. 'my-db-user'
    password: 'Cuentarocko2', // e.g. 'my-db-password'
    database: 'userWebsite', // e.g. 'my-database'
    // If connecting via unix domain socket, specify the path
    // socketPath: '/cloudsql/medium-354300:us-west2:myinstance',
    // Specify additional properties here.
    ...config
  })
}
// [END cloud_sql_mysql_mysql_create_socket]
const createPool = async () => {
  const config = {
    connectionLimit: 5,
    connectTimeout: 10000, // 10 seconds
    acquireTimeout: 10000, // 10 seconds
    waitForConnections: true, // Default: true
    queueLimit: 0 // Default: 0
  }
  return await createTcpPool(config)
}
const ensureSchema = async pool => {
  // Wait for tables to be created (if they don't already exist).
  console.log("Ensured that table 'users' exists")
}
const createPoolAndEnsureSchema = async () =>
  await createPool()
    .then(async pool => {
      await ensureSchema(pool)
      return pool
    })
    .catch(err => {
      throw err
    })
let pool
app.use(async (req, res, next) => {
  if (pool) {
    return next()
  }
  try {
    pool = await createPoolAndEnsureSchema()
    console.log('Inside createPoolAndEnsureSchema')
    next()
  } catch (err) {
    logger.error(err)
    return next(err)
  }
})
app.get('/users', async (req, res) => {
  try {
    const tabsQuery = pool.query('SELECT * FROM users;')
    console.log('Inside query')
    let x = await tabsQuery
    console.log(tabsQuery)
    res.json(x)
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .send(
        'Unable to load page. Please check the application logs for more details.'
      )
      .end()
  }
})
app.post('/comment', (req, res) => {
  const userEmail = req.body.userEmail
  const comment = req.body.comment

  pool.query(
    'INSERT INTO users (user_email, comment) VALUES (?,?);',
    [userEmail, comment],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('Values inserted')
      }
    }
  )
})

app.get('/check', (req, res) => {
  res.send('Hello World!')
})
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
process.on('uncaughtException', function (err) {
  console.log(err)
  throw err
})
module.exports = server
