const mostLikes = require('../utils/list_helper').mostLikes
const blogs = require('./blogs').blogs

describe('most_likes_of_empty_list', () => {
	test('', () => {
		expect(mostLikes([])).toEqual({likes: -1})
	})
})

describe('most_likes_of_many_blogs', () => {
	test('', () => {
		expect(mostLikes(blogs)).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17
		})
	})
})