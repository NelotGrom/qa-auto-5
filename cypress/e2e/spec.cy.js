describe('sql verifyer spec', () => {
  beforeEach(() => {
    cy.visit('https://sqlverifier-live-6e21ca0ed768.herokuapp.com/')
  })

  it('User can visit the main page',() => {
    cy.get('.brand-title').should('have.text', "Sqlverifier"),
    cy.get('.d-flex.align-items-center.dropdown-toggle.nav-link > :nth-child(2)').should('contain', 'Account');
  })
})    