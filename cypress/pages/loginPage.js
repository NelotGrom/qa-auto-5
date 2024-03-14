export class LoginPage {
    elements = {
        usernameField: () => cy.get('[data-cy="username"]'),
        passwordField: () => cy.get('[data-cy="password"]'),
        signinButton: () => cy.get('[data-cy="submit"]'),
    }

    signin(username, password) {
        this.elements.usernameField().type(username);
        this.elements.passwordField().type(password);
        this.elements.signinButton().click();
    }
}