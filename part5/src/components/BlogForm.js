import React, { useState } from 'react'
import blogService from '../services/blogs'
const BlogForm = (title, author, url, setTitle, setAuthor, setUrl) => {
	const addBlog = () => {
		event.preventDefault()
		try {
			const blog = await blogService.create({
				title, author, url
			})
		} catch (exception) {
			console.log(exception)
		}
	}

	return (
		<form onSubmit={addBlog}>
			<div>
				title:
				<input
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				author:
				<input
					value={author}
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
				url:
				<input
					value={url}
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<div>
				<button type="submit">create</button>
			</div>
		</form>
	)
}


export default BlogForm