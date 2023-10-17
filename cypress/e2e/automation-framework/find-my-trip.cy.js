/// <reference types="cypress" />
import findMyTripPage from '../../pages/findMyTripPage'

context('Find my trip Page', () => {
  beforeEach(() => {
    // load vendor-ccv.json fixture file and store
    cy.fixture('vendor-ccv.json').then((vendor) => {
      globalThis.vendor = vendor
    })

    //load the vendor's page
    findMyTripPage.open();
  })

  it('should visit the correct CCV url', () => {
    cy.url().should('eq', vendor.url + '/reservations/retrieve')
  });

  describe('Field validations', () => {

    it('should validate error messages in Find Your Reservation Form', () => {
      findMyTripPage.triggerFormErrorMessages();
      findMyTripPage.getReservationNumberError().should('have.text', 'Enter a reservation number.')
      findMyTripPage.getEmailAddressError().should('have.text', 'Enter an email address.')
    });
  });
})
