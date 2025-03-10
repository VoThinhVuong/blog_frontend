import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { beforeEach, describe, expect } from 'vitest'

describe('blog list tests', () => {
    let blog

    beforeEach(async () => {
        window.localStorage.setItem('loggedUser', JSON.stringify({ id: 'abc' }))
        blog = {
            title: 'tesing',
            author: 'vite',
            likes: 0,
            user: { name: 'Vuong' },
            url: 'www.testing.com',
            id: 1
        }
    })

    test('blog hide details at start',async () => {

        const { container } = render(<Blog blog={blog} />)

        const element = container.querySelector('.Blog')
        const div = container.querySelector('.toggableContent')

        expect(element).toHaveTextContent('testing')
        expect(element).toHaveTextContent('vite')
        expect(div).toHaveStyle('display: none')
    })

    test('view blog details',async () => {

        const { container } = render(<Blog blog={blog} />)

        const button = container.querySelector('.button')
        const div = container.querySelector('.toggableContent')
        expect(div).toHaveStyle('display: none')

        const user = userEvent.setup()

        await user.click(button)

        expect(div).toHaveStyle('display: block')
    })

    test('clicked like 2 times', async () => {

        const mockHandler = vi.fn()

        render(<Blog blog={blog} mockHandler={mockHandler}/>)

        const user = userEvent.setup()
        const button = screen.getByText('like')
        await user.click(button)
        await user.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })

    test('submitting a new blog', async () => {
        const mockHandler = vi.fn()
        const user = userEvent.setup()

        const { container } = render(<BlogForm mockHandler={mockHandler} />)

        const title = container.querySelector('#title')
        const author = container.querySelector('#author')
        const url = container.querySelector('#url')
        const sendButton = screen.getByText('create')

        await user.type(title, 'testing a form...')
        await user.type(author, 'tester')
        await user.type(url, 'www.test.com')
        await user.click(sendButton)

        expect(mockHandler.mock.calls).toHaveLength(1)
        expect(mockHandler.mock.calls[0][0]['title']).toBe('testing a form...')
        expect(mockHandler.mock.calls[0][0]['author']).toBe('tester')
        expect(mockHandler.mock.calls[0][0]['url']).toBe('www.test.com')
    })
})