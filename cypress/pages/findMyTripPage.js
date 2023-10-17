import sharedPage from './page'
import locators from '../fixtures/locators.json'

export class findMyTripPage extends sharedPage {

    elements = {
        reservationNumberInput : () => cy.get(locators.findMyTrip.reservationNumberInput),
        reservationNumberError : () => cy.get(locators.findMyTrip.reservationNumberError),
        emailAddressInput : () => cy.get(locators.findMyTrip.emailAddressInput),
        emailAddressError : () => cy.get(locators.findMyTrip.emailAddressError)
    }

    open() {
        return super.visitUrl('/reservations/retrieve')
    }
    getReservationNumberError() {
        return this.elements.reservationNumberError();
    }
    getEmailAddressError() {
        return this.elements.emailAddressError(); 
    }
    triggerFormErrorMessages() {
        this.elements.reservationNumberInput().click().blur()
        this.elements.emailAddressInput().click().blur()
    }
}

export default new findMyTripPage();