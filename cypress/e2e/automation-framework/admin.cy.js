/// <reference types="cypress" />
import adminPage from '../../pages/adminPage'

context('Admin Page', () => {
  beforeEach(() => {
    // load site-info.json fixture file and store
    cy.fixture('site-info.json').then((vendor) => {
      globalThis.vendor = vendor
    })

    //load the testing site
    adminPage.open();
  })

  it('should visit the correct admin site url and login', () => {
    // adminPage.interceptRequest('POST', '**/auth/validate', 'sendValidation');
    // cy.wait('@sendValidation').its('response.statusCode').should('eq', 403)

    //Login
    adminPage.populateAuthenticate(vendor.admin.login.username, vendor.admin.login.password);
    adminPage.submitLogin();
    cy.url().should('eq', vendor.url + '#/admin')
  });

  // describe('Field validations', () => {

  //   it('should validate error messages in Find Your Reservation Form', () => {
  //     findMyTripPage.triggerFormErrorMessages();
  //     findMyTripPage.getReservationNumberError().should('have.text', 'Enter a reservation number.')
  //     findMyTripPage.getEmailAddressError().should('have.text', 'Enter an email address.')
  //   });
  // });
})
