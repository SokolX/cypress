/// <reference types="Cypress" />

beforeEach(() => {
    cy.fixture('user-location.json').as('userLocation');

    cy.visit('/').then((win) => {
        cy.get('@userLocation').then(fakePostion => {

            cy.stub(win.navigator.geolocation, 'getCurrentPosition').as(
                'getUserPosition'
            ).callsFake((cb) => {
                setTimeout(() => {
                    cb(fakePostion);
                }, 100);
            });
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
        cy.get('@userLocation').then(fakePostion => {
            const { latitude, longitude } = fakePostion.coords;

            cy.get('@saveToClipboard').should(
                'have.been.calledWithMatch', 
                new RegExp(`${latitude}.*${longitude}.*${encodeURI('John Doe')}`)
            );
        });
    
    });
});