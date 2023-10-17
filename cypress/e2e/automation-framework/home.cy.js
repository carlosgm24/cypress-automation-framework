/// <reference types="cypress" />
import homePage from '../../pages/homePage'

context('Home Page', () => {
  beforeEach(() => {
    // load vendor-ccv.json fixture file and store
    cy.fixture('vendor-ccv.json').then((vendor) => {
      globalThis.vendor = vendor
    })

    //load the vendor's page
    homePage.open();
  })

  it('should visit the correct CCV url', () => {
    // Wait form the search form to be visible
    homePage.getSearchForm().should('be.visible');

    cy.url().should('eq', vendor.url + '/search')
  });

  it('should make a successful search', () => {
    // Wait form the search form to be visible
    homePage.getSearchForm().should('be.visible');

    //Make a search in home page
    homePage.populateSearchForm(vendor.origin, vendor.destination, vendor.travelDay, vendor.returnDay, vendor.childAge);

    // Intercept the Availability and Carts request
    homePage.interceptRequest('POST', '**/api/v1/Availability', 'getHotelAvails');
    homePage.interceptRequest('GET', '**/api/v1/Carts/*', 'getCart');
    //Search button click
    homePage.submitSearch();

    // Wait on the Availability and Carts request
    cy.wait('@getHotelAvails', {responseTimeout: 60000}).its('response.statusCode').should('eq', 200)
    cy.wait('@getCart').its('response.statusCode').should('eq', 200)

    // Check URL
    cy.url().should('include', '/avail/hotels')
  });
})
