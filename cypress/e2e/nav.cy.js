describe("Check the nav links with student creds", () => {
  beforeEach("Login with student creds", () => {
    cy.visit("/");
    cy.get("#account-menu > a > span").click();
    cy.get("#login-item").click();
    cy.get("#username").type("kosStudent");
    cy.get("#password").type("12345");
    cy.get('[data-cy="submit"]').click();
  });

  it('Verify "Logo" nav link in header', () => {
    cy.visit("/user-task");
    cy.get(".brand-title").contains("Sqlverifier").click();
    cy.url().should("eq", Cypress.config().baseUrl + "?page=1&sort=id,asc");
  });

  it('Verify "Home" nav link in header', () => {
    cy.visit("/task");
    cy.get("#header-tabs > li:nth-child(1) > a > span > span")
      .should("have.text", "Home")
      .click();
    cy.url().should("eq", Cypress.config().baseUrl + "?page=1&sort=id,asc");
  });

  it('Verify "Entities->Task" nav link in header', () => {
    cy.get('[data-cy="entity"] > .d-flex')
      .should("have.text", "Entities")
      .click();
    cy.get('[href="/task"] > span').click();
    cy.url().should("eq", Cypress.config().baseUrl + "task?page=1&sort=id,asc");
  });

  it('Verify "Entities->User Task" nav link in header', () => {
    cy.get('[data-cy="entity"] > .d-flex')
      .should("have.text", "Entities")
      .click();
    cy.get('[href="/user-task"] > span').click();
    cy.url().should("eq", Cypress.config().baseUrl + "user-task");
  });

  it('Verify "Swagger->API" nav link in header', () => {
    cy.get('[data-cy="docsMenu"] > .d-flex')
      .should("have.text", "Swagger")
      .click();
    cy.get('[data-cy="docsMenu"] > .dropdown-menu > .dropdown-item').click();
    cy.url().should("eq", Cypress.config().baseUrl + "docs/docs");
  });

  it('Verify "Français" nav link in header swithces a lang', () => {
    cy.checkText(":nth-child(4) > .d-flex > span","English").click();
    cy.get('[value="fr"]').click();
    cy.langChangeCheck('Français', 'Accueil', 'Entités', 'Compte');
  });

  it('Verify "Русский" nav link in header swithces a lang', () => {
    cy.checkText(":nth-child(4) > .d-flex > span","English").click();
    cy.get('[value="ru"]').click();
    cy.langChangeCheck('Русский', 'Главная', 'Сущности', 'Профиль');
  }); 

  it('Verify "Українська" nav link in header swithces a lang', () => {
    cy.checkText(":nth-child(4) > .d-flex > span","English").click();
    cy.get('[value="ua"]').click();
    cy.langChangeCheck('Українська', 'Головна', 'Сутності', 'Профіль');
  });

  it('Verify "English" nav link in header swithces a lang', () => {
    cy.get(":nth-child(4) > .d-flex > span").click();
    cy.get('[value="en"]').click();
    cy.langChangeCheck('English', 'Home', 'Entities', 'Account');
  });

  it('Verify "Account->Settings" nav link in header', () => {
    cy.get(":nth-child(5) > .d-flex > span")
      .should("have.text", "Account")
      .click();
    cy.get('[data-cy="settings"]').click();
    cy.url().should("eq", Cypress.config().baseUrl + "account/settings");
  });

  it('Verify "Account->Password" nav link in header', () => {
    cy.get(":nth-child(5) > .d-flex > span")
      .should("have.text", "Account")
      .click();
    cy.get('[data-cy="passwordItem"]').click();
    cy.url().should("eq", Cypress.config().baseUrl + "account/password");
  });

  it('Verify "Account->Sign out" nav link in header', () => {    
    cy.get(":nth-child(5) > .d-flex > span")
      .should("have.text", "Account")
      .click();
    cy.get('[data-cy="logout"]').click();
    cy.url().should("eq", Cypress.config().baseUrl + "logout");
  });
});

// it('ORIGINAL Verify "English" nav link in header swithces a lang', () => {
  //   cy.get(":nth-child(4) > .d-flex > span").click();
  //   cy.get('[value="ru"]').click();
  //   cy.get(":nth-child(4) > .d-flex > span").click();
  //   cy.get('[value="en"]').click();
  //   cy.get(":nth-child(4) > .d-flex > span").should("have.text", "English");
  //   cy.get("#header-tabs > li:nth-child(1) > a > span > span").should(
  //     "have.text",
  //     "Home"
  //   );
  //   cy.get('[data-cy="entity"] > .d-flex').should("have.text", "Entities");
  //   cy.get(":nth-child(5) > .d-flex > span").should("have.text", "Account");
  // });