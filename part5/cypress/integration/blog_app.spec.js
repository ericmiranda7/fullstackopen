describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset')
    cy.visit('http://localhost:3000')
  })

  it('Check if on login page by default', function () {
    cy.contains('Please Login')
  })
})