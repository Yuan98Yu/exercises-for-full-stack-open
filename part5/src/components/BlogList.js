import React from 'react'
import Blog from './Blog'
const BlogList = ({ blogs, setBlogs}) => {
    const getBlogs = () => blogs && blogs.map(blog => <Blog key={blog.id} blog={blog} />)

    return (
        <>
            {getBlogs()}
        </>
    )
}

export default BlogList