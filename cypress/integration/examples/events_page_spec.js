/// <reference types="Cypress" />

describe('Checking the Events', () => {
    beforeEach(() => {
        cy.visit('/resources/events');
        cy.get('.res-events').as('eventList');
    })

    /*To get the date from the string*/
    const getNewDate = (eventDate) => {
        let trimDate = eventDate.substring(0, eventDate.indexOf('|')).replace(/\s/g, '').replace('.', ',').toLowerCase();
        let splitDate = trimDate.split(',');
        let minDay, maxDay, minDate = '', maxDate = '';
        if (trimDate && trimDate.trim() !== '' && splitDate.length>2) {
            if (trimDate.includes('-')) {
                let formattedDate = trimDate.split(',')[1].split('-');
                if (formattedDate.length > 1) {
                    minDay = Math.min(...formattedDate);
                    maxDay = Math.max(...formattedDate);   
                }
                const eventNewDate = new Date(trimDate),
                    eventMontYear = splitDate[splitDate.length-1]+','+(eventNewDate.getMonth()+1);
                if (minDay && maxDay) {
                    minDate = eventMontYear+','+minDay
                    maxDate = eventMontYear+','+maxDay
                }             
            }
        } 
        return {minDate, maxDate};
    }
    
    /*To get the current date*/
    let date  = new Date(),
    currDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1);
    
    it('Make sure the events should have the future date', () => {
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
                    cy.log(error.message);
                }
            } else {
                cy.log(i+' - '+eventTitle+' - event date doesn\'t match with the formatted date')
            }     
        })
    })
})