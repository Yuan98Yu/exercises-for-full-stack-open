import React, { useState } from 'react'
import Button from './Button'

const Blog = ({ user, blog, handleLike, deleteBlog }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}
	const emphasisStyle = {
		border: 'dashed',
		borderColor: 'red'
	}

	const [visible, setVisible] = useState(false)
	const showWhenVisible = { display: visible ? '' : 'none' }
	const toggleVisible = () => {
		setVisible(!visible)
		console.log(blog.user, user)
	}
	const showWhenEqual = { display: user.username === blog.user.username ? '' : 'none' }



return (
	<div style={blogStyle}>
		<div onClick={toggleVisible} style={emphasisStyle}>
			{blog.title} {blog.author}
		</div>
		<div style={showWhenVisible}>
			<a href={blog.url}>{blog.url}</a>
			<p>{blog.likes} likes<Button onClick={handleLike(blog)} name='like' /></p>
			<p>added by {blog.user.username}</p>
			<div style={showWhenEqual}>
				<Button name="remove" onClick={deleteBlog(blog)}/>
			</div>

		</div>
	</div>
)
}

export default Blog