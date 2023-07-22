import user from '../fixtures/user.json'
import homePage from '../support/pages/HomePage';
import accountLoginPage from '../support/pages/AccountLoginPage';
import forgotCredentialsPage from '../support/pages/ForgotCredentialsPage';
import accountReturningCustomerSuccessPage from '../support/pages/AccountReturningCustomerSuccessPage.js';

beforeEach(function () {
    homePage.visit();
    //cy.visit('/')
});

describe('Positive Test Suit for "ACCOUNT LOGIN" form', function () {

    it('Test Case 1: Successfull login with valid credentials for Login form', function () {
        cy.log('**Opening Login form**');
        homePage.getLoginOrRegisterButton().click();

        cy.log('**Submit Login form**');
        accountLoginPage.visit()

        accountLoginPage.getLoginName().type(user.loginName);
        accountLoginPage.getPassword().type(user.password);
        accountLoginPage.getLoginButton().click();

        cy.log('**Verifying "My account" page...**');
        accountReturningCustomerSuccessPage.getSuccessMessageLoginText().should('have.text', user.firstName);

    });


    it('Test Case 2: "Forgot your password?" link verifying ', function () {

        cy.log('**Opening Login form**');
        homePage.getLoginOrRegisterButton().click();

        cy.log('**"Forgot your password?" link clicking**');

        accountLoginPage.getForgotPasswordButton()
            .first()
            .click()
            .should('have.text', "Forgot your password?");

        cy.log('**"Forgot your password?" form verifying**');

        forgotCredentialsPage.getForgotPasswordLoginMessageText()
            .should('be.visible')
            .and('contain', " Forgot Your Password?");

        forgotCredentialsPage.getLoginNameField().type(user.loginName);
        forgotCredentialsPage.getPasswordField().type(user.email);

        cy.log('**Submit "Forgot your password?" form**');

        forgotCredentialsPage.getContinueButton().click();

        cy.log('**Success message verifying**');

        accountLoginPage.getSuccessPasswordLoginResetLinkTextMessage()
            .should('be.visible')
            .and('contain', "Success: Password reset link has been sent to your e-mail address.");
    });

    it('Test Case 3: "Forgot your login?" link verifying ', function () {
        cy.log('**Opening login form**');
        homePage.getLoginOrRegisterButton().click();

        cy.log('**"Forgot your login?" link clicking**');
        accountLoginPage.getForgotLoginButton()
            .last()
            .click()
            .should('have.text', "Forgot your login?");

        cy.log('**"Forgot your login?" form verifying**');
        forgotCredentialsPage.getForgotPasswordLoginMessageText()
            .should('be.visible')
            .and('contain', "Forgot Your Login Name?");

        forgotCredentialsPage.getLastNameField().type(user.lastName);
        forgotCredentialsPage.getPasswordField().type(user.email);

        cy.log('**Submit "Forgot your password?" form**');
        forgotCredentialsPage.getContinueButton().click();

        cy.log('**Success message verifying**');
        accountLoginPage.getSuccessPasswordLoginResetLinkTextMessage()
            .should('be.visible')
            .and('contain', "Success: Your login name reminder has been sent to your e-mail address.");
    });

    it('Test Case 4: Password field is hidden (e.g., with asterisks)', function () {
        cy.log('**Opening login form**');
        homePage.getLoginOrRegisterButton().click();

        cy.log('**Submit login form/nodeName:"INPUT" verifying**');

        accountLoginPage.visit()

        accountLoginPage.getLoginName().type(user.loginName);
        accountLoginPage.getPassword().type(user.password);
        accountLoginPage.getPassword()
            .should('have.prop', 'nodeName', 'INPUT')
            .and('have.attr', 'type', 'password')

        accountLoginPage.getLoginButton().click();

        cy.log('**Verifying "My account" page...**');
        accountReturningCustomerSuccessPage.getSuccessMessageLoginText().should('have.text', user.firstName);
    })

    it('Test Case 5: Login with valid credentials and spacers before LoginName', function () {
        //This TestCase is failed. Spacers are not truncated. 
        ///I don't have the requirements so I cann't proof that it's a defect
        cy.log('**Opening login form**');
        homePage.getLoginOrRegisterButton().click();

        cy.log('**Submit login form with spacers before loginName**');
        accountLoginPage.visit()

        accountLoginPage.getLoginName().type(user.loginNameTrim);
        accountLoginPage.getPassword().type(user.password);
        accountLoginPage.getLoginButton().click();


        cy.log('**Verifying "My account" page...**');
        accountReturningCustomerSuccessPage.getSuccessMessageLoginText().should('have.text', user.firstName);
    })

    it('Test Case 6: Submit Login form using Enter key', function () {
        cy.log('**Opening login form**');
        homePage.getLoginOrRegisterButton().click();

        cy.log('**Submit login form using Enter key **');
        accountLoginPage.getLoginName().type(user.loginName);
        accountLoginPage.getPassword().type(user.password).type('{enter}');

        cy.log('**Verifying "My account" page...**');
        accountReturningCustomerSuccessPage.getSuccessMessageLoginText().should('have.text', user.firstName);
    });

    it('Test Case 7: Navigating through the Login form elements using keyboard', function () {

        cy.log('**Opening login form**');
        homePage.getLoginOrRegisterButton().click();

        cy.log('**Navigating through the Login form fields using Tab key **')
        accountLoginPage.getLoginName()
            .type(user.loginName)
            .focus()
            .tab()
        cy.focused().should('not.have.attr', 'id', 'loginFrm_loginname');

        accountLoginPage.getPassword()
            .type(user.password)
            .focus()
            .tab()
        cy.focused().should('not.have.attr', 'id', 'loginFrm_password');

        cy.log('**"Forgot your password?" link navigating**');
        accountLoginPage.getForgotPasswordButton()
            .first()
            .should('have.text', "Forgot your password?")
            .focus()
            .tab()
            .should('not.have.attr', 'class', 'col-sm-6 returncustomer');
        cy.focused().should('not.have.attr', 'class', 'col-sm-6 returncustomer');

        cy.log('**"Forgot your login?" link navigating**');
        accountLoginPage.getForgotLoginButton()
            .last()
            .and('have.text', "Forgot your login?")
            .focus()
            .tab()
            .should('not.have.attr', 'class', 'col-sm-6.returncustomer');

        cy.log('**Submit login form using Enter key **');
        accountLoginPage.getLoginButton()
            .should('be.focused')
            .type('{enter}')

        cy.log('**Verifying "My account" page...**');
        accountReturningCustomerSuccessPage.getSuccessMessageLoginText().should('have.text', user.firstName);
    });
})

describe('Negative Test Suit for "ACCOUNT LOGIN" form', function () {

    it('Test Case 1: Validation error for Login/Password empty fields ', function () {

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

    it('Test Case 2: Validation error  for Login  empty field', function () {


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


    it('Test Case 3: Validation error for Password empty field', function () {
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

    it('Test Case 4: Validation error for incorrect Password  field', function () {

        cy.log('**Opening Login form**');
        homePage.getLoginOrRegisterButton().click();

        cy.log('**Submit Login form**');
        accountLoginPage.visit()

        accountLoginPage.getLoginName().type("Anna");
        accountLoginPage.getPassword().type(user.password);
        accountLoginPage.getLoginButton().click();

        cy.log('**Error message verifying**');
        accountLoginPage.getErrorTextMessage().should('contain', '\n×\nError: Incorrect login or password provided.');

    })

    it('Test Case 5: Validation error for incorrect Login field', function () {

        cy.log('**Opening Login form**');
        homePage.getLoginOrRegisterButton().click();

        cy.log('**Submit Login form**');
        accountLoginPage.visit()

        accountLoginPage.getLoginName().type(user.loginName);
        accountLoginPage.getPassword().type('incorrectPassword');
        accountLoginPage.getLoginButton().click();

        cy.log('**Error message verifying**');
        accountLoginPage.getErrorTextMessage().should('contain', '\n×\nError: Incorrect login or password provided.');

    })

})