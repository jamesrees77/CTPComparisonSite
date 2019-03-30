describe('Profile', function() {
  it('Edit Profile Data', function() {
    cy.visit('http://localhost:4200/profile');

    cy.get('.btn-fill').click();

    cy.get('input[placeholder="First Name"]').clear().type('Jam');
    cy.get('input[placeholder="Last Name"]').clear().type('Rees');
    cy.get('input[placeholder="Home Address"]').clear().type('Flat2, 23, Cromwell Road');
    cy.get('input[placeholder="City"]').clear().type('Bristol');
    cy.get('input[placeholder="Country"]').clear().type('United Kingdom');
    cy.get('input[placeholder="ZIP Code"]').clear().type('BS65HD');
    cy.get('textarea').clear().type('Testing description with Cypress.');

    cy.get('.btn-fill').click();
  });

});
