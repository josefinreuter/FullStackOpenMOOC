import React from 'react';
import PropTypes from 'prop-types'


const BlogForm = ({onSubmit, newTitle, newAuthor, newUrl, handleFormChange}) => {
    return (
        <div>
            <h3>Add new blog</h3>
            <form onSubmit={onSubmit}>
                <div>
                    Title:
                    <input
                        type="text"
                        name="newTitle"
                        value={newTitle}
                        onChange={handleFormChange}
                    />
                </div>
                <div>
                    Author:
                    <input
                        type="text"
                        name="newAuthor"
                        value={newAuthor}
                        onChange={handleFormChange}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        name="newUrl"
                        value={newUrl}
                        onChange={handleFormChange}
                    />
                </div>
                <br/>
                <button type="submit">Add</button>
            </form>

        </div>
    )
}

BlogForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleFormChange: PropTypes.func.isRequired,
    newTitle: PropTypes.string.isRequired,
    newAuthor: PropTypes.string.isRequired,
    newUrl: PropTypes.string.isRequired
}


export default BlogForm