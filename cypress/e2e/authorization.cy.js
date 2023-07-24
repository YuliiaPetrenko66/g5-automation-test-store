import { faker } from '@faker-js/faker';
import user from '../fixtures/user.json';
import {loginViaUI, login2} from '../support/helper';
import accountLoginPage from '../support/pages/AccountLoginPage';
import accountReturningCustomerSuccessPage from '../support/pages/AccountReturningCustomerSuccessPage.js';

it('Login user with valid credentials', () => {
  accountLoginPage.visit()

  cy.log('**Submit login form ...**');

  accountLoginPage.getLoginName().type(user.loginName);
  accountLoginPage.getPassword().type(user.password);
  accountLoginPage.getLoginButton().click();

  cy.log('**Verifying "My account" page ...**');

  accountReturningCustomerSuccessPage.getSuccessMessageLoginText().should('have.text', user.firstName);

})

it('Attempt to login without password', () => {
  let userWithoutPassword = JSON.parse(JSON.stringify(user));

  cy.log('Update user data');

  userWithoutPassword.password = " ";

  accountLoginPage.visit()

  cy.log('**Submit login form without password**');

  accountLoginPage.getLoginName().type(user.loginName);
  accountLoginPage.getPassword().type(userWithoutPassword.password);
  accountLoginPage.getLoginButton().click();

  cy.log('**Verifying "My account" page ...**');
  accountLoginPage.getErrorTextMessage().should('contain', '\n×\nError: Incorrect login or password provided.');
  
})

it('Attempt to login without loginname', () => {
  let userWithoutLoginName = JSON.parse(JSON.stringify(user));

  cy.log('Update user data');
  userWithoutLoginName.loginName = " ";
  
  accountLoginPage.visit()

  cy.log('**Submit login form without loginName**');
  accountLoginPage.getLoginName().type(userWithoutLoginName.loginName);
  accountLoginPage.getPassword().type(user.password);
  accountLoginPage.getLoginButton().click();

  cy.log('**Verifying "My account" page ...**');
  accountLoginPage.getErrorTextMessage().should('contain', 'Error: Incorrect login or password provided.');
})

it('Attempt to login without entered credentials', () => {
  let userWithoutPassword = JSON.parse(JSON.stringify(user));
  let userWithoutLoginName = JSON.parse(JSON.stringify(user));

  cy.log('Update user data');
  userWithoutLoginName.loginName = " ";
  userWithoutPassword.password = " ";
  
  accountLoginPage.visit()

  cy.log('**Submit login form without loginName**');
  accountLoginPage.getLoginName().type(userWithoutLoginName.loginName);
  accountLoginPage.getPassword().type(userWithoutPassword.password);
  accountLoginPage.getLoginButton().click();

  cy.log('**Verifying "My account" page ...**');
  accountLoginPage.getErrorTextMessage().should('contain', 'Error: Incorrect login or password provided.');

})