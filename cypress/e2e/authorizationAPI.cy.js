import { loginWithApi } from '../support/helperAPI';
import  userApi  from '../fixtures/userApi.json';
import accountLoginPage from '../support/pages/AccountLoginPage';
import accountReturningCustomerSuccessPage from '../support/pages/AccountReturningCustomerSuccessPage.js';


  it('Login user with valid credentials', () => {
    cy.log('Trying to login user...');
    accountLoginPage.visit()
    loginWithApi(userApi);

    accountLoginPage.getLoginButton().click();

    cy.log('**Verifying "My account" page ...**');

    accountReturningCustomerSuccessPage.getSuccessMessageLoginText().should('have.text', userApi.firstName);
      
    });

