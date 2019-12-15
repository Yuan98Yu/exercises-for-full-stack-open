import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders SimpleBlog', () => {
	const blog = {
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0
	}
	const mockHandler = jest.fn()

	const component = render(<SimpleBlog blog={blog} onClick={mockHandler}/>)

	const strs = [blog['title'], blog['author'], blog['likes']]
	strs.forEach(str => {
		expect(component.container).toHaveTextContent( str )
	})

	const button = component.getByText('like')
	for(let i=0; i<2; ++i)
		fireEvent.click(button)
	expect(mockHandler.mock.calls.length).toBe(2)
})