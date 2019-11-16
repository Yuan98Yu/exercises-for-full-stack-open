const morgan = require('morgan')

morgan.token('body',
	req => req.body ? JSON.stringify(req.body) : null)
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).send({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({
			error: 'invalid token'
		})
	}

	next(error)
}

const tokenExtractor = (request, response, next) => {
	const getTokenFrom = request => {
		const authorization = request.get('authorization')
		if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
			return authorization.substring(7)
		}
		return null
	}
	let token = getTokenFrom(request)
	request.token = token

	next()
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor
}