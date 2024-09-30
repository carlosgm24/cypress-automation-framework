// <reference types="cypress" />

context('Booking requests', () => {
  beforeEach(() => {
    // load site-info.json fixture file and store
    cy.fixture('site-info.json').then((vendor) => {
      globalThis.vendor = vendor
    })
    cy.visit('/');
  })

  it('should make a sucessful booking request', () => {
    cy.request('POST', '/booking/', 
    {
      bookingdates: {
        checkin: "2024-09-06",
        checkout: "2024-09-07"
      },
      depositpaid: false,
      email: "test@test.com",
      firstname: "Testy",
      lastname: "Test",
      phone: "123456789123",
      roomid: "1"
    })
    .then(
      (response) => {
          expect(response.status).to.eq(201)
      }
    )
  })
})
