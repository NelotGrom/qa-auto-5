const testData = require("../fixtures/positiveCasesData.json");
const negativeTestData = require("../fixtures/negativeСasesData.json");
const registerPageSelectors = require("../fixtures/pages/registerPageSelectors.json");

describe("Verify registration inputs", () => {
  beforeEach("Go to register page", () => {
    cy.visit("/");
    cy.get("#account-menu > a > span").click();
    cy.get('[data-cy="register"]').click();
  });

  it("Check a valid formats of registration", () => {
    testData.forEach((item) => {
      cy.inputText(registerPageSelectors.userField, item.login);
      cy.verifyInput(registerPageSelectors.userField);
      cy.inputText(registerPageSelectors.emailField, item.email);
      cy.verifyInput(registerPageSelectors.emailField);
      cy.inputText(registerPageSelectors.firstPassField, item.password);
      cy.verifyInput(registerPageSelectors.firstPassField);
      cy.inputText(registerPageSelectors.secondPassField, item.password)
      cy.verifyInput(registerPageSelectors.secondPassField);

      cy.cleanInputField(registerPageSelectors.userField);
      cy.cleanInputField(registerPageSelectors.emailField);
      cy.cleanInputField(registerPageSelectors.firstPassField);
      cy.cleanInputField(registerPageSelectors.secondPassField);
    });
  });

  it("Check a login negative cases", () => {
    cy.inputText(registerPageSelectors.emailField,'test@com.com');
    cy.inputText(registerPageSelectors.firstPassField,'1234');
    cy.inputText(registerPageSelectors.secondPassField,'1234');
    negativeTestData.login.forEach((item) => {
      cy.inputText(registerPageSelectors.userField, item)
      cy.verifyIncorrectInput(registerPageSelectors.userField);
      cy.cleanInputField(registerPageSelectors.userField);
    })
  })

  it("Check a email negative cases", () => {
    cy.inputText(registerPageSelectors.userField,'test');
    cy.inputText(registerPageSelectors.firstPassField,'1234');
    cy.inputText(registerPageSelectors.secondPassField,'1234');
    negativeTestData.email.forEach((item) => {
      cy.inputText(registerPageSelectors.emailField, item)
      cy.verifyIncorrectInput(registerPageSelectors.emailField);
      cy.cleanInputField(registerPageSelectors.emailField);
    })
  })

  it("Check the 1st password negative cases", () => {
    cy.inputText(registerPageSelectors.userField,'test');
    cy.inputText(registerPageSelectors.emailField,'test@test.com');
    cy.inputText(registerPageSelectors.secondPassField,'1234');
    negativeTestData.password.forEach((item) => {
      cy.inputText(registerPageSelectors.firstPassField, item);
      cy.verifyIncorrectInput(registerPageSelectors.firstPassField);
      cy.cleanInputField(registerPageSelectors.firstPassField);
    })
  })

  it("Check the 2st password negative cases", () => {
    cy.inputText(registerPageSelectors.userField,'test');
    cy.inputText(registerPageSelectors.emailField,'test@test.com');
    cy.inputText(registerPageSelectors.firstPassField,'1234');
    negativeTestData.password.forEach((item) => {
      cy.inputText(registerPageSelectors.secondPassField, item);
      cy.verifyIncorrectInput(registerPageSelectors.secondPassField);
      cy.cleanInputField(registerPageSelectors.secondPassField);
    })
  })

});