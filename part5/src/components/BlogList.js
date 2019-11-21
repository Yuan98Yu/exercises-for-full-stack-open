import React from 'react'
import Blog from './Blog'
const BlogList = ({ user, blogs, setBlogs, handleLike, deleteBlog}) => {
	const getBlogs = () => blogs && blogs.map(blog => <Blog key={blog.id} user={user} blog={blog} handleLike={handleLike} deleteBlog={deleteBlog}/>)

    return (
        <>
            {getBlogs()}
        </>
    )
}

export default BlogList