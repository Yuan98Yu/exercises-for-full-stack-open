import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import blogsService from './services/blogs'

blogsService
	.getAll()
	.then(blogs => {
		ReactDOM.render(
			<App blogs={blogs} />,
			document.getElementById('root')
		)
	})