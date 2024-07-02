import sharedPage from './page'
import locators from '../fixtures/locators.json'

export class adminPage extends sharedPage {

    elements = {
        // reservationNumberInput : () => cy.get(locators.findMyTrip.reservationNumberInput),
        // reservationNumberError : () => cy.get(locators.findMyTrip.reservationNumberError),
        nameInput : () => cy.get(locators.admin.login.username),
        emailInput : () => cy.get(locators.admin.login.password),
        loginSubmitButton : () => cy.get(locators.admin.login.submitButton)
    }

    open() {
        return super.visitUrl('/#/admin')
    }
    populateAuthenticate(username, password){
        this.elements.nameInput().clear().type(username).tab()
        this.elements.emailInput().clear().type(password)
    }
    submitLogin() {
        this.elements.loginSubmitButton().click()
    }
    // getReservationNumberError() {
    //     return this.elements.reservationNumberError();
    // }
    // getEmailAddressError() {
    //     return this.elements.emailAddressError(); 
    // }
    // triggerFormErrorMessages() {
    //     this.elements.reservationNumberInput().click().blur()
    //     this.elements.emailAddressInput().click().blur()
    // }
}

export default new adminPage();