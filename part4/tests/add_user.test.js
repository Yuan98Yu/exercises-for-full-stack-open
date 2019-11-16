const helper = require('../utils/test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('when db is empty', () => {
	beforeEach(async () => {
		await User.deleteMany({})
		// .then( () => new User({ username: 'root', password: 'sekret' }) )
		// .then(user => user.save() )
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const newUser = {
			username: 'mluukkai',
			name: 'Superuser',
			password: 'salainen',
		}
		await api
			.post('/api/users')
			.send(newUser)

		const usersAtStart = await helper.usersInDb()

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('`username` to be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd.length).toBe(usersAtStart.length)
	})

	test('creation fails with too short username(<3)', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'as',
			name: 'Matti Luukkainen',
			password: 'salainen',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd.length).toBe(usersAtStart.length)
	})

	test('creation fails with too short password(<3)', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'asd',
			name: 'Matti Luukkainen',
			password: 'as',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd.length).toBe(usersAtStart.length)
	})
})