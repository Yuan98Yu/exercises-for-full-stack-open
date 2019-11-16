const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', (request, response, next) => {
	User
		.find({})
		.then(users => users.map(user => user.toJSON()))
		.then(users => {
			response.json(users)
		})
		.catch(error => next(error))
})

usersRouter.post('/', (request, response, next) => {
	const body = request.body
	if (body.password.length < 3) {
		response.status(400).send({
			error: 'ValidationError',
			message: 'password\'s length should >= 3'
		})
	}

	const saltRounds = 10
	bcrypt
		.hash(body.password, saltRounds)
		.then(passwordHash => {
			const user = new User({
				username: body.username,
				name: body.name,
				passwordHash
			})

			user
				.save()
				.then(result => {
					response.status(201).json(result)
				})
				.catch(error => next(error))
		})


})

usersRouter.delete('/:id', (request, response, next) => {
	User
		.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

module.exports = usersRouter