const _Collection = require('lodash/collection')
const _Object = require('lodash/object')
const dummy = () => {
	return 1
}

const totalLikes = blogs =>
	blogs
		.map(blog => blog.likes)
		.reduce((sum, cur) =>
			sum + cur
		, 0)

const favariteBlog = blogs =>
	blogs
		.reduce((pre, cur) =>
			pre.likes > cur.likes
				? pre : cur
		, { likes: -1 })

const mostBlogs = blogs => {
	let groups = _Collection.groupBy(blogs, 'author')
	groups = _Object.toPairs(groups)
	return groups
		.map(group => {
			return { author: group[0], blogs: group[1].length }
		})
		.reduce((pre, cur) =>
			pre.blogs > cur.blogs
				? pre : cur
		, { blogs: -1 })
}

const mostLikes = blogs => {
	let groups = _Collection.groupBy(blogs, 'author')
	groups = _Object.toPairs(groups)
	return groups
		.map(group => {
			return {
				author: group[0],
				likes: group[1]
					.map(blog => blog.likes)
					.reduce((sum, cur) => sum + cur
						, 0)
			}
		})
		.reduce((pre, cur) =>
			pre.likes > cur.likes
				? pre : cur
		, { likes: -1 })
}

module.exports = {
	dummy,
	totalLikes,
	favariteBlog,
	mostBlogs,
	mostLikes
}