import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Individual blog tests', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Test blog',
      author: 'Jest Mirad',
      url: 'www.com',
      likes: 42,
      user: { username: 'td', name: 'Test Developer' }
    }
    component = render(
      <Blog blog={blog} />
    )
  })

  test('blog renders title and author but not url or likes by default', () => {
    expect(component.container).toHaveTextContent('Test blog')
    expect(component.container).toHaveTextContent('Jest Mirad')
    expect(component.container).not.toHaveTextContent('www.com')
    expect(component.container).not.toHaveTextContent('likes')
  })

  test('details shown when show button clicked', () => {
    const showButton = component.getByText('show')

    fireEvent.click(showButton)
    const div = component.container.querySelector('.details')

    expect(div).toHaveTextContent('www')
  })
})