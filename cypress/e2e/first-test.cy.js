describe('templete spec', () => {
    it('passes', () => {
        cy.visit('/');
        cy.get('li').should('have.length', 6);
    })
})