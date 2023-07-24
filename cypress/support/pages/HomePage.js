import BasePage from "./BasePage";

class HomePage extends BasePage {
    visit() {
        cy.visit('/');
    }
    getProduct() {
        return cy.get('.productcart');
    }

    getAddToCartQuickButton() {
        return cy.get('.quick_basket');
    }

    getSearchField() {
        return  cy.get('input#filter_keyword')
    }
}
export default new HomePage();