const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) => {
	Blog
		.find({})
		.then(blogs => blogs.map(blog => blog.toJSON()))
		.then(blogs => {
			response.json(blogs)
		})
		.catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
	const blog = new Blog(request.body)

	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})
		.catch(error => next(error))
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