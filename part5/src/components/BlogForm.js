import React from 'react'

const BlogForm = ({title, author, url, setTitle, setAuthor, setUrl, addBlog}) => {
	return (
		<>
			<h2>create new</h2>
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
		</>
	)
}


export default BlogForm