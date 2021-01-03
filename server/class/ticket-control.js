const fs = require('fs');

class Ticket {

    constructor(numb, desk) {
        this.numb = numb;
        this.desk = desk;
    }
}

class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lasts4 = [];

        let data = require('../data/data.json');

        if (data && data.today === this.today) {
            this.last = data.last
            this.tickets = data.tickets
            this.lasts4 = data.lasts4;
        } else {
            this.restartCount();
        }
    }

    nextTicket() {
        this.last += 1;
        let newTicket = new Ticket(this.last, null);
        this.tickets.push(newTicket);

        this.saveData();

        return this.last;
    }

    getLastTicket() {
        return this.last
    }

    getLast4() {
        return this.lasts4;
    }

    haveTicketToProcess() {
        return this.tickets.length ? true : false;
    }

    attendTicket(desk) {
        if (this.tickets.length === 0) {
            return 'No hay Tickets'
        }

        let numbTicket = this.tickets[0].numb;
        this.tickets.shift();

        let attendTicket = new Ticket(numbTicket, desk);

        this.lasts4.unshift(attendTicket);
        if (this.lasts4.length > 4) {
            this.lasts4.splice(-1, 1); // delete last
        }

        this.saveData();

        return attendTicket;
    }

    saveData() {
        let jsonDataString = JSON.stringify({
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lasts4: this.lasts4
        });

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

    restartCount() {
        this.last = 0;
        this.tickets = [];
        this.lasts4 = [];

        this.saveData();
    }


}





module.exports = {
    TicketControl
}