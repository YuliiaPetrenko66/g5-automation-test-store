import BasePage from "./BasePage";

class ForgotPasswordPage extends BasePage {
    visit() {
        cy.visit('/index.php?rt=account/forgotten/password')
    }

    getForgotPasswordLoginMessageText() {
        return cy.get('span.maintext');
    }
   
    getLastNameField() {
        return cy.get('#forgottenFrm_lastname');
    }

    getLoginNameField() {
        return cy.get('#forgottenFrm_loginname');
    }

    getPasswordField() {
        return cy.get('#forgottenFrm_email');
    }

    getContinueButton() {
        return cy.get("button[title='Continue'");
    }
}
export default new ForgotPasswordPage();