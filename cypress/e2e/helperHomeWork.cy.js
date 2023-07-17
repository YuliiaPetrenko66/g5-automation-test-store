import user from '../fixtures/user.json';
import productList from '../fixtures/product.json';
//import { faker } from '@faker-js/faker';
import { loginViaUI } from '../support/helper.js';
import { findProductByName, proceedToCheckout } from '../support/searchProductHelper.js';

// user.address = faker.location.streetAddress();
//   user.city = faker.location.city();
//   user.company = faker.company.name();
//   user.email = faker.internet.email();
//   user.fax = faker.phone.number();
//   user.firstName = faker.person.firstName();
//   user.lastName = faker.person.lastName();
//   user.loginName = faker.internet.userName();
//   user.password = faker.internet.password({length: 20});
//   user.phoneNumber = faker.phone.number('+380## ### ## ##');
//   user.zipCode = faker.location.zipCode();

//   let username = faker.internet.userName();


it('Place order', () => {

    loginViaUI(user);

    cy.log('Product searching');
    cy.visit('/');

    cy.get('input#filter_keyword').type('c{enter}');
    findProductByName(productList, user);
})










