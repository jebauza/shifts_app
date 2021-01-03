const { io } = require('../server');
const { TicketControl } = require('../class/ticket-control');

let ticketControl = new TicketControl();

io.on('connection', (client) => {

    // console.log('Usuario conectado');

    client.emit('lastTicket', {
        ticket: ticketControl.getLastTicket(),
    });

    client.emit('haveTicketToProcess', ticketControl.haveTicketToProcess());

    client.emit('publicTicketsInProcess', { tickets: ticketControl.getLast4() });

    client.on('newTicket', (data, callback) => {
        let ticket = ticketControl.nextTicket();

        callback({
            ticket
        });

        client.broadcast.emit('haveTicketToProcess', ticketControl.haveTicketToProcess());
    });

    client.on('attendTicket', (data, callback) => {
        if (!data.desk) {
            return callback({
                err: true,
                message: 'The desk is required'
            });
        }

        let attendTicket = ticketControl.attendTicket(data.desk);
        client.broadcast.emit('haveTicketToProcess', ticketControl.haveTicketToProcess());
        client.broadcast.emit('publicTicketsInProcess', { tickets: ticketControl.getLast4() });

        callback(attendTicket);
    });



});