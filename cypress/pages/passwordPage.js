export class PasswordPage {
    elements = {
        currentPasswordField: () => cy.get('#currentPassword'),
        newPasswordField: () => cy.get('#newPassword'),
        repeatPasswordField: () => cy.get('#confirmPassword'),
        saveButoon: () => cy.get('[data-cy="submit"]'),
    }

    changePassword(password, newPassword) {
        this.elements.currentPasswordField().type(password);
        this.elements.newPasswordField().type(newPassword);
        this.elements.repeatPasswordField().type(newPassword);
        this.elements.saveButoon().click();
    }
}