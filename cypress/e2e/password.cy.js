import { faker } from '@faker-js/faker';
import { LoginPage } from "../pages/loginPage";
import { MainPage } from "../pages/mainPage";
import { PasswordPage } from "../pages/passwordPage";

let loginPage = new LoginPage;
let mainPage = new MainPage;
let passwordPage = new PasswordPage;  

let login = 'kosChangePassUser';
let actualPassword = 'DlrRH1X3';
let newPassword = faker.internet.password(8);

describe("Verify change password function", () => {
  beforeEach("Go to main page", () => {
    cy.visit('/');    
  });

  it("User is able to change password", () => {
    cy.intercept('POST', '/api/account/change-password').as('changePasswordRequest');

    mainPage.goToLoginPage();
    loginPage.signin(login, actualPassword);   
    mainPage.itemPassword();
    passwordPage.changePassword(actualPassword,newPassword);
    actualPassword = newPassword;

    cy.wait('@changePasswordRequest').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
    });
  });

  it("User is able to login with a new password", () =>{
    mainPage.goToLoginPage();
    loginPage.signin(login,actualPassword);
    mainPage.itemPassword();
    passwordPage.changePassword(actualPassword,'DlrRH1X3');
  })
  
});