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
    cy.get(selector).click().type(`${text}`).blur();
})

Cypress.Commands.add('verifyInput', (selector) => {
    cy.get(selector);
    cy.should('have.class','is-valid form-control');
})

Cypress.Commands.add('cleanInputField', (selector) => {
    cy.get(selector).type('{selectall}{del}');
})

Cypress.Commands.add('verifyIncorrectInput', (selector) => {
    cy.get(selector);
    cy.should('have.class','is-invalid form-control');
})

// Cypress.Commands.add('signinFromMainPage', () => {
//     cy.get(selector);
//     cy.should('have.class','is-invalid form-control');
// })