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

test('unique identifier is id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('post request adds to database', async () => {
    const newBlog = {
        title: 'Exprees',
        author: 'Dunno',
        url: 'www.happy.com',
        likes: '36',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.blogs.length + 1)
    expect(titles).toContain('Exprees')

    
})

test('post without likes defaults likes to 0', async () => {
    const newBlog = {
        title: 'No likes',
        author: 'Eric',
        url: 'www.likes.com',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    
    expect(response.body[helper.blogs.length].likes).toBe(0)
})

test('post without title or url returns bad request', async () => {
    const newBlog = {
        author: 'James',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        
})

afterAll(() => {
    mongoose.connection.close()
})
