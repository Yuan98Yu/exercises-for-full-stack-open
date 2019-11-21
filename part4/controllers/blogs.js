const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')


blogsRouter.get('/', (request, response, next) => {
	Blog
		.find({})
		.populate('user', { username: 1, name: 1 })
		.then(blogs => blogs.map(blog => blog.toJSON()))
		.then(blogs => {
			response.json(blogs)
		})
		.catch(error => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
	const body = request.body
	const token = request.token
	
	try {
		const decodedToken = jwt.verify(token, process.env.SECRET)
		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' })
		}
		const user = await User.findById(decodedToken.id)
		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
			user: decodedToken.id
		})

		const savedBlog = await blog.save()
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()
		response.json(savedBlog.toJSON())
	} catch (exception) {
		next(exception)
	}
})

blogsRouter.delete('/:id', async (request, response, next) => {
	const token = request.token
	
	try {
		const decodedToken = jwt.verify(token, process.env.SECRET)
		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' })
		}
		const blog = await Blog.findById(request.params.id)
		if ( blog.user.toString() === decodedToken.id) {
			await Blog.findByIdAndRemove(request.params.id)

			response.status(204).end()
		}
		else {
			return response.status(401).json({ error: 'has no privlege' })
		}
	} catch (exception) {
		next(exception)
	}
})

blogsRouter.put('/:id', (request, response, next) => {
	const body = request.body
	const token = request.token

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: body.user.id
	}

	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	Blog
		.findByIdAndUpdate(request.params.id, blog, { new: true })
		.then(updatedBlog => {
			console.log(updatedBlog)
			updatedBlog.toJSON()
		})
		.then(updatedAndFormattedBlog => {
			response.json(updatedAndFormattedBlog)
		})
		.catch(error => next(error))
})

module.exports = blogsRouter