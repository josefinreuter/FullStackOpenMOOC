import React from 'react'

class Blog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            blog: props.blog
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({blog: nextProps.blog});
    }


    makeVisible = () => {
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
                        <div>
                            <span
                                onClick={this.makeVisible}>{this.state.blog.title}, {this.state.blog.author} </span>
                            <br/>
                            <a href={this.state.blog.url}>{this.state.blog.url}</a>
                            <br/>
                            {this.state.blog.likes} likes
                            <button onClick={() => this.props.likeBlog(this.state.blog.id)}>Like</button>
                            <br/>
                            added by {this.props.blog.user.name}
                        </div>
                        : <div onClick={this.makeVisible}> {this.state.blog.title}, {this.state.blog.author}</div>}

                </div>
            </div>
        )
    }
}

export default Blog