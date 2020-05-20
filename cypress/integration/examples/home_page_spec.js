/// <reference types="Cypress" />

describe('The Home page', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('.nav > ul > li').as('navList');
        cy.get('.nav').as('nav');
        cy.get('.menu').as('menu');
        cy.get('#logo').as('logo');
    });

    const primaryNav = ['Solutions', 'Services', 'Resources', 'About', 'Blog'];
    const secondaryNav = ['All', 'Webinars', 'Events', 'Case Studies', 'White Papers', 'Blog', 'Media', 'Podcast'];

    it('successfully loads, contains correct title', function () {
        cy.title().should('be.equal', 'Education Advances | Hobsons');
    });

    it('ensure that no image failed to load', () => {
        cy.get('img').each((img) => {
            try {
                expect(img[0].naturalWidth).to.not.equal(0);
            } catch (error) {
                cy.log(error.message);
            }
        })
    });

    it('has a visible logo', function () {
        cy.get('@logo')
            .should('be.visible')
            .and('have.css', 'background-image', 'url("https://www.hobsons.com/ui/svg/logo-hobsons-tagline.svg")');
    });

    it('contains the correct page title', () => {
        cy.get('h1').should('contain', 'We help students across the journey of a lifetime.');
    });

    it('Check the page scroll to correct viewport', () => {
        cy.viewport(1366, 768);

        cy.get('.home-more').click();

        cy.get('.learn-more-wrapper')
            .scrollIntoView()
            .should('be.visible');

        cy.window().then(($window) => {
            expect($window.scrollY).to.be.closeTo(700, 100);
        });

    });

    it('Expect the list of drop downs on clicking the humberger menu', () => {
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

    it('Navigate to Events page on clicking the navigation', () => {
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
});