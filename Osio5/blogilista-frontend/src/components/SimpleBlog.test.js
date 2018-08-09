import React from 'react'
import {shallow} from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    it('renders content', () => {
        const blog = {
            title: "Coding ABC",
            author: "Mastermind",
            likes: 3
        }

        const blogComponent = shallow(<SimpleBlog blog={blog}/>)

        const contentDiv = blogComponent.find('.blog')

        expect(contentDiv.text()).toContain(blog.title, blog.author, blog.likes)
    })

    it('clicking on button twice calls event handler twice', () => {
        const blog = {
            title: "Coding ABC",
            author: "Mastermind",
            likes: 3
        }

        const mockHandler = jest.fn()

        const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)

        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)

    })


})