describe('Checking the Events', () => {
    beforeEach(() => {
        cy.visit('/resources/events');
        cy.get('.res-events').as('eventList');
    })

    //To get the date from the string
    function getNewDate(eventDate) {
        let str1 = eventDate.substring(0, eventDate.indexOf('|')).replace(/\s/g, '').replace(".", ",").toLowerCase();
        let splitDate = str1.split(',');
        const minDay, maxDay, minDate = '', maxDate = '';
        if (!str && str1 !== '' && splitDate.length > 2) {
            if (str1.includes("-")) { 
                let str3 = str1.split(",")[1].split('-');
                if(str3.length > 1){
                    minDay = Math.min(...str3);
                    maxDay = Math.max(...str3);                   
                }
                let eventNewDate = new Date(str1),
                    eventMonth = eventNewDate.getMonth() + 1,
                    eventMontYear = splitDate[splitDate.length-1]+','+eventMonth;
                if(minDay ==! undefined && maxDay !== undefined){
                    minDate = eventMontYear+','+minDay
                    maxDate = eventMontYear+','+maxDay
                }                
                return {minDate, maxDate};
            }
        } else {
            return {minDate, maxDate};
        }       
    }
     
    //To get the current date
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