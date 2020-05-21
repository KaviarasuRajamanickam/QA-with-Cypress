/// <reference types="Cypress" />

describe('The Home page', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('.nav > ul > li').as('navList');
        cy.get('.nav').as('nav');
        cy.get('.menu').as('menu');
    });

    const primaryNav = ['Home', 'Solutions', 'Services', 'Resources', 'Careers', 'About', 'Blog'];
    const secondaryNav = ['All', 'Webinars', 'Events', 'Case Studies', 'White Papers', 'Blog', 'Media', 'Podcast'];

    it('Assert the page loads successfully with correct title', function () {
        cy.title().should('be.equal', 'Education Advances | Hobsons');
    });

    it('Check the page scroll to correct position at specific viewport', () => {
        cy.viewport(1366, 768);

        cy.get('.home-more').click();

        cy.get('.learn-more-wrapper')
            .scrollIntoView()
            .should('be.visible');

        cy.window().then(($window) => {
            expect($window.scrollY).to.be.closeTo(700, 100);
        });

    });

    it('Expect the list of drop downs are available on clicking the hamburger menu', () => {
        cy.get('@nav')
            .should('not.be.visible')
            .and('not.have.class', 'visible');

        cy.get('@menu')
            .should('be.visible')
            .and('not.have.class', 'active')
            .click();

        cy.get('@menu')
            .should('be.visible')
            .and('have.class', 'active');

        cy.get('@nav')
            .should('be.visible')
            .and('have.class', 'visible');

        primaryNav.forEach((item) => {
            cy.get('@nav').contains(item);
        })

        cy.get('@navList')
            .eq(3)
            .contains('Resources')
            .click();

        secondaryNav.forEach((item) => {
            cy.get('@navList')
                .eq(3)
                .find('li')
                .contains(item);
        })

        cy.get('@navList')
            .eq(3)
            .find('li')
            .should('have.length', 8)
            .eq(2)
            .contains('Events');

        cy.get('@menu')
            .and('have.class', 'active')
            .click();

        cy.get('@nav')
            .should('not.be.visible')
            .and('not.have.class', 'visible');

    });   
});

describe('The Home page - Additional Validations', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('#logo').as('logo');
        cy.get('.nav > ul > li').as('navList');
        cy.get('.menu').as('menu');
    });
    
    let imageStatus = true;
    it('Ensure that all images load without failing', () => {
        cy.get('img').each((img) => {
            try {
                expect(img[0].naturalWidth).to.not.equal(0)
            } catch (error) {
                imageStatus = false;                             
            }
        })
        .then(() => {
            expect(imageStatus).to.be.equal(true);
        })
    });

    it('Assert the logo should be visible', function () {
        cy.get('@logo')
            .should('be.visible')
            .and('have.css', 'background-image', 'url("https://www.hobsons.com/ui/svg/logo-hobsons-tagline.svg")');
    });

    it('Ensure the banner title to be expected', () => {
        cy.get('h1').should('contain', 'We help students across the journey of a lifetime.');
    });

    it('Navigate to the expected page on clicking the links', () => {
        cy.get('@menu')
            .and('not.have.class', 'active')
            .click();

        cy.get('@navList')
            .eq(3)
            .contains('Resources')
            .click();

        cy.get('@navList')
            .eq(3)
            .find('li')
            .eq(2)
            .contains('Events')
            .click();

        cy.url().should('include', '/resources/events');
    });
})