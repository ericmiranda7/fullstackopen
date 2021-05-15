/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = request.body
  blog.likes = blog.likes || 0
  const user = await User.findOne({})

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
