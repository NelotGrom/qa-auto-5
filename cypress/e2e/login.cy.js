const testData = require("../fixtures/positiveCasesData.json");
const negativeTestData = require("../fixtures/negativeSiginData.json");
const loginPageSelectors = require("../fixtures/pages/loginPageSelectors.json");
const mainPageSelectors = require("../fixtures/pages/mainPageSelectors.json")

// const loginPageSelectors.usernameField = '[data-cy="username"]';
// const loginPageSelectors.passwordField = "#password";

describe("Verify Sign-in form inputs", () => {
  beforeEach("Go to sign in modal", () => {
    cy.visit("/");
    cy.get(mainPageSelectors.accounMenu).click();
    cy.get(mainPageSelectors.loginButton).click();
  });

  it("Check sign-in valid cases", () => {
    testData.forEach((item) => {
      cy.inputText(loginPageSelectors.usernameField, item.login);
      cy.verifyInput(loginPageSelectors.usernameField);
      cy.inputText(loginPageSelectors.passwordField, item.password);
      cy.verifyInput(loginPageSelectors.passwordField);

      cy.cleanInputField(loginPageSelectors.usernameField);
      cy.cleanInputField(loginPageSelectors.passwordField);
    });
  });

  it("Check sign-in with incorrect username", () => {
    cy.inputText(loginPageSelectors.passwordField, '012345');
    negativeTestData.login.forEach((item) => {
      cy.inputText(loginPageSelectors.usernameField, item);
      cy.verifyIncorrectInput(loginPageSelectors.usernameField);
      cy.cleanInputField(loginPageSelectors.usernameField);
    });
  });

  it("Check sign-in with incorrect password", () => {
    cy.inputText(loginPageSelectors.usernameField, '012345');
    negativeTestData.password.forEach((item) => {
      cy.inputText(loginPageSelectors.passwordField, item);
      cy.verifyIncorrectInput(loginPageSelectors.passwordField);
      cy.cleanInputField(loginPageSelectors.passwordField);
    });
  });

});