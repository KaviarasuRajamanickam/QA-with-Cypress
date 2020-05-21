# Cypress Automation

Automated test cases for website [Hobsons.com](https://www.hobsons.com/)

## Test Cases

- Assert that [Hobsons.com](https://hobsons.com/) renders as expected.

- Assert that clicking the arrow in the Hero graphic image on the home screen scrolls the page to the appropriate section into the viewport window aligned with the top of the visible screen.

- Assert that all links are available in the "hamburger" menu and children links are available under "Resources" menu.

- Assert all events on the page "Resources > Events", that will occur in future with dates specified in units of day, month and year.

## Tests covered
### Home_page_spec.js

- Assert the page loads successfully with correct title
- Check the page scroll to correct position at specific viewport
- Expect the list of drop downs are available on clicking the hamburger menu

#### Additional Validations

- Ensure that all images load without failing
- Assert the logo should be visible
- Ensure the banner title to be expected
- Assert if the hamburger menus when clicked gets navigated to their appropriate pages

```shell
describe('The Home page', () => {
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
)}
```

### events_page_spec.js

- Make sure the events with the future date are asserted

```shell
describe('Checking the Events', () => {
    beforeEach(() => {
        cy.visit('/resources/events');
        cy.get('.res-events').as('eventList');
    })

    it('Make sure the events with the future date are asserted', () => {
        cy.get('@eventList')
        .each(($ele, i) => {
            const eventTitle = Cypress.$($ele).find('.txt > h4 > a').text();
            const texts = $ele.map((i, el) => {
                return getNewDate(Cypress.$(el).find('.txt > p > small').text())
            })
            if (texts[0].maxDate.trim() !== '') {
                try {
                    expect(new Date(texts[0].maxDate), i + '- ' + eventTitle).to.be.greaterThan(currDate); 
                } catch (error) {
                    eventStatus = false;                             
                    cy.log(error.message);
                }
            } else {
                cy.log(i + ' - ' + eventTitle + ' - event date doesn\'t match with the formatted date')
            }     
        })
        .then(() => {
            expect(eventStatus).to.be.equal(true);
        })
    })
)}
```

## Built With

- [cypress.io](https://www.cypress.io/)

