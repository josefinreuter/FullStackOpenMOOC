import React from 'react'
import {mount} from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import blogService from './services/blogs'

describe('<App />', () => {
    let app

    describe('does not render blogs before login', () => {
        beforeEach(() => {
            app = mount(<App/>)
        })

        it('no blogs are rendered', () => {

            app.update()

            const contentDiv = app.find(Blog)

            expect(contentDiv.length).toEqual(0)
        })


    })

    describe('does render blogs after login', () => {
        beforeEach(() => {
            app = mount(<App/>)

            const user = {
                username: 'tester',
                token: '1231231214',
                name: 'Teuvo Testaaja'
            }

            localStorage.setItem('loggedUser', JSON.stringify(user))

        })

        it('all blogs are rendered', () => {

            app.update()

            const contentDiv = app.find(Blog)

            expect(contentDiv.length).toEqual(blogService.blogs.length)
        })


    })


})