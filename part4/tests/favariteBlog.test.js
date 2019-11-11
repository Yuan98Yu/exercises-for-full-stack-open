const favariteBlog = require('../utils/list_helper').favariteBlog
const blogs = require('./blogs').blogs

describe('favarite_blog_of_empty_list', () => {
	test('', () => {
		expect(favariteBlog([])).toEqual({likes: -1})
	})
})

describe('favarite_blog_of_many_list', () => {
	test('', () => {
		expect(favariteBlog(blogs)).toEqual(blogs[2])
	})
})