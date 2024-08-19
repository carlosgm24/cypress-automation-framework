// <reference types="cypress" />
import adminPage from '../../pages/adminPage'

context('Admin Page', () => {
  beforeEach(() => {
    // load site-info.json fixture file and store
    cy.fixture('site-info.json').then((vendor) => {
      globalThis.vendor = vendor
    })

    //load the testing site
    adminPage.open();
  })

  it('should visit the correct admin site url and login', () => {
    cy.url().should('eq', vendor.url + '#/admin')
  });

  describe('Login/Logout', () => {
    it('should validate a successful login/logout', () => {
      // HTTP interceptors
      adminPage.interceptRequest('POST', '**/auth/login', 'sendLogin');
      adminPage.interceptRequest('POST', '**/auth/logout', 'sendLogout');

      //Login
      adminPage.populateAuthenticate(vendor.admin.login.username, vendor.admin.login.password);
      adminPage.submitLogin();
      cy.wait('@sendLogin').its('response.statusCode').should('eq', 200)

      //Logout
      adminPage.submitLogout();
      cy.wait('@sendLogout').its('response.statusCode').should('eq', 200)
    });
    
    it('should validate incorrect login', () => {
      // HTTP interceptors
      adminPage.interceptRequest('POST', '**/auth/login', 'sendLogin');

      //Bad Login
      adminPage.populateAuthenticate('fakeUser', 'fakePass');
      adminPage.submitLogin();
      cy.wait('@sendLogin').its('response.statusCode').should('eq', 403)
    });
  })

  describe ('Rooms', () => {
    it('should add a new room and validate room count', () => {
      // HTTP interceptor
      adminPage.interceptRequest('GET', '**/room', 'getRooms');

      //Login
      adminPage.populateAuthenticate(vendor.admin.login.username, vendor.admin.login.password);
      adminPage.submitLogin();

      //Get numbers of rooms before creating one
      cy.wait('@getRooms')
      cy.document().then((doc) => {
        let oldRoomsCount = doc.querySelectorAll("div[data-testid='roomlisting']").length

        //Create new room
        adminPage.populateRoom('1', '999', ['wifi', 'tv', 'radio']);
        adminPage.submitCreateRoom();

        //Validate room count increased
        cy.get("div[data-testid='roomlisting']").should('have.length', oldRoomsCount + 1)
      })
    });
  })
})
