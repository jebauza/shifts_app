// Establecer conexion con el server
var socket = io();

var label = $('#lblattendTicket');
var urlParams = new URLSearchParams(window.location.search);

if (!urlParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var desk = urlParams.get('escritorio');

$('#lbldesk').text(desk);
var btnAattendTicket = $('button');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
});

socket.on('haveTicketToProcess', function(data) {
    if (data) {
        btnAattendTicket.text('Atender siguiente ticket').prop("disabled", false);
    } else {
        btnAattendTicket.text('No existe Ticket disponibles').prop("disabled", true);
    }
});

btnAattendTicket.on('click', function() {

    socket.emit('attendTicket', {
        desk
    }, function(res) {
        if (res.numb) {
            label.text('Ticket - ' + res.numb);
        } else {
            label.text('....');
            btnAattendTicket.text('No existe Ticket disponibles').prop("disabled", true);
        }
    });
});