const testData = require("../fixtures/positiveCasesData.json");
const negativeTestData = require("../fixtures/negativeCasesData.json");

const userField = '[data-cy="username"]';
const emailField = "#email";
const firstPassField = '[data-cy="firstPassword"]';
const secondPassField = '[data-cy="secondPassword"]';
const submitButton = '[data-cy="submit"]';

describe("Verify registration inputs", () => {
  beforeEach("Go to register modal", () => {
    cy.visit("/");
    cy.get("#account-menu > a > span").click();
    cy.get('[data-cy="register"]').click();
  });

  it("Check a valid formats registrations", () => {
    testData.forEach((item) => {
      cy.inputText(userField, item.login);
      cy.verifyInput(userField);
      cy.inputText(emailField, item.email);
      cy.verifyInput(emailField);
      cy.inputText(firstPassField, item.password);
      cy.verifyInput(firstPassField);
      cy.inputText(secondPassField, item.password)
      cy.get('.alert').click();      
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
      cy.verifyInput(userField);
    })

  })

  // it("Check a email negative cases", ()=>
  // {
    
  // })

  // it("Check a password negative cases", ()=>
  // {
    
  // })
});
