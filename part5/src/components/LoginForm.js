import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
	return (
		<>
			<h2>log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					username
				<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
				<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</>
	)
}

LoginForm.propTypes = {
	setUsername: PropTypes.func.isRequired,
	setPassword: PropTypes.func.isRequired,
	handleLogin: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
}

export default LoginForm