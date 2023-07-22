import BasePage from "./BasePage";

class AccountCreatePage extends BasePage {
    visit() {
        cy.visit('/index.php?rt=account/create')
    }

    getFirstNameField() {
        return cy.get('#AccountFrm_firstname');
    }

    getLastNameField() {
        return cy.get('#AccountFrm_lastname');
    }

    getEmailField() {
        return cy.get('#AccountFrm_email');
    }

    getPhoneField() {
        return cy.get('#AccountFrm_telephone');
    }

    getFaxField() {
        return cy.get('#AccountFrm_fax');
    }

    getCompanyField() {
        return cy.get('#AccountFrm_company');
    }

    getFirstAddressField() {
        return cy.get('#AccountFrm_address_1');
    }

    getCityField() {
        return cy.get('#AccountFrm_city');
    }

    getPostCodeField() {
        return cy.get('#AccountFrm_postcode');
    }

    getCountryIdField() {
        return cy.get('#AccountFrm_country_id');
    }

    getZoneIdField() {
        return cy.get('#AccountFrm_zone_id');
    }

    getLoginNameField() {
        return cy.get('#AccountFrm_loginname');
    }

    getPasswordField() {
        return cy.get('#AccountFrm_password');
    }

    getPasswordConfirmField() {
        return cy.get('#AccountFrm_confirm');
    }

    getNewsLetterDeclineRadioButton() {
        return cy.get('#AccountFrm_newsletter0');
    }

    getPrivacyPolicyCheckBox() {
        return cy.get('#AccountFrm_agree');
    }

    getSubmitRegistrationFormButton() {
        return cy.get('.form-group [type="submit"]');
    }

    getErrorMessageText() {
        return cy.get('.alert.alert-error.alert-danger');
    }

    fillInRegistrationForm(user) {
        cy.log('**Fill in registration form ...**');
        this.getFirstNameField().type(user.firstName);
        this.getLastNameField().type(user.lastName);
        this.getEmailField().type(user.email);
        this.getPhoneField().type(user.phoneNumber);
        this.getFaxField().type(user.fax);
        this.getCompanyField().type(user.company);
        this.getFirstAddressField().type(user.address);
        this.getCityField().type(user.city);
        this.getPostCodeField().type(user.zipCode);
        this.getCountryIdField().select(user.country);
        this.getZoneIdField().select(user.region);
        this.getLoginNameField().type(user.loginName);
        this.getPasswordField().type(user.password);
        this.getPasswordConfirmField().type(user.password);

        cy.log('**Decline news letter and confirm privacy policy ...**');
        this.getNewsLetterDeclineRadioButton().check();
        this.getPrivacyPolicyCheckBox().check();

        cy.log('**Confirm registration ...**');
        this.getSubmitRegistrationFormButton().click();
    }
}
export default new AccountCreatePage();