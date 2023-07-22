import BasePage from "./BasePage";

class CheckOutSuccessPage extends BasePage {
    visit() {
        cy.visit('/index.php?rt=checkout/success')
    }

    getCheckoutSuccessMessageText() {
        return cy.get('.maintext');
    }
}
export default new CheckOutSuccessPage();
