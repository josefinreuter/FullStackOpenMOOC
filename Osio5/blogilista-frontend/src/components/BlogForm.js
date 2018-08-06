import React from 'react';


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

export default BlogForm