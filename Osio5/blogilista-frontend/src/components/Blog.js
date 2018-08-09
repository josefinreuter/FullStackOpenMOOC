import React from 'react'

class Blog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            blog: props.blog,
            user: props.user
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({blog: nextProps.blog});
    }


    toggleVisibility = () => {
        this.setState({visible: !this.state.visible})
    }

    render() {

        const blogStyle = {
            paddingTop: 5,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 10
        }

        return (
            <div style={blogStyle}>
                <div>
                    {this.state.visible ?
                        <div className="allContent">
                            <span
                                onClick={this.toggleVisibility}>{this.state.blog.title}, {this.state.blog.author} </span>
                            <br/>
                            <a href={this.state.blog.url}>{this.state.blog.url}</a>
                            <br/>
                            {this.state.blog.likes} likes
                            <button onClick={() => this.props.likeBlog(this.state.blog.id)}>Like</button>
                            <br/>
                            added by {this.state.blog.user === undefined ? 'anonymous' : this.state.blog.user.name}
                            <br/>
                            {(this.state.blog.user === undefined || this.state.blog.user.username === this.state.user.username) ?
                                <button onClick={() => this.props.deleteBlog(this.state.blog.id)}>Delete</button> : ''}
                        </div>
                        : <div onClick={this.toggleVisibility}
                               className="initialContent"> {this.state.blog.title}, {this.state.blog.author}</div>}

                </div>
            </div>
        )
    }
}

export default Blog