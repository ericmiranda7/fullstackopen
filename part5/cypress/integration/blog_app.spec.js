describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset')

    const user = {
      username: 'ericm',
      name: 'Eric Miranda',
      password: 'str',
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Check if on login page by default', function () {
    cy.contains('Please Login')
  })

  describe('Logging in...', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('ericm')
      cy.get('#password').type('str')
      cy.get('#login-button').click()

      cy.contains('blogs')
    })

    it('fails with incorrect creds', function () {
      cy.get('#username').type('ericm')
      cy.get('#password').type('blah')
      cy.get('#login-button').click()

      cy.get('#msg-p')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      const user = { username: 'ericm', password: 'str' }
      cy.request('POST', 'http://localhost:3003/api/login', user)
        .then(response => {
          window.localStorage.setItem('user', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
    })

    it('A blog can be created', function () {
      cy.contains('Create Blog')
    })

    it.only('Created blog is added to list', function () {
      const blog = {
        title: 'created using cypress',
        author: 'cypress',
        url: 'http://www.blah.com'
      }

      cy.contains('Create Blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#submit-blog').click()

      cy.contains(blog.title)
    })
  })
})