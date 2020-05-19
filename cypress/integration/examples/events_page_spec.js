describe('Checking the Events', () => {
    beforeEach(() => {
        cy.visit('/resources/events');
        cy.get('.res-events').as('eventList');
    })

    /*To get the date from the string*/
    const getNewDate = (eventDate) => {
        let trimDate = eventDate.substring(0, eventDate.indexOf('|')).replace(/\s/g, '').replace(".", ",").toLowerCase();
        let splitDate = trimDate.split(',');
        let minDay, maxDay, minDate, maxDate = '';
        if (!trimDate && trimDate.trim() !=="" && splitDate.length>2) {
            if (trimDate.includes("-")) { 
                let formattedDate = trimDate.split(",")[1].split('-');
                if(formattedDate.length > 1){
                    minDay = Math.min(...formattedDate);
                    maxDay = Math.max(...formattedDate);                   
                }
                const eventNewDate = new Date(trimDate),
                    eventMonth = eventNewDate.getMonth() + 1,
                    eventMontYear = splitDate[splitDate.length-1]+','+eventMonth;
                if(!minDay && !maxDay){
                    minDate = eventMontYear+','+minDay
                    maxDate = eventMontYear+','+maxDay
                }                
            }
        } 
        return {minDate, maxDate};
    }
     
    /*To get the current date*/
    let date  = new Date(),
        year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate()+1,
        currDate = new Date(year, month, day);

    it('Make sure the events should have the future date', () => {
        cy.get('@eventList')
            .each(($ele) => {
                let texts = $ele.map((i, el) => {
                    return getNewDate(Cypress.$(el).find('.txt > p > small').text())
                })
                expect(new Date(texts.maxDate)).to.be.greaterThan(currDate);     
                // expect(new Date('2021,5,2')).to.be.greaterThan(currDate);// To test static, since the event date doesn't match with the current date  
            })
    })
})