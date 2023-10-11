/// <reference types="cypress" />

context('Home Page', () => {
  beforeEach(() => {
    // load vendor-ccv.json fixture file and store
    cy.fixture('vendor-ccv.json').then((vendor) => {
      globalThis.vendor = vendor
    })

    //load the vendor's page
    cy.visit('https://booking.cheapcaribbean.com/search')
  })

  it('should visit the correct CCV url', () => {
    cy.get('syn-restool form', {timeout: 5000}).should('be.visible')

    cy.url().should('eq', vendor.url + '/search')
  });

  it('should make a successful search', () => {
    // Intercepts the Packages request
    cy.intercept('GET', '**/api/v1/Packages?*').as('getPackages')
    cy.wait('@getPackages').its('response.statusCode').should('eq', 200)
    //'Leaving from' input
    cy.get('#mat-input-2').clear().type(vendor.origin).tab()
    //'Going to' input
    cy.get('#mat-input-1').clear().type(vendor.destination).tab()
    //Travel Dates input
    cy.get('#mat-date-range-input-0').click()
    // advance 4 months
    for (let i = 0; i < 4; i++) {
      cy.get('button.mat-calendar-next-button').click()
    }
    cy.get('mat-month-view').contains('1').click()
    cy.get('mat-month-view').contains('8').click()
    //Rooms and Travelers input
    cy.get('syn-restool-room-passenger-info [data-e2e="editPassengers"]').click()
    cy.get('syn-restool-room-info [data-e2e="removeAdult_1"]').click()
    cy.get('syn-restool-room-info [data-e2e="addChild_1"]').click()
    cy.get('syn-restool-room-info [data-e2e="childAge_1_1"]').click()
    cy.get('mat-option .mat-option-text').contains('5').click()
    cy.get('[aria-label="Apply selections and close dialog"]').click()
    // Intercept the Availability request
    cy.intercept('POST', '**/api/v1/Availability').as('getHotelAvails')
    cy.intercept('GET', '**/api/v1/Carts/*').as('getCart')
    //Search button click
    cy.get('[data-e2e="restoolSubmitButton"]').click()
    cy.wait('@getHotelAvails', {responseTimeout: 60000}).its('response.statusCode').should('eq', 200)
    // Intercepts the Cart request
    cy.wait('@getCart').its('response.statusCode').should('eq', 200)
    //Check URL
    cy.url().should('include', '/avail/hotels')
  });
})
