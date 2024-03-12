// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('checkText', (selector, text) => {
    cy.get(selector).should("have.text", `${text}`);
})

Cypress.Commands.add('langChangeCheck', (langName, homeName, entityName, profileName) => { 
    cy.checkText(":nth-child(4) > .d-flex > span",`${langName}`);
    cy.checkText("#header-tabs > li:nth-child(1) > a > span > span",`${homeName}`);
    cy.checkText('[data-cy="entity"] > .d-flex',`${entityName}`);
    cy.checkText(":nth-child(5) > .d-flex > span",`${profileName}`);
})

Cypress.Commands.add('inputText', (selector, text) => {
    cy.get(selector).click().type(`${text}{enter}`);
})

Cypress.Commands.add('verifyInput', (selector) => {
    cy.get(selector);
    cy.should('have.class','is-touched is-dirty is-valid form-control');
})


Cypress.Commands.add('cleanInputField', (selector) => {
    cy.get(selector).type('{selectall}{del}');
})

