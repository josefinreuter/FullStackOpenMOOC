const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (exception) {
        console.log(exception)
        response.status(500).json({error: 'something went wrong...'})
    }
})

blogsRouter.post('/', async (request, response) => {
    try {
        const blog = new Blog(request.body)

        if (blog.likes === undefined) {
            blog.likes = 0;
        }

        if (blog.title === undefined || blog.url === undefined) {
            return response.status(400).json({error: 'title or url missing'})
        }

        const savedBlog = await blog.save()
        response.json(savedBlog)

    } catch (exception) {
        console.log(exception)
        response.status(500).json({error: 'something went wrong...'})

    }
})

blogsRouter.put('/:id', async (request, response) => {
    try {
        const body = request.body

        const blog = {
            likes: body.likes
        }

        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})

        response.json(updatedBlog)

    } catch (exception) {
        console.log(exception)
        response.status(400).send({error: 'malformatted id'})

    }


})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()

    } catch (exception) {
        console.log(exception)
        response.status(400).send({error: 'malformatted id'})
    }

})

module.exports = blogsRouter