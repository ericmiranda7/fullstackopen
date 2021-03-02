const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.blogs.map(b => new Blog(b))
    const blogPromises = blogObjects.map(b => b.save())
    await Promise.all(blogPromises)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are 3 blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(3)
})

afterAll(() => {
    mongoose.connection.close()
})
