import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('blog renders title and author but not url or likes by default', () => {
  const blog = {
    title: 'Test blog',
    author: 'Jest Mirad',
    url: 'www.com',
    likes: 42
  }

  const component = render(
    <Blog blog={blog}/>
  )

  expect(component.container).toHaveTextContent('Test blog')
  expect(component.container).toHaveTextContent('Jest Mirad')
  expect(component.container).not.toHaveTextContent('www.com')
  expect(component.container).not.toHaveTextContent('likes')
})