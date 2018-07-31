const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const User = require('../models/user')
const {usersInDb} = require('./tests_helper')

describe('when there is one initial user saved', async () => {
    beforeAll(async () => {
        await User.remove({})
        const user = new User({username: 'root', name: 'Admin', password: 'hemligt', adult: false})
        await user.save()
    })


    describe('adding a new user', async () => {
        test('POST /api/users successful wit unique username', async () => {
            const usersBefore = await usersInDb()

            const newUser = {
                username: 'pepe',
                name: 'Josefin Reuter',
                password: 'salainen',
                adult: false
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const usersAfter = await usersInDb()
            expect(usersAfter.length).toBe(usersBefore.length + 1)
            const usernames = usersAfter.map(u => u.username)
            expect(usernames).toContainEqual(newUser.username)

        })

        test('POST /api/users user with not unique username not added', async () => {
            const usersBefore = await usersInDb()

            const newUser = {
                username: 'root',
                name: 'Josefin Reuter',
                password: 'salainen',
                adult: true
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body).toEqual({error: 'username must be unique'})

            const usersAfter = await usersInDb()
            expect(usersAfter.length).toBe(usersBefore.length)

        })

        test('POST /api/users user with password shorter than three characters not added', async () => {

            const usersBefore = await usersInDb()

            const newUser = {
                username: 'admin',
                name: 'Josefin Reuter',
                password: 's',
                adult: true
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body).toEqual({error: 'password must be at least three characters long'})

            const usersAfter = await usersInDb()
            expect(usersAfter.length).toBe(usersBefore.length)
        })

        test('POST /api/users user with missing adult value is set to true', async () => {

            const usersBefore = await usersInDb()

            const newUser = {
                username: 'sensei',
                name: 'Josefin Reuter',
                password: 'abcdef'
            }

            const addedUser = await api
                .post('/api/users')
                .send(newUser)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(addedUser.body.adult).toEqual(true)

            const usersAfter = await usersInDb()
            expect(usersAfter.length).toBe(usersBefore.length + 1)
        })


    })


    afterAll(() => {
        server.close()
    })

})
