// <reference types="cypress" />
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
    //Populate the contact Form
    homePage.populateContactForm(vendor.home.contactForm.name, vendor.home.contactForm.email, vendor.home.contactForm.phone, vendor.home.contactForm.subject, vendor.home.contactForm.description);

    //Submit contact information
    homePage.submitContactForm();

    // Validate successful message
    homePage.getContactFormSuccessMessage().should('have.text', vendor.home.contactForm.successMessage);
  });
})
