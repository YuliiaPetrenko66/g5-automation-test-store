import user from '../fixtures/user.json'
import { faker } from '@faker-js/faker';
import { loginViaUI } from '../support/helper.js';
import accountLoginPage from '../support/pages/AccountLoginPage';
import checkOutSuccessPage from '../support/pages/CheckoutSuccessPage';
import homePage from '../support/pages/HomePage';
import productPage from '../support/pages/ProductPage';
import checkoutPage from '../support/pages/CheckoutPage';
import checkoutConfirmPage from '../support/pages/CheckoutConfirmPage';
import { findProductByName1 } from '../support/searchProductHelper.js';

it.only('Place order', () => {

    accountLoginPage.visit()

    cy.log('**Submit login form ...**');

    accountLoginPage.getLoginName().type(user.loginName);
    accountLoginPage.getPassword().type(user.password);
    accountLoginPage.getLoginButton().click();

    cy.log('Add random product to cart')

    homePage.visit();
    homePage.getProduct().first().click();

    homePage.getAddToCartQuickButton().click();

    cy.log('Open basket')

    productPage.visit(50);

    productPage.getAddToCartButton().click();

    cy.log('Verify Estimate Shipping & Taxes')

    checkoutPage.visit()
    checkoutPage.getEstimateShippingTaxesData().click()
        .should('contain', user.country)
        .and('contain', user.city)

    cy.log('Confirm order')

    checkoutPage.getCheckOutButton().click();

    cy.log('Verify checkout data')

    checkoutConfirmPage.visit()
    checkoutConfirmPage.getCheckOutData().click()
        .should('contain', user.firstName)
        .and('contain', user.lastName)
    checkoutConfirmPage.getCheckOutButton().click();

    cy.log('Thank you page displayed')

    checkOutSuccessPage.visit()
    checkOutSuccessPage.getCheckoutSuccessMessageText().should('have.text', ' Your Order Has Been Processed!');

})


it('Place order HW', () => {

    accountLoginPage.visit();
    accountLoginPage.getLoginName().type(user.loginName);
    accountLoginPage.getPassword().type(user.password);
    accountLoginPage.getLoginButton().click();

    cy.log('Add random product to cart from main page')

    //homePage.visit();
    homePage.getSearchField().type('i{enter}');


    findProductByName1('Acqua Di Gio Pour Homme');

    cy.log('Open basket')

    productPage.getAddToCartButton().click();
    checkoutPage.getCheckOutButton().click();

    cy.log('Verify checkout data')

    checkoutConfirmPage.getCheckOutData().click()
        .should('contain', user.firstName)
        .and('contain', user.lastName)
        .and('contain', user.phoneNumber);

    checkoutConfirmPage.getCheckOutData1().click()
        .should('contain', user.firstName)
        .and('contain', user.lastName)
        .and('contain', user.phoneNumber);

    cy.log('Confirm order')

    checkoutConfirmPage.getCheckOutButton().click();

    cy.log('Thank you page displayed')

    checkOutSuccessPage.getCheckoutSuccessMessageText().should('have.text', ' Your Order Has Been Processed!');
})