import user from '../fixtures/user.json'
import { faker } from '@faker-js/faker';
import { loginViaUI } from '../support/helper.js';


it('Place order', () => {
    loginViaUI(user);
    cy.visit('/');

    cy.log('Add random product to cart')
    cy.get('.productcart').first().click();
    cy.get('.quick_basket').click()

    cy.log('Open basket')
    cy.get('#cart_checkout1').click();

    cy.log('Verify checkout data')
    cy.get('.table.confirm_shippment_options').click()
        .should('contain', user.firstName)
        .and('contain', user.lastName)
        .and('contain', user.phoneNumber)


    cy.get('.table.confirm_shippment_options').click()
        .should('contain', user.firstName)
        .and('contain', user.lastName)
        .and('contain', user.phoneNumber)

    cy.log('Confirm order')
    cy.get('#checkout_btn').click();

    cy.log('Thank you page displayed')
    cy.get('.maintext').should('contain', 'Your Order Has Been Processed!');
})

it('Place order HW', () => {

    loginViaUI(user);

    cy.log('Add random product to cart from main page')
    cy.visit('/');

    cy.get('input#filter_keyword').type('i{enter}');

    findProductByName('Acqua Di Gio Pour Homme');

    //cy.get('.productcart').first().click();
    //cy.get('.quick_basket').click();

    cy.log('Open basket')
    cy.get('#cart_checkout1').click();

    cy.log('Verify checkout data')
    cy.get('.table.confirm_shippment_options')
        .should('contain', user.firstName)
        .and('contain', user.lastName)
        .and('contain', user.phoneNumber);

    cy.get('.table.confirm_payment_options')
        .should('contain', user.firstName)
        .and('contain', user.lastName)
        .and('contain', user.phoneNumber);

    cy.log('Confirm order')
    cy.get('#checkout_btn').click();

    cy.log('Thank you page displayed')
    cy.get('.maintext').should('contain', 'Your Order Has Been Processed!');
})