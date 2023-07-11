import user from '../fixtures/user.json'

it('Registaration', () => {
  cy.visit('/')

  cy.log('**Opening registration form...**')
  cy.get('#customer_menu_top').click()
  cy.get(" #accountFrm button[title='Continue'].btn.btn-orange.pull-right").click()

  cy.log('**Fill registration form...**')
  cy.get('#AccountFrm_firstname').type(user.firstName);
  cy.get('#AccountFrm_lastname').type(user.lastName)
  cy.get('#AccountFrm_email').type(user.email)
  cy.get('#AccountFrm_telephone').type(user.phoneNumber)
  cy.get('#AccountFrm_fax').type(user.fax)
  cy.get('#AccountFrm_company').type(user.company)
  cy.get('#AccountFrm_address_1').type(user.adress)
  cy.get('#AccountFrm_city').type(user.city)
  cy.get('#AccountFrm_postcode').type(user.zipCode)
  cy.get('#AccountFrm_loginname').type(user.loginName)
  cy.get('#AccountFrm_password').type(user.password)
  cy.get('#AccountFrm_confirm').type(user.password)
  cy.get("#AccountFrm_country_id").select(user.country)
  cy.get("#AccountFrm_zone_id").select(user.region)

  cy.log('**Decline news letter and confirm privacy policy... **')
  cy.get("#AccountFrm_newsletter0").check()
  cy.get("#AccountFrm_agree").check()

  cy.log('**Confirm registration**')
  cy.get('.btn.btn-orange.pull-right.lock-on-click').click()
  cy.get('.maintext').should('be.visible').and('contain', 'Your Account Has Been Created!')

})

it('Login user after registration...', () => {
  cy.visit('/')

  cy.log('**Opening login firm**')
  cy.get('#customer_menu_top').click()

  cy.log('**Submit login firm**')
  cy.get('#loginFrm_loginname').type(user.loginName)
  cy.get('#loginFrm_password').type(user.password)
  cy.get("button[title='Login']").click()

  cy.log('**Verifying "My account" page...**')
  cy.get('span.subtext').should('have.text', user.firstName)



})