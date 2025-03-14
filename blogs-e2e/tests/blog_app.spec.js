import { test, expect, beforeEach, describe } from '@playwright/test';
import { createBlog, loginWith } from './testhelper'

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:5173/api/testing/reset')
        await request.post('http://localhost:5173/api/users', {
            data: {
                name: 'Vuong',
                username: 'vtvuong',
                password: 'testing'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByTestId("Username")).toBeVisible()
        await expect(page.getByTestId("Password")).toBeVisible()
        await expect(page.getByRole("button")).toBeVisible()
    })
    
    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByTestId("Username").fill("vtvuong")
            await page.getByTestId("Password").fill("testing")
            await page.getByRole("button", { value: 'login' }).click()
            await expect(page.getByText("vtvuong logged in")).toBeVisible()
            
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            await page.getByTestId("Username").fill("vtvuong")
            await page.getByTestId("Password").fill("wrong")
            await page.getByRole("button", { value: 'login' }).click()

            const errorDiv = await page.locator('.error')
            await expect(errorDiv).toContainText('invalid username or password')
            await expect(errorDiv).toHaveCSS('border-style', 'solid')
            await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

            await expect(page.getByText("vtvuong logged in")).not.toBeVisible()
        })
    })
})


describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:5173/api/testing/reset')
        await request.post('http://localhost:5173/api/users', {
            data: {
                name: 'Vuong',
                username: 'vtvuong',
                password: 'testing'
            }
        })

        await page.goto('http://localhost:5173/')

        
    })
  
    test('a new blog can be created', async ({ page }) => {
        await loginWith(page,'vtvuong', 'testing')
        await createBlog(page, 'Testing', 'Vuong', 'www.test.com')

        await expect(page.getByText('Testing Vuong')).toBeVisible()
    })
})

describe('Multiple users and blogs', () => {

    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:5173/api/testing/reset')
        await request.post('http://localhost:5173/api/users', {
            data: {
                name: 'Vuong',
                username: 'vtvuong',
                password: 'testing'
            }
        })

        await request.post('http://localhost:5173/api/users', {
            data: {
                name: 'root',
                username: 'Vuong2',
                password: 'testing'
            }
        })

        await page.goto('http://localhost:5173/')

        await loginWith(page,'vtvuong', 'testing')
        await createBlog(page, '1st Blog', 'Vuong', 'www.hi.com')

        await page.getByText('logout').click()

        await loginWith(page,'Vuong2', 'testing')
        await createBlog(page, '2nd Blog', 'Vuong2', 'www.hi.com')
    })

    test('like a blog', async ({page}) => {
        const first_post = await page.getByText('1st Blog Vuong').locator('..')
        await first_post.getByRole('button').click()

        expect(first_post.getByText('likes 0')).toBeVisible()

        await first_post.getByText('like').click()
        
        await first_post.getByText('likes 1').waitFor()

        expect(first_post.getByText('likes 1')).toBeVisible()
    })

    test('delete a blog', async ({ page }) => {

        const first_post = await page.getByText('2nd Blog Vuong2').locator('..')
        await first_post.getByRole('button').click()

        expect(first_post.getByText('remove')).toBeVisible()

        page.on('dialog', dialog => dialog.accept());

        await first_post.getByText('remove').click({timeout: 5000})


        await expect(page.getByText('Removed blog 2nd Blog')).toBeVisible()
    })

    test('cant delete other user blog', async ({ page }) => {

        const first_post = await page.getByText('1st Blog Vuong').locator('..')
        await first_post.getByRole('button').click()

        expect(first_post.getByText('remove')).not.toBeVisible()

    })

    test('blogs sorted by likes', async ({ page }) => {

        let blogs = await page.locator('.Blog').all()

        await expect(blogs[0]).toHaveText(/1st Blog Vuong/)

        const second_post = await page.getByText('2nd Blog Vuong2').locator('..')
        await second_post.getByRole('button').click()

        expect(second_post.getByText('likes 0')).toBeVisible()

        await second_post.getByText('like').click({timeout: 5000})
        
        blogs = await page.locator('.Blog').all()

        await expect(blogs[0]).toHaveText(/2nd Blog Vuong2/)
    })
})