const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  blog.likes = blog.likes || 0  

  if (!blog.title && !blog.url) return response.status(400).json({ error: 'url and title missing from request' })

  const result = await blog.save()
  response.status(201).json(result)
  
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const editedBlog = {
    likes: request.body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, editedBlog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter