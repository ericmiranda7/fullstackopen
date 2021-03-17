const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { blogs } = require('../tests/test_helper')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    if (blog.likes === undefined) {
        blog.likes = 0
    }

    if (blog.title === undefined || blog.url === undefined) {
        response.sendStatus(400)
    } else {
        blog
            .save()
            .then(result => {
                response.status(201).json(result)
            })
    }
})

module.exports = blogsRouter