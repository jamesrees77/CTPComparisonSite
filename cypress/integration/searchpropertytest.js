describe('Search', function() {
  it('Search For a Property', function() {
    // visit this page
    cy.visit('http://localhost:4200/properties');
  // type bs into first input
    cy.get('input').type('Bs');
  // click the search button
    cy.get('.search_button').click();
  // click to the second page
    cy.get('.ais-Pagination-link').eq(3).click();
// find the image of the heart and click it to like property
    cy.get('img[alt="sing up image"]').eq(1).click();
  });

  it('views liked properties and unlikes', function () {
    // then visit like properties page
    cy.visit('http://localhost:4200/liked-properties');
  // unlike property
    cy.get('img[alt="sing up image"]').eq(1).click();
  })

});
