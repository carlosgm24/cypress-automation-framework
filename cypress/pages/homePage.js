import sharedPage from './page'
import locators from '../fixtures/locators.json'

export class homePage extends sharedPage {
    
    elements = {
        searchForm : () => cy.get(locators.home.searchForm, {timeout: 10000}),
        leavingFromInput : () => cy.get(locators.home.leavingFromInput),
        goingToInput : () => cy.get(locators.home.goingToInput),
        travelDatesInput : () => cy.get(locators.home.travelDates.travelDatesInput),
        calendarNextButton : () => cy.get(locators.home.travelDates.calendarNextButton),
        monthview : () => cy.get(locators.home.travelDates.monthView),
        editPassengersInput : () => cy.get(locators.home.roomsAndTravelers.editPassengersInput),
        removeAdultButton : () => cy.get(locators.home.roomsAndTravelers.removeAdultButton),
        addChildButton : () => cy.get(locators.home.roomsAndTravelers.addChildButton),
        childAgeDropdown : () => cy.get(locators.home.roomsAndTravelers.childAgeDropdown),
        childAgeDropdownOptions : () => cy.get(locators.home.roomsAndTravelers.childAgeDropdownOptions),
        doneButton : () => cy.get(locators.home.roomsAndTravelers.doneButton),
        searchFormSubmitButton : () => cy.get(locators.home.searchFormSubmitButton)
    }

    open() {
        return super.visitUrl('/')
    }
    getSearchForm() {
        return this.elements.searchForm();
    }
    populateSearchForm(origin, destination, travelDay, returnDay, childAge){
        // Leaving from AND Going to inputs
        this.elements.leavingFromInput().clear().type(origin).tab()
        this.elements.goingToInput().clear().type(destination).tab()

        // Travel dates input
        this.elements.travelDatesInput().click()
        // Advance 4 months
        for (let i = 0; i < 4; i++) {
          this.elements.calendarNextButton().click()
        }
        this.elements.monthview().contains(travelDay).click()
        this.elements.monthview().contains(returnDay).click()
        
        // Rooms and Travelers input
        this.elements.editPassengersInput().click()
        this.elements.removeAdultButton().click()
        this.elements.addChildButton().click()
        this.elements.childAgeDropdown().click()
        this.elements.childAgeDropdownOptions().contains(childAge).click()
        this.elements.doneButton().click()
    }
    submitSearch() {
        this.elements.searchFormSubmitButton().click()
    }
}

export default new homePage();