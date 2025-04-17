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

    it('should create a new task', () => {
      cy.visit('http://localhost:5173');
      cy.contains('Add Task').click();
      
      cy.get('#title').type('New Task');
      cy.get('#summary').type('Some description');
      cy.get('.modal').contains('Add Task').click();

      cy.get('.task').should('have.length', 1);
      cy.get('.task h2').contains('New Task');
      cy.get('.task p').contains('Some description');
    });

    it('should validate user input', () => {
      cy.visit('http://localhost:5173');
      cy.contains('Add Task').click();
      
      cy.get('.modal').contains('Add Task').click();
      cy.get('.modal').contains('Please provide values for task title, summary and category!');
    });

    it('should filter tasks', () => {
      cy.visit('http://localhost:5173');
      cy.contains('Add Task').click();
      
      cy.get('#title').type('Urgent Task');
      cy.get('#summary').type('Urgent description');
      cy.get('#category').select('urgent');
      cy.get('.modal').contains('Add Task').click();
      cy.get('.task').should('have.length', 1);
      cy.get('.task h2').contains('Urgent Task');
      cy.get('.task p').contains('Urgent description');
      cy.get('.no-tasks').should('not.exist');

      cy.get('#filter').select('urgent');
      cy.get('.task').should('have.length', 1);
      cy.get('.task h2').contains('Urgent Task');
      cy.get('.task p').contains('Urgent description');
      cy.get('.no-tasks').should('not.exist');

      cy.get('#filter').select('important');
      cy.get('.task').should('have.length', 0);
      cy.get('.no-tasks').should('exist');
      cy.get('.no-tasks').contains('No tasks found!');

      cy.get('#filter').select('moderate');
      cy.get('.task').should('have.length', 0);
      cy.get('.no-tasks').should('exist');
      cy.get('.no-tasks').contains('No tasks found!');
      
      cy.get('#filter').select('low');
      cy.get('.task').should('have.length', 0);
      cy.get('.no-tasks').should('exist');
      cy.get('.no-tasks').contains('No tasks found!');

      cy.get('#filter').select('all');
      cy.get('.task').should('have.length', 1);
      cy.get('.task h2').contains('Urgent Task');
      cy.get('.task p').contains('Urgent description');
      cy.get('.no-tasks').should('not.exist');
    });

    it('should add multiple tasks', () => {
      cy.visit('http://localhost:5173');
      
      cy.contains('Add Task').click();
      cy.get('#title').type('Task 1');
      cy.get('#summary').type('First task');
      cy.get('.modal').contains('Add Task').click();
      cy.get('.task').should('have.length', 1);
      cy.get('.task h2').contains('Task 1');
      cy.get('.task p').contains('First task');

      cy.contains('Add Task').click();
      cy.get('#title').type('Task 2');
      cy.get('#summary').type('Second task');
      cy.get('.modal').contains('Add Task').click();
      cy.get('.task').should('have.length', 2);
      cy.get('.task h2').first().contains('Task 1');
      cy.get('.task p').eq(0).contains('First task');
      cy.get('.task h2').last().contains('Task 2');
      cy.get('.task p').eq(1).contains('Second task');
    });
});
