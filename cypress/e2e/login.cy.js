const testData = require("../fixtures/positiveCasesData.json");
const negativeTestData = require("../fixtures/negativeSiginData.json");

const usernameField = '[data-cy="username"]';
const passwordField = "#password";

describe("Verify Sign-in form inputs", () => {
  beforeEach("Go to sign in modal", () => {
    cy.visit("/");
    cy.get("#account-menu > a > span").click();
    cy.get("#login-item").click();
  });

  it("Check sign-in valid cases", () => {
    testData.forEach((item) => {
      cy.inputText(usernameField, item.login);
      cy.verifyInput(usernameField);
      cy.inputText(passwordField, item.password);
      cy.verifyInput(passwordField);

      cy.cleanInputField(usernameField);
      cy.cleanInputField(passwordField);
    });
  });

  it("Check sign-in with incorrect username", () => {
    cy.inputText(passwordField, '012345');
    negativeTestData.login.forEach((item) => {
      cy.inputText(usernameField, item);
      cy.verifyIncorrectInput(usernameField);
      cy.cleanInputField(usernameField);
    });
  });

  it("Check sign-in with incorrect password", () => {
    cy.inputText(usernameField, '012345');
    negativeTestData.password.forEach((item) => {
      cy.inputText(passwordField, item);
      cy.verifyIncorrectInput(passwordField);
      cy.cleanInputField(passwordField);
    });
  });

});