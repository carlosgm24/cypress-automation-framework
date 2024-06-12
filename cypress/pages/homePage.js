import sharedPage from './page'
import locators from '../fixtures/locators.json'

export class homePage extends sharedPage {
    
    elements = {
        //searchForm : () => cy.get(locators.home.searchForm, {timeout: 10000}),
        nameInput : () => cy.get(locators.home.contactForm.nameInput),
        emailInput : () => cy.get(locators.home.contactForm.emailInput),
        phoneInput : () => cy.get(locators.home.contactForm.phoneInput),
        subjectInput : () => cy.get(locators.home.contactForm.subjectInput),
        descriptionInput : () => cy.get(locators.home.contactForm.descriptionInput),
        contactFormSubmitButton : () => cy.get(locators.home.contactForm.submitButton),
        contactFormSuccessMessage : () => cy.get(locators.home.contactForm.successMessage)
    }

    open() {
        return super.visitUrl('/')
    }

    populateContactForm(name, email, phone, subject, description){
        // Leaving from AND Going to inputs
        this.elements.nameInput().clear().type(name).tab()
        this.elements.emailInput().clear().type(email).tab()
        this.elements.phoneInput().clear().type(phone).tab()
        this.elements.subjectInput().clear().type(subject).tab()
        this.elements.descriptionInput().clear().type(description).tab()

        // Travel dates input
        // this.elements.travelDatesInput().click()
        // Advance 4 months
        // for (let i = 0; i < 4; i++) {
        //   this.elements.calendarNextButton().click()
        // }
        // this.elements.monthview().contains(travelDay).click()
        // this.elements.monthview().contains(returnDay).click()
    }
    submitContactForm() {
        this.elements.contactFormSubmitButton().click()
    }
    getContactFormSuccessMessage() {
        return this.elements.contactFormSuccessMessage();
    }
}

export default new homePage();