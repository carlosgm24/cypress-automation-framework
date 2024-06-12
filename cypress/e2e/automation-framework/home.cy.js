/// <reference types="cypress" />
import homePage from '../../pages/homePage'

context('Home Page', () => {
  beforeEach(() => {
    // load site-info.json fixture file and store
    cy.fixture('site-info.json').then((vendor) => {
      globalThis.vendor = vendor
    })

    //load the testing site
    homePage.open();
  })

  it('should visit the correct home url', () => {
    cy.url().should('eq', vendor.url)
  });

  it('should send a successful form', () => {
    //Make a search in home page
    homePage.populateContactForm(vendor.home.contactForm.name, vendor.home.contactForm.email, vendor.home.contactForm.phone, vendor.home.contactForm.subject, vendor.home.contactForm.description);

    // Intercept the Availability and Carts request
    // homePage.interceptRequest('POST', '**/api/v1/Availability', 'getHotelAvails');
    // homePage.interceptRequest('GET', '**/api/v1/Carts/*', 'getCart');
    //Submit contact button
    homePage.submitContactForm();

    // Wait on the Availability and Carts request
    // cy.wait('@getHotelAvails', {responseTimeout: 60000}).its('response.statusCode').should('eq', 200)
    // cy.wait('@getCart').its('response.statusCode').should('eq', 200)

    // Check URL
    // cy.url().should('include', '/avail/hotels')

    // Validate successful message
    homePage.getContactFormSuccessMessage().should('have.text', vendor.home.contactForm.successMessage);
  });
})
