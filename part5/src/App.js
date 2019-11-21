import React, { useState, useEffect } from 'react'
// import logo from './logo.svg'
// import './App.css'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Button from './components/Button'

import loginService from './services/login'
import blogService from './services/blogs'

const App = props => {
	const sortByLikes = blogs => {
		const newBlogs = blogs.slice()
		// console.log(newBlogs)
		return newBlogs.sort((a, b) => b.likes - a.likes)
	}
	const [blogs, setBlogs] = useState(sortByLikes(props.blogs))

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const blogFormRef = React.createRef()
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const [errorMessage, setErrorMessage] = useState(null)
	const showNotification = (message, time = 8000) => {
		setErrorMessage(message)
		setTimeout(() => {
			setErrorMessage(null)
		}, time)
	}

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password,
			})

			window.localStorage.setItem(
				'loggedNoteappUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			showNotification('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const addBlog = async (event) => {
		event.preventDefault()
		try {
			await blogService.create({
				title, author, url, likes: 0
			})
			let newBlogs = await blogService.getAll()
			setBlogs(newBlogs)
			showNotification(`a new blog ${title} by ${user.username} added`)
		} catch (exception) {
			showNotification(exception)
			console.log(exception)
		}
	}

	const handleLike = blog => () => {
		const newBlog = { ...blog, likes: blog.likes + 1 }
		blogService
			.update(newBlog.id, newBlog)
			.then(() => {
				const newBlogs = blogs.map(blog => blog.id === newBlog.id ? newBlog : blog)
				setBlogs(sortByLikes(newBlogs))
			})
			.catch(error => {
				console.log(error)
			})
	}

	const deleteBlog = blog => () => {
		if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
			blogService
				.deleteItem(blog.id)
				.then(() => {
					showNotification('delete blog')
				})
				.then( () => {
					blogService
						.getAll()
						.then(newBlogs => setBlogs(sortByLikes(newBlogs)))
				})
				.catch(exception => {
					showNotification(exception)
				})
		}
	}

	return (
		<div className='App'>
			<Notification message={errorMessage} />
			{user === null ?
				<LoginForm username={username} password={password}
					setUsername={setUsername} setPassword={setPassword}
					handleLogin={handleLogin} /> :
				(
					<>
						<h1>blogs</h1>
						<p>{user.username} logged in<Button name='log out' onClick={() => { window.localStorage.removeItem('loggedNoteappUser'); setUser(null) }} /></p>
						<Togglable buttonLabel='new blog' ref={blogFormRef}>
							<BlogForm title={title} author={author} url={url}
								setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl}
								addBlog={addBlog} />
						</Togglable>
						<BlogList user={user} blogs={blogs} handleLike={handleLike} deleteBlog={deleteBlog} />
					</>
				)
			}

		</div >
	)
}

export default App
