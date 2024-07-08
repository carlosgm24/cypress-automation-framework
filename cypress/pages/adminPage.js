import sharedPage from './page'
import locators from '../fixtures/locators.json'

export class adminPage extends sharedPage {

    elements = {
        nameInput : () => cy.get(locators.admin.login.username),
        emailInput : () => cy.get(locators.admin.login.password),
        loginSubmitButton : () => cy.get(locators.admin.login.submitButton),
        logoutSubmitButton : () => cy.get(locators.admin.logout.submitButton),
        roomNameInput : () => cy.get(locators.admin.rooms.roomName),
        roomPriceInput : () => cy.get(locators.admin.rooms.roomPrice),
        roomFeatures : () => cy.get(locators.admin.rooms.features),
        createRoomSubmitButton : () => cy.get(locators.admin.rooms.createRoomButton),
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
    submitLogout() {
        this.elements.logoutSubmitButton().click()
    }
    populateRoom(name, price, features) {
        this.elements.roomNameInput().clear().type(name)
        this.elements.roomPriceInput().clear().type(price)
        features.forEach(feature => {
            cy.get(locators.admin.rooms.features[feature]).click()
        })
    }
    submitCreateRoom() {
        this.elements.createRoomSubmitButton().click()
    }
}

export default new adminPage();