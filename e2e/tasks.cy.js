/// <reference types="Cypress" />

describe('tasks managment', () => {
    it('should open and close the new task modal by click background', () => {
      cy.visit('http://localhost:5173');
      cy.contains('Add Task').click();
      cy.get('.backdrop').click({ force: true });
      cy.get('.backdrop').should('not.exist');
      cy.get('.modal').should('not.exist');
    });

    it('should open and close the new task modal by click button Cancel', () => {
      cy.visit('http://localhost:5173');
      cy.contains('Add Task').click();
      cy.get('.modal').should('exist');
      cy.contains('Cancel').click();
      cy.get('.backdrop').should('not.exist');
      cy.get('.modal').should('not.exist');
    });
});
