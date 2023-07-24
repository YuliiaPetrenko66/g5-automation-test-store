import user from '../fixtures/user.json';
import productList from '../fixtures/product.json';
//import { faker } from '@faker-js/faker';
import { loginViaUI } from '../support/helper.js';
import { findProductByName} from '../support/searchProductHelper.js';
import accountLoginPage from '../support/pages/AccountLoginPage';
import homePage from '../support/pages/HomePage';

it('Place order', () => {

    accountLoginPage.visit()

    cy.log('**Submit login form ...**');

    accountLoginPage.getLoginName().type(user.loginName);
    accountLoginPage.getPassword().type(user.password);
    accountLoginPage.getLoginButton().click();

    cy.log('Product searching');
    
    homePage.visit();
    homePage.getSearchField().type('c{enter}');
    findProductByName(productList, user);
})






