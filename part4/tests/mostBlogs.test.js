const mostBlogs = require('../utils/list_helper').mostBlogs
const blogs = require('./blogs').blogs

describe('most_blogs_of_empty_list', () => {
	test('', () => {
		expect(mostBlogs([])).toEqual({blogs: -1})
	})
})

describe('most_blogs_of_many_blogs', () => {
	test('', () => {
		expect(mostBlogs(blogs)).toEqual({
			author: 'Robert C. Martin',
			blogs: 3
		})
	})
})