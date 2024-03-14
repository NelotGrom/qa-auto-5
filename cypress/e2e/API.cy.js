import { faker } from '@faker-js/faker';

// const testData = require("../fixtures/positiveCasesData.json");
// const negativeTestData = require("../fixtures/negativeСasesData.json");

// const userField = '[data-cy="username"]';
// const emailField = "#email";
// const firstPassField = '[data-cy="firstPassword"]';
// const secondPassField = '[data-cy="secondPassword"]';
// const submitButton = '[data-cy="submit"]';

describe("API tests for register, login and tasks operations", () => {
  beforeEach("Go BLA BLA BLA", () => {
  });

  it("Check a registation endpoint with POST method", () => {
    cy.request({
      method: 'POST',
      url: '/API/register',
      form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
      body: {
        "login": faker.internet.userName,
        "password": "12345",
        "langKey": "en",
        "email": faker.internet.email,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
    })
  })
});

  // it("Check a login negative cases", () => {
  //   cy.inputText(emailField,'test@com.com');
  //   cy.inputText(firstPassField,'1234');
  //   cy.inputText(secondPassField,'1234');
  //   negativeTestData.login.forEach((item) => {
  //     cy.inputText(userField, item)
  //     cy.verifyIncorrectInput(userField);
  //     cy.cleanInputField(userField);
  //   })
  // })

  // it("Check a email negative cases", () => {
  //   cy.inputText(userField,'test');
  //   cy.inputText(firstPassField,'1234');
  //   cy.inputText(secondPassField,'1234');
  //   negativeTestData.email.forEach((item) => {
  //     cy.inputText(emailField, item)
  //     cy.verifyIncorrectInput(emailField);
  //     cy.cleanInputField(emailField);
  //   })
  // })

  // it("Check the 1st password negative cases", () => {
  //   cy.inputText(userField,'test');
  //   cy.inputText(emailField,'test@test.com');
  //   cy.inputText(secondPassField,'1234');
  //   negativeTestData.password.forEach((item) => {
  //     cy.inputText(firstPassField, item);
  //     cy.verifyIncorrectInput(firstPassField);
  //     cy.cleanInputField(firstPassField);
  //   })
  // })

  // it("Check the 2st password negative cases", () => {
  //   cy.inputText(userField,'test');
  //   cy.inputText(emailField,'test@test.com');
  //   cy.inputText(firstPassField,'1234');
  //   negativeTestData.password.forEach((item) => {
  //     cy.inputText(secondPassField, item);
  //     cy.verifyIncorrectInput(secondPassField);
  //     cy.cleanInputField(secondPassField);
  //   })
  // })