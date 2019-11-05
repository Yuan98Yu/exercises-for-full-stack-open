const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
app.use(bodyParser.json())
morgan.token('body', 
	req => req.body?JSON.stringify(req.body):null)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
	{
		"name": "Arto Hellas",
		"number": "040-123456",
		"id": 1
	},
	{
		"name": "Ada Lovelace",
		"number": "39-44-5323523",
		"id": 2
	},
	{
		"name": "Dan Abramov",
		"number": "12-43-234345",
		"id": 3
	},
	{
		"name": "Mary Poppendieck",
		"number": "39-23-6423122",
		"id": 4
	}
]

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

app.get('/info', (req, res) => {
	const count = persons.length
	const date = new Date().toUTCString()
	res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</>`)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)

	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	person = persons.find(person => person.id === id)
	console.log(person?`found person:${person}\ndel...`:`not found id:${id}`)
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})

app.post('/api/persons', (request, response) => {
	const max = 65535
	const generateId = () => Math.floor(Math.random() * max)

	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'name or number missing'
		})
	}
	if (persons.map(person => person.name).includes(body.name)) {
		return response.status(400).json({
			error: 'name must be unique'
		})
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generateId(),
	}

	persons = persons.concat(person)

	response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)