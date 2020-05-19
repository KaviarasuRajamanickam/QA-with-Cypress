describe('Checking the Events', () => {
    beforeEach(() => {
        cy.visit('/resources/events');
        cy.get('.res-events').as('eventList');
    })

    //To get the date from the string
    function getNewDate(eventDate) {
        let str1 = eventDate.substring(0, eventDate.indexOf('|')).replace(/\s/g, '').replace(".", ",").toLowerCase();
        let splitDate = str1.split(',');
        let minDay, maxDay, minDate, maxDate;
        if (str1 !== null && str1 !== '' && str1 !== undefined && str1 !== NaN && splitDate.length > 2) {
            if (str1.includes("-")) {
                var str2 = str1.split(",");                
                let str3 = str2[1].split('-');                
                if(str3.length > 1){
                    for(let i = 0; i< str3.length; i++){                    
                        minDay = Math.min(...str3);
                        maxDay = Math.max(...str3);                   
                    }
                }
                var eventNewDate = new Date(str1);
                var eventMonth = eventNewDate.getMonth() + 1;
                minDate = splitDate[splitDate.length-1]+','+eventMonth+','+minDay
                maxDate = splitDate[splitDate.length-1]+','+eventMonth+','+maxDay
                return {minDate, maxDate};
            }
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