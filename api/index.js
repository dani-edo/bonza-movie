import { users } from '../static/json/users'

const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = express.Router()

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUST, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.use(
  '/user',
  router.post('/login', (req, res, __) => {
    const user = users.filter(
      ({ email, password }) =>
        req.body.email === email && req.body.password === password
    )
    if (user.length > 0) {
      res.status(200).json({
        token: 'dummytoken',
      })
    } else {
      res.status(500).json({
        message: 'user not found',
      })
    }
  }),
  router.get('/', (_, res, __) => {
    res.status(200).json({
      user: 'dummyuser',
    })
  })
)

app.use((_, __, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, _, res) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message,
    },
  })
})

module.exports = app
