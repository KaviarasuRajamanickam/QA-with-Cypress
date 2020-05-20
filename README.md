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
- Ensure that all images load without failing
- Assert the logo should be visible
- Ensure the page title to be expected
- Check the page scroll to correct position at specific viewport
- Expect the list of drop downs are available on clicking the hamburger menu
- Navigate to the expected page on clicking the links

```shell
describe('The Home page', () => {
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
    })
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
                    expect(new Date(texts[0].maxDate), i+'- '+eventTitle).to.be.greaterThan(currDate); 
                } catch (error) {
                    eventStatus = false;                             
                    cy.log(error.message);
                }
            } else {
                cy.log(i+' - '+eventTitle+' - event date doesn\'t match with the formatted date')
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

