import React from 'react'
import {shallow} from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
    it('renders content', () => {
        const blog = {
            title: "Coding ABC",
            author: "Mastermind",
            likes: 3
        }

        const blogComponent = shallow(<Blog blog={blog}/>)

        const contentDiv = blogComponent.find('.initialContent')

        expect(contentDiv.text()).toContain(blog.title, blog.author)
    })

    it('toggleVisibility is working properly', () => {
        const blog = {
            title: "Coding ABC",
            author: "Mastermind",
            url: "www.super.fi",
            likes: 3,
            user: {
                username: "seppo",
                name: "Seppo Hovi"
            }
        }

        const user = {
            username: "seppo",
            name: "Seppo Hovi"
        }


        const blogComponent = shallow(<Blog blog={blog} user={user}/>)

        const clickable = blogComponent.find('.initialContent')
        clickable.simulate('click')

        const contentDiv = blogComponent.find('.allContent')

        expect(contentDiv.text()).toContain(blog.title, blog.author, blog.likes, blog.url, blog.user.name)

    })

})