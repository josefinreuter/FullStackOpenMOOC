import React, {Component} from 'react';
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            newTitle: '',
            newAuthor: '',
            newUrl: '',
            username: '',
            password: '',
            user: null,
            message: null


        }
    }

    componentDidMount() {
        blogService
            .getAll()
            .then(response => {
                this.setState({blogs: response})
            })

        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.setState({user})
            blogService.setToken(user.token)

        }

    }

    handleFormFieldChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    login = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            })

            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            this.setState({username: '', password: '', user})

        } catch (e) {
            this.setState({
                message: 'Wrong username or password',
            })
            setTimeout(() => {
                this.setState({message: null})
            }, 5000)

        }


    }

    logout = () => {
        window.localStorage.clear()
        this.setState({message: `${this.state.user.name} logged out`, username: '', password: '', user: null})
        setTimeout(() => {
            this.setState({message: null})
        }, 5000)
    }

    addBlog = async (event) => {
        event.preventDefault()
        this.blogForm.toggleVisibility()
        try {
            const newBlog = await blogService.addBlog({
                title: this.state.newTitle,
                author: this.state.newAuthor,
                url: this.state.newUrl
            })

            const blogs = await blogService.getAll()

            this.setState({
                blogs: blogs,
                newTitle: '',
                newAuthor: '',
                newUrl: '',
                message: `A new blog: '${newBlog.title}' by ${newBlog.author} was added!`
            })
            setTimeout(() => {
                this.setState({message: null})
            }, 5000)

        } catch (e) {
            this.setState({
                message: 'Blog addition failed, title or url missing.'
            })
            setTimeout(() => {
                this.setState({message: null})
            }, 5000)

        }
    }

    likeBlog = async (id) => {

        try {
            const blog = this.state.blogs.find(b => b.id === id)


            await blogService.updateBlog(blog.id, {
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes + 1,
                user: blog.user
            })


            const blogs = await blogService.getAll()


            this.setState({blogs: blogs})


        } catch (e) {
            console.log(e)

        }


    }

    deleteBlog = async (id) => {
        try {
            const blog = this.state.blogs.find(b => b.id === id)

            if (window.confirm(`Delete '${blog.title}'?`)) {
                await blogService.deleteBlog(id)

                const newBlogs = this.state.blogs.filter(b => b.id !== id)

                this.setState({
                    blogs: newBlogs,
                    message: `'${blog.title}' by ${blog.author} was deleted!`
                })
                setTimeout(() => {
                    this.setState({message: null})
                }, 5000)
            }

        } catch (e) {
            this.setState({
                message: 'Blog deletion failed.'
            })
            setTimeout(() => {
                this.setState({message: null})
            }, 5000)

        }
    }

    render() {

        const loginForm = () => (
            <div className="loginForm">
                <h2>Login</h2>

                <form onSubmit={this.login}>
                    <div>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleFormFieldChange}
                        />
                    </div>
                    <div>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleFormFieldChange}/>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        )

        const blogForm = () => {
            const blogs = this.state.blogs.sort(function (a, b) {
                return (b.likes > a.likes) ? 1 : ((a.likes > b.likes) ? -1 : 0);
            })

            return (

                <div>
                    <h2>Blogs</h2>
                    <p>{this.state.user.name} is logged in. <button onClick={this.logout}>Logout</button></p>

                    <h3>Existing blogs: </h3>
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} user={this.state.user} likeBlog={this.likeBlog}
                              deleteBlog={this.deleteBlog}/>)}
                    <br/>

                    <Togglable buttonLabel="New Blog" ref={component => this.blogForm = component}>
                        <BlogForm
                            onSubmit={this.addBlog}
                            newTitle={this.state.newTitle}
                            newAuthor={this.state.newAuthor}
                            newUrl={this.state.newUrl}
                            handleFormChange={this.handleFormFieldChange}
                        />
                    </Togglable>

                </div>
            )

        }


        return (
            <div className="app">
                <Notification message={this.state.message}/>
                {this.state.user === null ?
                    loginForm() : blogForm()
                }
            </div>
        )
    }
}

export default App;
