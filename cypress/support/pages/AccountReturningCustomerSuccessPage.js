import BasePage from "./BasePage";

class AccountReturningCustomerSuccessPage extends BasePage {
    visit() {
        cy.visit('/index.php?rt=account/account')
    }

    getSuccessMessageLoginText() {
        return cy.get('.heading1 .subtext');
    }

}
export default new AccountReturningCustomerSuccessPage();
