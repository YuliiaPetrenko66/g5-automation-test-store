import BasePage from "./BasePage";

class CheckoutPage extends BasePage {
    visit() {
        cy.visit('/index.php?rt=checkout/cart');
    }
    
    getEstimateShippingTaxesData() {
        return cy.get('#estimate');
    }
    
    getCheckOutButton() {
        return cy.get('#cart_checkout1');
    }
    
    getCheckoutSuccessMessageText() {
        return cy.get('.maintext');
    }
   
}
export default new CheckoutPage();