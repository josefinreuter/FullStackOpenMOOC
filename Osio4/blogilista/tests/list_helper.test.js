const listHelper = require('../utils/list_helper')

const {emptyList, listWithOneBlog, blogs} = require('./tests_helper')

describe.skip('list helpers', () => {
    test('dummy is called', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })

    describe('total likes', () => {


        test('when list is empty return zero', () => {
            const result = listHelper.totalLikes(emptyList)
            expect(result).toBe(0)
        })

        test('when list has only one blog equals the likes of that', () => {
            const result = listHelper.totalLikes(listWithOneBlog)
            expect(result).toBe(5)
        })

        test('when list has more than one blog equals the combined likes', () => {
            const result = listHelper.totalLikes(blogs)
            expect(result).toBe(36)
        })
    })

    describe('favorite blog', () => {


        test('when list is empty return "No blogs!"', () => {
            const result = listHelper.favoriteBlog(emptyList)
            expect(result).toEqual("No blogs!")
        })

        test('when list has only one blog equals that one', () => {
            const result = listHelper.favoriteBlog(listWithOneBlog)
            expect(result).toEqual({
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                likes: 5
            })
        })

        test('when list has more than one blog equals the one with most likes', () => {
            const result = listHelper.favoriteBlog(blogs)
            expect(result).toEqual({
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                likes: 12
            })
        })
    })

    describe('most blogs', () => {


        test('when list is empty return "No blogs!"', () => {
            const result = listHelper.mostBlogs(emptyList)
            expect(result).toEqual("No blogs!")
        })

        test('when list has only one blog equals that author', () => {
            const result = listHelper.mostBlogs(listWithOneBlog)
            expect(result).toEqual({
                author: 'Edsger W. Dijkstra',
                blogs: 1
            })
        })

        test('when list has more than one blog equals the author with most entries', () => {
            const result = listHelper.mostBlogs(blogs)
            expect(result).toEqual({
                author: "Robert C. Martin",
                blogs: 3
            })
        })
    })
})
