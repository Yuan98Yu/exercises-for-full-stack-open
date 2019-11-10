const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (req, res) => {
	Person
		.find({})
		.then(persons => {
			res.json(persons)
		})
		.catch(error => console.log(error))
})

personsRouter.get('/info', (req, res) => {
	Person
		.find({})
		.then(persons => {
			const count = persons.length
			const date = new Date().toUTCString()
			res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</>`)
		})
		.catch(error => console.log(error))
})

personsRouter.get('/:id', (request, response, next) => {
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

personsRouter.delete('/:id', (request, response, next) => {
	Person
		.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
	const body = request.body

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person
		.save()
		.then(savedPerson => savedPerson.toJSON())
		.then(savedAndFormmatedPerson => {
			response.json(savedAndFormmatedPerson)
		})
		.catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
	const body = request.body

	const person = {
		name: body.name,
		number: body.number,
	}

	Person
		.findByIdAndUpdate(request.params.id, person, { new: true })
		.then(updatedPerson => updatedPerson.toJSON())
		.then(updatedAndFormattedPerson => {
			response.json(updatedAndFormattedPerson)
		})
		.catch(error => next(error))
})

module.exports = personsRouter