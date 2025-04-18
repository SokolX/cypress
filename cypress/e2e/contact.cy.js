/// <reference types="Cypress" />

beforeEach(() => {
    //runs before every tests
    cy.visit('/about');
});

afterEach(() => {
    //runs after every tests
});

describe('contact form', () => {

    before(() => {
        //runs only once, before all tests
    });

    after(() => {
        //runs only once, after all tests
    });

    it('should submit the form', () => {
        cy.task('seedDatabase', 'filename.csv').then(returnValue => {
            //use returnValue
        });
        cy.getById('contact-input-message').type('Hello');
        cy.getById('contact-input-name').type('John Doe');
        cy.getById('contact-btn-submit').then((el) => {
            expect(el.attr('disabled')).to.be.undefined;
            expect(el.text()).to.eq('Send Message');
        });
        cy.getById('contact-input-email').type('test@example.com');
        cy.submitForm()
        //cy.get('[data-cy="contact-btn-submit"]')
        //    .contains('Send Message')
        //    .and('not.have.attr', 'disabled'); // and == should()
        cy.getById('contact-btn-submit').as('submitBtn'); //use alias, const not recommended
        //cy.get('@submitBtn').click();
        cy.get('@submitBtn').contains('Sending...');
        cy.get('@submitBtn').should('have.attr', 'disabled');
    });

    it('should validate the form input', () => {
        cy.getById('contact-btn-submit').as('submitBtn'); 
        cy.submitForm();
        cy.get('@submitBtn').then(el => {
            expect(el).to.not.have.attr('disabled');
            expect(el.text()).to.not.equal('Sending...');
        })
        cy.get('@submitBtn').contains('Send Message');

        cy.getById('contact-input-message').as('msgInput')
        cy.get('@msgInput').blur(); //lose focus
        cy.get('@msgInput')
            .parent()
            .should('have.attr', 'class')
            .and('match', /invalid/); // or .and('eq', 'invalid')

        cy.getById('contact-input-name').as('nameInput')
        cy.get('@nameInput').focus().blur(); //lose focus
        cy.get('@nameInput')
            .parent()
            .should('have.attr', 'class')
            .and('match', /invalid/); 
        
        cy.getById('contact-input-email').as('emailInput')
        cy.get('@emailInput').focus().blur(); //lose focus
        cy.get('@emailInput')
            .parent()
            .should((el) => {
                expect(el.attr('class')).not.to.be.undefined;
                expect(el.attr('class')).to.contains('invalid');
            });
    });
});