require('dotenv').config()
const express = require('express')
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser')
const morgan = require('morgan')
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
morgan.token('body',
	req => req.body ? JSON.stringify(req.body) : null)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const Person = require('./models/person')

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
	Person
		.find({})
		.then(persons => {
			console.log('phonebook:')
			persons = persons.map(person => person.toJSON())
			persons.forEach(person => console.log(`${person.name} ${person.number}`))
			res.json(persons)
		})
		.catch(error => console.log(error))
})

app.get('/info', (req, res) => {
	Person
		.find({})
		.then(persons => {
			const count = persons.length
			const date = new Date().toUTCString()
			res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</>`)
		})
		.catch(error => console.log(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	Person
		.findById(request.params.id)
		.then(person => {
			if (person)
				response.json(person.toJSON())
			else
				response.status(404).end()
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
	const body = request.body
	// if (!body.name || !body.number) {
	// 	return response.status(400).json({
	// 		error: 'name or number missing'
	// 	})
	// }
	// if (persons.map(person => person.name).includes(body.name)) {
	// 	return response.status(400).json({
	// 		error: 'name must be unique'
	// 	})
	// }

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person.save().then(savedPerson => {
		response.json(savedPerson.toJSON())
	})
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).send({ error: 'malformatted id' })
	}

	next(error)
}
app.use(errorHandler)