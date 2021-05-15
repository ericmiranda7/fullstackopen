const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const usersList = await User.find({})

  response.status(200).json(usersList)
})

usersRouter.post('/', async (request, response) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

  const user = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash
  })
  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
