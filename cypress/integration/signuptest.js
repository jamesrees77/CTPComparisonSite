/// <reference types="cypress" />
import Chance from 'chance';
const chance = new Chance();

describe('Sign up a User', function() {
  it('Enters sign up details', function() {
    const email = chance.email();
    cy.visit('http://localhost:4200/signup');

    cy.get('input[name=name]').type('James');
    cy.get('input[name=last_name]').type('Rees');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=pass]').type('testing');

    cy.get('select').select('BS8');

    cy.get('input[type=button]').click();

  });

  it('Selects Profile Image', function() {

    cy.visit('http://localhost:4200/select-profile-image');

    cy.get('.skip_button').click();

    cy.visit('http://localhost:4200/');

  })

});
