describe('Search', function() {
  it('Search For a Property', function() {
    cy.visit('http://localhost:4200/properties');

    cy.get('input').type('Bs');

    cy.get('.search_button').click();

    cy.get('.ais-Pagination-link').eq(3).click();

    cy.get('img[alt="sing up image"]').eq(1).click();
  });

  it('views liked properties and unlikes', function () {
    cy.visit('http://localhost:4200/liked-properties');

    cy.get('img[alt="sing up image"]').eq(1).click();
  })

});
