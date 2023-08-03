import BasePage from "./BasePage";

class AccountLoginPage extends BasePage {
    visit() {
        cy.visit('/index.php?rt=account/login')
    }

    getRegisterButton() {
        return cy.get('#accountFrm button');
    }

    getLoginName() {
        return cy.get('#loginFrm_loginname');
    }

    getPassword() {
        return cy.get('#loginFrm_password');
    }

    getLoginButton() {
        return cy.get('#loginFrm button');
    }

    getErrorTextMessage(){
        return cy.get('.alert.alert-error.alert-danger');
    }

    getCsrToken(){
        return cy.get('input[name="csrftoken"]')
    } 

    getCsrInstance(){
        return cy.get('input[name="csrfinstance"]')
    }
}
export default new AccountLoginPage();

