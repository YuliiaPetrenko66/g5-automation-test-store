import user from '../fixtures/user.json'

beforeEach(function () {
    cy.visit('/')
});

describe('Positive Test Suit for "ACCOUNT LOGIN" form', function () {

    it('Test Case 1: Successfull login with valid credentials for Login form', function () {
        cy.log('**Opening Login form**');
        cy.get('#customer_menu_top').click();

        cy.log('**Submit Login form**');
        cy.get('#loginFrm_loginname').type(user.loginName);
        cy.get('#loginFrm_password').type(user.password);
        cy.get("button[title='Login']").click();

        cy.log('**Verifying "My account" page...**');
        cy.get('span.subtext').should('have.text', user.firstName);
    });


    it('Test Case 2: "Forgot your password?" link verifying ', function () {
        cy.log('**Opening login form**');
        cy.get('#customer_menu_top').click();

        cy.log('**"Forgot your password?" link clicking**');
        cy.get(".col-sm-6.returncustomer a")
            .first()
            .click()
            .should('have.text', "Forgot your password?");

        cy.log('**"Forgot your password?" form verifying**');
        cy.get('span.maintext')
            .should('be.visible')
            .and('contain', " Forgot Your Password?");
        cy.get('#forgottenFrm_loginname').type(user.loginName);
        cy.get('#forgottenFrm_email').type(user.email);

        cy.log('**Submit "Forgot your password?" form**');
        cy.get("button[title='Continue']").click();

        cy.log('**Success message verifying**');
        cy.get(".alert.alert-success")
            .should('be.visible')
            .and('contain', "Success: Password reset link has been sent to your e-mail address.");
    });

    it('Test Case 3: "Forgot your login?" link verifying ', function () {
        cy.log('**Opening login form**');
        cy.get('#customer_menu_top').click();

        cy.log('**"Forgot your login?" link clicking**');
        cy.get(".col-sm-6.returncustomer a")
            .last()
            .click()
            .should('have.text', "Forgot your login?");

        cy.log('**"Forgot your login?" form verifying**');
        cy.get('span.maintext')
            .should('be.visible')
            .and('contain', "Forgot Your Login Name?");

        cy.get('#forgottenFrm_lastname').type(user.lastName);
        cy.get('#forgottenFrm_email').type(user.email);

        cy.log('**Submit "Forgot your password?" form**');
        cy.get("button[title='Continue']").click();

        cy.log('**Success message verifying**');
        cy.get(".alert.alert-success")
            .should('be.visible')
            .and('contain', "Success: Your login name reminder has been sent to your e-mail address.");
    });

    it('Test Case 4: Password field is hidden (e.g., with asterisks)', function () {
        cy.log('**Opening login form**');
        cy.get('#customer_menu_top').click();

        cy.log('**Submit login form/nodeName:"INPUT" verifying**');
        cy.get('#loginFrm_loginname').type(user.loginName);
        cy.get('#loginFrm_password').type(user.password);
        cy.get('#loginFrm_password')
            .should('have.prop', 'nodeName', 'INPUT')
            .and('have.attr', 'type', 'password')
        cy.get("button[title='Login']").click();

        cy.log('**Verifying "My account" page...**');
        cy.get('span.subtext').should('have.text', user.firstName);
    })

    it('Test Case 5: Login with valid credentials and spacers before LoginName', function () {
        //This TestCase is failed. Spacers are not truncated. 
        ///I don't have the requirements so I cann't proof that it's a defect
        cy.log('**Opening login form**');
        cy.get('#customer_menu_top').click();

        cy.log('**Submit login form with spacers before loginName**');
        cy.get('#loginFrm_loginname').type(user.loginNameTrim);
        cy.get('#loginFrm_password').type(user.password);
        cy.get("button[title='Login']").click();

        cy.log('**Verifying "My account" page...**');
        cy.get('span.subtext').should('have.text', user.firstName);
    })

    it('Test Case 6: Submit Login form using Enter key', function () {
        cy.log('**Opening login form**');
        cy.get('#customer_menu_top').click();

        cy.log('**Submit login form using Enter key **');
        cy.get('#loginFrm_loginname').type(user.loginName);
        cy.get('#loginFrm_password').type(user.password).type('{enter}');

        cy.log('**Verifying "My account" page...**');
        cy.get('span.subtext').should('have.text', user.firstName)
    });;

    it('Test Case 7: Navigating through the Login form elements using keyboard', function () {

        cy.log('**Opening login form**');
        cy.get('#customer_menu_top').click();

        cy.log('**Navigating through the Login form fields using Tab key **')
        cy.get('#loginFrm_loginname')
            .type(user.loginName)
            .focus()
            .tab()
        cy.focused().should('not.have.attr', 'id', 'loginFrm_loginname');

        cy.get('#loginFrm_password')
            .type(user.password)
            .focus()
            .tab()
        cy.focused().should('not.have.attr', 'id', 'loginFrm_password');

        cy.log('**"Forgot your password?" link navigating**');
        cy.get(".col-sm-6.returncustomer a")
            .first()
            .should('have.text', "Forgot your password?")
            .focus()
            .tab()
            .should('not.have.attr', 'class', 'col-sm-6 returncustomer');
        cy.focused().should('not.have.attr', 'class', 'col-sm-6 returncustomer');

        cy.log('**"Forgot your login?" link navigating**');
        cy.get(".col-sm-6.returncustomer a")
            .last()
            .and('have.text', "Forgot your login?")
            .focus()
            .tab()
            .should('not.have.attr', 'class', 'col-sm-6.returncustomer');

        cy.log('**Submit login form using Enter key **');
        cy.get("button[title='Login']")
            .should('be.focused')
            .type('{enter}')

        cy.log('**Verifying "My account" page...**');
        cy.get('span.subtext').should('have.text', user.firstName);
    });
})

describe('Negative Test Suit for "ACCOUNT LOGIN" form', function () {

    it('Test Case 1: Validation error for Login/Password empty fields ', function () {
        cy.log('**Opening login form**');
        cy.get('#customer_menu_top').click();

        cy.log('**Submit empty login form**');
        cy.get("button[title='Login']").click();

        cy.log('**Error message verifying**');
        cy.get('.alert.alert-error.alert-danger')
            .should('be.visible')
            .and('contain', "Error: Incorrect login or password provided.");
    })

    it('Test Case 2: Validation error  for Login  empty field', function () {
        cy.log('**Opening login form**');
        cy.get('#customer_menu_top').click();

        cy.log('**Submit login form with Login  empty field**');
        cy.get('#loginFrm_password').type(user.password);
        cy.get("button[title='Login']").click();

        cy.log('**Error message verifying**');
        cy.get('.alert.alert-error.alert-danger')
            .should('be.visible')
            .and('contain', "Error: Incorrect login or password provided.");
    })

    it('Test Case 3: Validation error for Password empty field', function () {
        cy.log('**Opening login form**');
        cy.get('#customer_menu_top').click();

        cy.log('**Submit login form with Password empty field**');
        cy.get('#loginFrm_loginname').type(user.loginName);
        cy.get("button[title='Login']").click();

        cy.log('**Error message verifying**');
        cy.get('.alert.alert-error.alert-danger')
            .should('be.visible')
            .and('contain', "Error: Incorrect login or password provided.");
    })

    it('Test Case 4: Validation error for incorrect Password  field', function () {
        cy.log('**Opening login form**');
        cy.get('#customer_menu_top').click();

        cy.log('**Submit login form with incorrect Password  field**');
        cy.get('#loginFrm_loginname').type(user.loginName);
        cy.get('#loginFrm_password').type('Anna');
        cy.get("button[title='Login']").click();

        cy.log('**Error message verifying**');
        cy.get('.alert.alert-error.alert-danger')
            .should('be.visible')
            .and('contain', "Error: Incorrect login or password provided.");
    })

    it('Test Case 5: Validation error for incorrect Login field', function () {
        cy.log('**Opening login form**');
        cy.get('#customer_menu_top').click();

        cy.log('**Submit login form with incorrect Login field**');
        cy.get('#loginFrm_loginname').type(user.loginName);
        cy.get('#loginFrm_password').type('incorrectPassword');
        cy.get("button[title='Login']").click();

        cy.log('**Error message verifying**');
        cy.get('.alert.alert-error.alert-danger')
            .should('be.visible')
            .and('contain', "Error: Incorrect login or password provided.");
    })
})