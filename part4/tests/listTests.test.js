const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const testHelper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

// For my internet connection, default 5seconds is too less to connect to mongoDB
jest.setTimeout(10000)

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

  test('post creates new blog in db', async () => {
    const blog = {
      title: 'Hombre',
      author: 'Erico',
      url: 'www.hombreerico.com',
      likes: 42
    }

    await api.post('/api/blogs').send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await testHelper.blogsInDb()
    expect(blogsAfterPost).toHaveLength(testHelper.initialBlogs.length + 1)
  })

  test('likes == 0 if likes missing', async () => {
    const blog = {
      title: 'There are no likes for this blog',
      author: 'MoocFI',
      url: 'www.moocfi.com'
    }

    const result = await api.post('/api/blogs').send(blog)
    
    expect(result.body.likes).toEqual(0)
  })

  test('if title AND url missing, response is 400', async () => {
    const blog = {
      author: 'Joobfi'
    }

    await api.post('/api/blogs')
      .expect(400)

    const blogsInDb = await testHelper.blogsInDb()

    expect(blogsInDb).toHaveLength(testHelper.initialBlogs.length)
  })
})

describe('tests 4.13 - 4.14', () => {
  test('blog is deleted', async () => {
    const blogsList = await testHelper.blogsInDb()
    const idToDelete = blogsList[0].id

    await api.delete(`/api/blogs/${idToDelete}`)
      .expect(204)

    const newBlogsInDb = await testHelper.blogsInDb()
    expect(newBlogsInDb).toHaveLength(testHelper.initialBlogs.length - 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
