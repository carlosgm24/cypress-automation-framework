/// <reference types="cypress" />

context('Home Page', () => {
  beforeEach(() => {
    // load vendor-ccv.json fixture file and store
    cy.fixture('vendor-ccv.json').then((vendor) => {
      globalThis.vendor = vendor
    })

    //load the vendor's page
    cy.visit('https://booking.cheapcaribbean.com/reservations/retrieve')
  })

  it('should visit the correct CCV url', () => {
    cy.url().should('eq', vendor.url + '/reservations/retrieve')
  });

  describe('Field validations', () => {

    //Max chars: 24, Min chars: 1, Only letters and numbers
    it('should validate error messages in Reservation Number', () => {
      cy.get('[data-e2e="reservationNumber"]').clear().tab()
      cy.get('#mat-error-1').should('have.text', 'Enter a reservation number.')
    });

    it('should validate error messages in Email Address', () => {
      cy.get('[data-e2e="emailAddress"]').clear().tab()
      cy.get('#mat-error-2').should('have.text', 'Enter an email address.')
    });
    
  });
})
