// Establecer conexion con el server
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
});

socket.on('lastTicket', function(data) {
    label.text('Ticket ' + data.ticket);
});

$('button').on('click', function() {
    socket.emit('newTicket', null, function(res) {
        if (res.ticket) {
            label.text('Ticket ' + res.ticket);
        }
    });
});