describe("Verify login positive inputs", () => {
    beforeEach("Go to login modal", () => {
      cy.visit("/");
      cy.get("#account-menu > a > span").click();
      cy.get("#login-item").click();
    });
  
    it('Verify "Logo" nav link in header', () => {
      cy.get(".brand-title").contains("Sqlverifier").click();
    });

//      cy.get("#username").type("kosStudent");
//    cy.get("#password").type("12345");
//  cy.get('[data-cy="submit"]').click();
