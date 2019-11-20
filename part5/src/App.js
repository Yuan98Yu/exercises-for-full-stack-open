import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Button from './components/Button'

import loginService from './services/login'
import blogService from './services/blogs'

const App = props => {
	const [blogs, setBlogs] = useState(props.blogs)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

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
				title, author, url
			})
			let blogs = await blogService.getAll()
			setBlogs(blogs)
			showNotification(`a new blog ${title} by ${user.username} added`)
		} catch (exception) {
			showNotification(exception)
			console.log(exception)
		}
	}

	return (
		<div className="App">
			<Notification message={errorMessage} />
			{user === null ?
				<LoginForm username={username} password={password}
					setUsername={setUsername} setPassword={setPassword} setUser={setUser}
					handleLogin={handleLogin} /> :
				(
					<>
						<h1>blogs</h1>
						<p>{user.username} logged in<Button name='log out' onClick={() => {window.localStorage.removeItem('loggedNoteappUser'); setUser(null)} } /></p>
						<BlogForm title={title} author={author} url={url}
							setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl}
							addBlog={addBlog} />
						<BlogList blogs={blogs} setBlogs={setBlogs} />
					</>
				)
			}

		</div>
	);
}

export default App;
