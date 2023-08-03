import accountLoginPage from '../support/pages/AccountLoginPage';

export function loginWithApi(userApi) {

  cy.log("**Getting the 'csrftoken' and 'csrfinstance' values from the hidden input fields**")
  accountLoginPage.getCsrToken().then((tokenField) => {
    const csrftoken = tokenField.val();

    accountLoginPage.getCsrInstance().then((instanceField) => {
      const csrfinstance = instanceField.val();

      cy.log("**Submit login form ...**")
      cy.request({
        method: 'POST',
        url: 'https://automationteststore.com/index.php?rt=account/login',
        form: true,
        body: {
          csrftoken: csrftoken,
          csrfinstance: csrfinstance,
          loginname: userApi.loginname,
          password: userApi.password
        }
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');
        expect(response.headers['set-cookie'][0]).to.match(/HTTP_IS_RETINA/)
      });
    });
  });
}

