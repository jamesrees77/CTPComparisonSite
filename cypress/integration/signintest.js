describe('Sign in a User', function() {
  it('Signs in user', function() {
    cy.visit('http://localhost:4200/signin');

    cy.get('input[name=email]').type('james.rees7@hotmail.co.uk');
    cy.get('input[name=your_pass]').type('testing');

    cy.get('button[type=button]').click();

  });

});
