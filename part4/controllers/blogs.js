const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', (request, response, next) => {
	Blog
		.find({})
		.then(blogs => blogs.map(blog => blog.toJSON()))
		.then(blogs => {
			response.json(blogs)
		})
		.catch(error => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
	const user = await User.findById(request.body.userID)

	const blog = new Blog({ ...request.body, userID: request.body.userID })

	try {
		const savedNote = await blog.save()
		user.notes = user.notes.concat(savedNote._id)
		await user.save()
		response.json(savedNote.toJSON())
	} catch (exception) {
		next(exception)
	}
})

blogsRouter.delete('/:id', (request, response, next) => {
	Blog
		.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

module.exports = blogsRouter