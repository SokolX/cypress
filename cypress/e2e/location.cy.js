/// <reference types="Cypress" />

beforeEach(() => {
    cy.visit('/').then((win) => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').as(
            'getUserPosition'
        ).callsFake((cb) => {
            setTimeout(() => {
                cb({
                    coords: {
                        latitude: 25.5,
                        longitude:48.1
                }
            });
            }, 100);
        });
        
        cy.stub(win.navigator.clipboard, 'writeText')
            .as('saveToClipboard')
            .resolves();
    });
}); 

describe('share location', () => {
    it('should fetch the user location', () => {
        cy.getById('get-loc-btn').click();
        cy.get('@getUserPosition').should('have.been.called');
        cy.getById('get-loc-btn').should('be.disabled');
        cy.getById('actions').should('contain', 'Location fetched'); //alternative to contains()
    });

    it('share a location URL', () => {
        cy.getById('name-input').type('John Doe');
        cy.getById('get-loc-btn').click();
        cy.getById('share-loc-btn').click();
        cy.get('@saveToClipboard').should('have.been.called');
        cy.get('@saveToClipboard').should(
            'have.been.calledWithMatch', 
            new RegExp(`${25.5}.*${48.1}.*${encodeURI('John Doe')}`)
        );
    });
});