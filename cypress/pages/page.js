class page {
    visitUrl(url) {
        cy.visit(url);
    }
    interceptRequest(operator, url, alias) {
        cy.intercept(operator, url).as(alias)
    }
}

export default page