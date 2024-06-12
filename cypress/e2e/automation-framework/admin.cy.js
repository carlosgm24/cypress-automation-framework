/// <reference types="cypress" />
import adminPage from '../../pages/adminPage'

context('Find my trip Page', () => {
  beforeEach(() => {
    // load site-info.json fixture file and store
    cy.fixture('site-info.json').then((vendor) => {
      globalThis.vendor = vendor
    })

    //load the testing site
    adminPage.open();
  })

  it('should visit the correct admin site url', () => {
    cy.once('uncaught:exception', () => false);
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
