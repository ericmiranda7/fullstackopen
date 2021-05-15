/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const auth = request.get('authorization')

  const token = auth && auth.toLowerCase().startsWith('bearer ')
    ? auth.slice(7)
    : null

  console.log('token is', token)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) return response.status(401).json({ error: 'token missing or invalid' })

  const verifiedUserId = decodedToken.id

  const blog = request.body
  blog.likes = blog.likes || 0
  const user = await User.findById(verifiedUserId)

  blog.user = user._id

  if (!blog.title && !blog.url) return response.status(400).json({ error: 'url and title missing from request' })

  const blogToSave = new Blog(blog)

  const savedBlog = await blogToSave.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const editedBlog = {
    likes: request.body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, editedBlog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
