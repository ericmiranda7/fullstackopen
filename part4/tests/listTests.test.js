const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const testHelper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

jest.setTimeout(10000);

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = testHelper.initialBlogs.map((blog) => new Blog(blog))

  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('4.8 - 4.12 tests', () => {
  test('returns correct no. of blogs in json', async () => {
    const results = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(results.body).toHaveLength(testHelper.initialBlogs.length)
  })

  test('unique id prop is id not _id', async () => {
    const results = await api.get('/api/blogs')
    expect(results.body[0].id).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})
