/// <reference types="Cypress" />

describe('tasks managment', () => {
    it('should open and close the new task modal', () => {
      cy.visit('http://localhost:5173');
      cy.contains('Add Task').click();
      cy.get('.backdrop').click({ force: true });
    });
});
