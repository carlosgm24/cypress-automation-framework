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
        contactFormSuccessMessage : () => cy.get(locators.home.contactForm.successMessage),
        bookRoomButton : () => cy.get(locators.home.booking.bookRoomButton),
        calendarButtons : () => cy.get(locators.home.booking.calendarButtons),
        calendarMonthView : () => cy.get(locators.home.booking.calendarMonthView),
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
    }
    submitContactForm() {
        this.elements.contactFormSubmitButton().click()
    }
    getContactFormSuccessMessage() {
        return this.elements.contactFormSuccessMessage();
    }
    makeABooking() {
        this.elements.bookRoomButton().click();
    }
    moveCalendarMonths(action, months) {
        for(let n = 0; n < months; n ++){   
            this.elements.calendarButtons().contains(action).click();
        }
    }
    // Attempts to select on the calendar
    // selectCalendarDays(arrival, departure){
    //     cy.get(".rbc-today").dragTo(".rbc-today ~ .rbc-day-bg:first");
    
    //     //cy.get('.rbc-today').trigger("mousedown", { button: 0, force: true }).trigger("mousemove", { clientX: 100, clientY: -100, button: 0, force: true })
    //     //cy.get('.rbc-today ~ .rbc-day-bg:first').click().trigger('mouseup', { force: true })

    //     // this.elements.calendarMonthView().drag(".rbc-today ~ .rbc-day-bg")
    //     // this.elements.calendarMonthViewDays().contains(arrival).trigger('dragstart', { dataTransfer: new DataTransfer });
    //     // this.elements.calendarMonthViewDays().contains(departure).trigger('drop');
    // }
}

export default new homePage();