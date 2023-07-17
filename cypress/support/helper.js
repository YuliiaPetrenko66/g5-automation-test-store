export function loginViaUI(user) {
    cy.visit('/index.php?rt=account/login');

    cy.log('**Submit login form **');
    cy.get('#loginFrm_loginname').type(user.loginName);
    cy.get('#loginFrm_password').type(user.password);
    cy.get('#loginFrm button').click();
}

export function login2(loginName, password) {
    cy.visit('/index.php?rt=account/login');

    cy.log('**Submit login form **');
    loginName ? cy.get('#loginFrm_loginname').type(loginName) : cy.log('User login name is empty, skip entering login name')
    password ? cy.get('#loginFrm_password').type(password) : cy.log('User password is empty, skip entering password')
    cy.get('#loginFrm button').click();
}


  
  
  
  
  
  
  