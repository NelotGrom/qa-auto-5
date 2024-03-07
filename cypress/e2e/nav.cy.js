describe("Check the nav links with student creds", () => {
  beforeEach("Login with student creds", () => {
    cy.visit("/"),
      cy.get("#account-menu > a > span").click(),
      cy.get("#login-item").click(),
      cy.get("#username").type("kosStudent"),
      cy.get("#password").type("12345"),
      cy.get('[data-cy="submit"]').click();
  });

  it('Verify "Logo" nav link in header', () => {
    cy.visit("/user-task");
    cy.get(".brand-title").contains("Sqlverifier").click();
    cy.url().should(
      "eq",
      "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/?page=1&sort=id,asc"
    );
  });

  it('Verify "Home" nav link in header', () => {
    cy.visit("/task");
    cy.get("#header-tabs > li:nth-child(1) > a > span > span")
      .should("have.text", "Home")
      .click();
    cy.url().should(
      "eq",
      "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/?page=1&sort=id,asc"
    );
  });

  it('Verify "Entities->Task" nav link in header', () => {
    cy.get('[data-cy="entity"] > .d-flex')
      .should("have.text", "Entities")
      .click();
    cy.get('[href="/task"] > span').click();
    cy.url().should(
      "eq",
      "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/task?page=1&sort=id,asc"
    );
  });

  it('Verify "Entities->User Task" nav link in header', () => {
    cy.get('[data-cy="entity"] > .d-flex')
      .should("have.text", "Entities")
      .click();
    cy.get('[href="/user-task"] > span').click();
    cy.url().should(
      "eq",
      "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/user-task"
    );
  });

  it('Verify "Swagger->API" nav link in header', () => {
    cy.get('[data-cy="docsMenu"] > .d-flex')
      .should("have.text", "Swagger")
      .click();
    cy.get('[data-cy="docsMenu"] > .dropdown-menu > .dropdown-item').click();
    cy.url().should(
      "eq",
      "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/docs/docs"
    );
  });

  it('Verify "Français" nav link in header swithces a lang', () => {
    cy.get(":nth-child(4) > .d-flex > span")
      .should("have.text", "English")
      .click();
    cy.get('[value="fr"]').click();
    cy.get(":nth-child(4) > .d-flex > span").should("have.text", "Français");
    cy.get("#header-tabs > li:nth-child(1) > a > span > span").should(
      "have.text",
      "Accueil"
    );
    cy.get('[data-cy="entity"] > .d-flex').should("have.text", "Entités");
    cy.get(":nth-child(5) > .d-flex > span").should("have.text", "Compte");
  });

  it('Verify "Русский" nav link in header swithces a lang', () => {
    cy.get(":nth-child(4) > .d-flex > span")
      .should("have.text", "English")
      .click();
    cy.get('[value="ru"]').click();
    cy.get(":nth-child(4) > .d-flex > span").should("have.text", "Русский");
    cy.get("#header-tabs > li:nth-child(1) > a > span > span").should(
      "have.text",
      "Главная"
    );
    cy.get('[data-cy="entity"] > .d-flex').should("have.text", "Сущности");
    cy.get(":nth-child(5) > .d-flex > span").should("have.text", "Профиль");
  });

  it('Verify "Українська" nav link in header swithces a lang', () => {
    cy.get(":nth-child(4) > .d-flex > span")
      .should("have.text", "English")
      .click();
    cy.get('[value="ua"]').click();
    cy.get(":nth-child(4) > .d-flex > span").should("have.text", "Українська");
    cy.get("#header-tabs > li:nth-child(1) > a > span > span").should(
      "have.text",
      "Головна"
    );
    cy.get('[data-cy="entity"] > .d-flex').should("have.text", "Сутності");
    cy.get(":nth-child(5) > .d-flex > span").should("have.text", "Профіль");
  });

  it('Verify "English" nav link in header swithces a lang', () => {
    cy.get(":nth-child(4) > .d-flex > span").click();
    cy.get('[value="ru"]').click();
    cy.get(":nth-child(4) > .d-flex > span").click();
    cy.get('[value="en"]').click();

    cy.get(":nth-child(4) > .d-flex > span").should("have.text", "English");
    cy.get("#header-tabs > li:nth-child(1) > a > span > span").should(
      "have.text",
      "Home"
    );
    cy.get('[data-cy="entity"] > .d-flex').should("have.text", "Entities");
    cy.get(":nth-child(5) > .d-flex > span").should("have.text", "Account");
  });

  it('Verify "Account->Settings" nav link in header', () => {
    cy.get(":nth-child(5) > .d-flex > span")
      .should("have.text", "Account")
      .click();
    cy.get('[data-cy="settings"]').click();
    cy.url().should(
      "eq",
      "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/account/settings"
    );
  });

  it('Verify "Account->Password" nav link in header', () => {
    cy.get(":nth-child(5) > .d-flex > span")
      .should("have.text", "Account")
      .click();
    cy.get('[data-cy="passwordItem"]').click();
    cy.url().should(
      "eq",
      "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/account/password"
    );
  });

  it('Verify "Account->Sign out" nav link in header', () => {
    cy.get(":nth-child(5) > .d-flex > span")
      .should("have.text", "Account")
      .click();
    cy.get('[data-cy="logout"]').click();
    cy.url().should(
      "eq",
      "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/logout"
    );
  });
});