const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const testHelper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = testHelper.initialBlogs.map((blog) => new Blog(blog))

  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('returns correct no. of blogs in json', async () => {
  const results = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(results.body).toHaveLength(testHelper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
