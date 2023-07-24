export default class BasePage {

    getLoginOrRegisterButton() {
        cy.log('**Opening account login page...**');
        return cy.get('#customer_menu_top');
    }
}