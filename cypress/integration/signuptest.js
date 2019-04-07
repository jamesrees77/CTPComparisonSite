/// <reference types="cypress" />
import Chance from 'chance';
const chance = new Chance();
// sign up user
describe('Sign up a User', function() {
  it('Enters sign up details', function() {
    // chance is a library that creates random emails
    const email = chance.email();
    // visit sign up page
    cy.visit('http://localhost:4200/signup');
  //enter name
    cy.get('input[name=name]').type('James');
    //enter surname
    cy.get('input[name=last_name]').type('Rees');
    // enter email
    cy.get('input[name=email]').type(email);
    // enter password
    cy.get('input[name=pass]').type('testing');
  // select current location as BS8
    cy.get('select').select('BS8');
  // hit register button
    cy.get('input[type=button]').click();

  });

  it('Selects Profile Image', function() {
// visit select profile picture page
    cy.visit('http://localhost:4200/select-profile-image');
// hit skip button
    cy.get('.skip_button').click();
//go home
    cy.visit('http://localhost:4200/');

  })

});
