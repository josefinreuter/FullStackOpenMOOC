const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const {blogs, blogsInDb} = require('./tests_helper')

describe('when there are initial blogs saved', async () => {
    beforeAll(async () => {
        await Blog.remove({})

        const blogObjects = blogs.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('GET /api/blogs all blogs are returned as json', async () => {
        const blogsInDatabase = await blogsInDb()

        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(blogsInDatabase.length)
        const returnedBlogs = response.body.map(blog => blog.title)
        blogsInDatabase.forEach(blog => {
            expect(returnedBlogs).toContainEqual(blog.title)
        })
    })


    describe('addition of blog', async () => {
        test('POST /api/blogs a note can be added', async () => {
            const newBlog = {
                title: 'CV',
                author: 'Josefin Reuter',
                url: 'www.josefinreuter.fi',
                likes: 7
            }

            const blogsBefore = await blogsInDb()

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)


            const blogsAfter = await blogsInDb()
            const mapped = blogsAfter.map(response => response.title)

            expect(blogsAfter.length).toBe(blogsBefore.length + 1)
            expect(mapped).toContainEqual(newBlog.title)

        })

        test('POST /api/blogs blog without title is not added', async () => {
            const newBlog = {
                author: 'Josefin Reuter',
                url: 'www.josefinreuter.fi',
                likes: 7
            }

            const blogsBefore = await blogsInDb()

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)

            const blogsAfter = await blogsInDb()

            expect(blogsAfter.length).toBe(blogsBefore.length)
        })

        test('POST /api/blogs blog without url is not added', async () => {
            const newBlog = {
                title: 'CV',
                author: 'Josefin Reuter',
                likes: 7
            }

            const blogsBefore = await blogsInDb()

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)

            const blogsAfter = await blogsInDb()

            expect(blogsAfter.length).toBe(blogsBefore.length)
        })

        test('POST /api/blogs a note with no likes value gets likes value 0', async () => {
            const newBlog = {
                title: 'CV',
                author: 'Josefin Reuter',
                url: 'www.josefinreuter.fi',
            }

            const blogsBefore = await blogsInDb()

            const responseSent = await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsAfter = await blogsInDb()


            expect(blogsAfter.length).toBe(blogsBefore.length + 1)
            expect(responseSent.body.likes).toBe(0)


        })
    })

    describe('updating blog', async () => {

        test('PUT /api/notes/:id blog updated successfully', async () => {
            const blogsBefore = await blogsInDb()
            const aBlog = blogsBefore[0]

            const updatedBlog = {
                title: aBlog.title,
                author: aBlog.author,
                url: aBlog.url,
                likes: 2
            }


            await api
                .put(`/api/blogs/${aBlog.id}`)
                .send(updatedBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsAfter = await blogsInDb()

            expect(blogsAfter[0].likes).not.toBe(blogsBefore[0].likes)
            expect(blogsAfter[0].likes).toBe(2)

        })

    })

    describe('deletion of blog', async () => {
        let addedBlog

        beforeAll(async () => {
            addedBlog = new Blog({
                title: 'Joku blogi',
                author: 'Henna Harju',
                url: 'www.nettisisvu.fi',
                likes: 1
            })
            await addedBlog.save()
        })

        test('DELETE /api/blogs/:id successful', async () => {
            const blogsBefore = await blogsInDb()

            await api
                .delete(`/api/blogs/${addedBlog._id}`)
                .expect(204)

            const blogsAfter = await blogsInDb()

            const titles = blogsAfter.map(response => response.title)

            expect(titles).not.toContainEqual(addedBlog.title)
            expect(blogsAfter.length).toBe(blogsBefore.length - 1)

        })


    })


    afterAll(() => {
        server.close()
    })

})