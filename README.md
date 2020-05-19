# Cypress Automation

Automate the website [Hobsons.com](https://www.hobsons.com/) with some test case 

## Test Cases

- Hobsons.com home page renders as expected.

- On the home screen there is a Hero graphic with the text "We help students across the journey of a lifetime." Click the down arrow. Assert the page scrolls the next sections "How can we help your students?" into the viewport window. Assert that it is correctly aligned with the top of the visible screen

- When user clicks the "hamburger" menu at the top of the screen then the items the list drops down as expected with the sub-menu items. The menu I'm referring to is Solutions, Services, Resources, About & Blog. Assert that the "Resources" menus contain a list of child links including "Events".

- Navigate to Resources > Events. Assert all events on the page that occur in the future. Note you do NOT need to apply the filters, just assert on the default list that is displayed. Also note that you need only assert on events which have specified a day, month and year

## Tests covered
### Home_page_spec.js

- Assert the page successfully loads, contains correct title
- Ensure that no image failed to load
- Assert the logo should be visible
- Ensure the page title should be expected
- Check the page scroll to right position at specific viewport
- Expect the list of drop downs are available on clicking the humberger menu
- Navigate to the expected page on clicking the navigation

```shell
describe('The Home page', () => {
    it('ensure that no image failed to load', () => {
        cy.get('img').each((img) => expect(img[0].naturalWidth).to.not.equal(0))
    })

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
    })
)}
```

### events_page_spec.js

- Make sure the events should have the future date

```shell
describe('Checking the Events', () => {
    beforeEach(() => {
        cy.visit('/resources/events');
        cy.get('.res-events').as('eventList');
    })

    it('Make sure the events should have the future date', () => {
        cy.get('@eventList')
            .each(($ele) => {
                let texts = $ele.map((i, el) => {
                    return getNewDate(Cypress.$(el).find('.txt > p > small').text())
                })
                expect(new Date(texts.maxDate)).to.be.greaterThan(currDate);  
            })
    })
)}
```

## Built With

- [cypress.io](https://www.cypress.io/)

