import user from '../fixtures/user.json';
import productList from '../fixtures/product.json';
import { faker } from '@faker-js/faker';
import { loginViaUI } from '../support/helper.js';
import { findProductByName, proceedToCheckout } from '../support/searchProductHelper.js';


it('Place order', () => {

    loginViaUI(user);

    cy.log('Product searching');
    cy.visit('/');

    cy.get('input#filter_keyword').type('c{enter}');
    findProductByName(productList, user);
})










