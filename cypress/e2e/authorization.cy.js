import { faker } from '@faker-js/faker';
import user from '../fixtures/user.json';
import {loginViaUI, login2} from '../support/helper';

it('Login user with valid credentials', () => {
  loginViaUI(user);
})

it('Attempt to login without password', () => {

  login2(user.loginName, '');
  cy.get('.alert.alert-error.alert-danger').should('contain', 'Error: Incorrect login or password provided.')
})

it('Attempt to login without loginname', () => {
  login2('', user.password);
  cy.get('.alert.alert-error.alert-danger').should('contain', 'Error: Incorrect login or password provided.')
})

it('Attempt to login without entered credentials', () => {
  login2('', '');
  cy.get('.alert.alert-error.alert-danger').should('contain', 'Error: Incorrect login or password provided.')
})