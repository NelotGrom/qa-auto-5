const testData = require("../fixtures/positiveCasesData.json");
const negativeTestData = require("../fixtures/negativeСasesData.json");

const userField = '[data-cy="username"]';
const emailField = "#email";
const firstPassField = '[data-cy="firstPassword"]';
const secondPassField = '[data-cy="secondPassword"]';
const submitButton = '[data-cy="submit"]';

describe("Verify registration inputs", () => {
  beforeEach("Go to register page", () => {
    cy.visit("/");
    cy.get("#account-menu > a > span").click();
    cy.get('[data-cy="register"]').click();
  });

  it("Check a valid formats of registration", () => {
    testData.forEach((item) => {
      cy.inputText(userField, item.login);
      cy.verifyInput(userField);
      cy.inputText(emailField, item.email);
      cy.verifyInput(emailField);
      cy.inputText(firstPassField, item.password);
      cy.verifyInput(firstPassField);
      cy.inputText(secondPassField, item.password)
      cy.verifyInput(secondPassField);

      cy.cleanInputField(userField);
      cy.cleanInputField(emailField);
      cy.cleanInputField(firstPassField);
      cy.cleanInputField(secondPassField);
    });
  });

  it("Check a login negative cases", () => {
    cy.inputText(emailField,'test@com.com');
    cy.inputText(firstPassField,'1234');
    cy.inputText(secondPassField,'1234');
    negativeTestData.login.forEach((item) => {
      cy.inputText(userField, item)
      cy.verifyIncorrectInput(userField);
      cy.cleanInputField(userField);
    })
  })

  it("Check a email negative cases", () => {
    cy.inputText(userField,'test');
    cy.inputText(firstPassField,'1234');
    cy.inputText(secondPassField,'1234');
    negativeTestData.email.forEach((item) => {
      cy.inputText(emailField, item)
      cy.verifyIncorrectInput(emailField);
      cy.cleanInputField(emailField);
    })
  })

  it("Check the 1st password negative cases", () => {
    cy.inputText(userField,'test');
    cy.inputText(emailField,'test@test.com');
    cy.inputText(secondPassField,'1234');
    negativeTestData.password.forEach((item) => {
      cy.inputText(firstPassField, item);
      cy.verifyIncorrectInput(firstPassField);
      cy.cleanInputField(firstPassField);
    })
  })

  it("Check the 2st password negative cases", () => {
    cy.inputText(userField,'test');
    cy.inputText(emailField,'test@test.com');
    cy.inputText(firstPassField,'1234');
    negativeTestData.password.forEach((item) => {
      cy.inputText(secondPassField, item);
      cy.verifyIncorrectInput(secondPassField);
      cy.cleanInputField(secondPassField);
    })
  })

});