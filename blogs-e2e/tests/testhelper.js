
const loginWith = async (page, username, password)  => {
    await page.getByTestId('Username').fill(username)
    await page.getByTestId('Password').fill(password)
    await page.getByRole('button', { value: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByText('create new blog').click()
    await page.locator('#title').fill(title)
    await page.locator('#author').fill(author)
    await page.locator('#url').fill(url)
    await page.locator('#create').click()
    await page.getByText(`${title} ${author}`).waitFor()
}

export { loginWith, createBlog }