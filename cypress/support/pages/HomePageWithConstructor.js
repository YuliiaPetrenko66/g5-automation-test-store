import BasePage from "./BasePage";

class HomePageWithConstructor extends BasePage {
    constructor() {
        this.elements = {};
        this.elements.loginOrRegisterButton = '#customer_menu_top';
    }

    visit() {
        cy.visit('/')
    }

    getLoginOrRegisterButton() {
        return cy.get(this.elements.loginOrRegisterButton);
    }
}
export default new HomePageWithConstructor();