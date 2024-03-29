/* eslint-disable global-require */
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
require('express-async-errors')

const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const loginRouter = require('./controllers/login')

logger.info('connecting to: ', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true
})
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => logger.error('error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/test')
  app.use('/api/test', testRouter)
}

app.use(middleware.unkownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
