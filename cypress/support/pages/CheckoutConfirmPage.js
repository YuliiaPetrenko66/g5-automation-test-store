import BasePage from "./BasePage";

class CheckoutConfirmPage extends BasePage {
    visit() {
        cy.visit('/index.php?rt=checkout/confirm');
    }
    
    getCheckOutData() {
        return cy.get('.table.confirm_shippment_options');
    }

    getCheckOutData1() {
        return cy.get('.table.confirm_payment_options')
    }

    getCheckOutButton() {
        return cy.get('#checkout_btn');
    }


}
export default new CheckoutConfirmPage();