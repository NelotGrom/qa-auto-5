export class MainPage {
    elements = {
        accounMenu: () => cy.get('[data-cy="accountMenu"]'),
        loginButton: () => cy.get('[data-cy="login"]'),
        logOutButton: () => cy.get('[data-cy="logout"]'),
        passwordButton: () => cy.get('[data-cy="passwordItem"]'),   
    }

    goToLoginPage(){
        this.elements.accounMenu().click();
        this.elements.loginButton().click();
        
    }

    logout(){
        this.elements.accounMenu().click();
        this.elements.logOutButton().click();
        cy.visit('/');
    }

    itemPassword(){
        this.elements.accounMenu().click();
        this.elements.passwordButton().click();    
    }

}