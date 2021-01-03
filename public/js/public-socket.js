// Establecer conexion con el server
var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
});

socket.on('publicTicketsInProcess', function(data) {
    cleanDasboard();
    data.tickets.forEach((t, index) => {

        switch (index) {
            case 1:
                $('#tdLast3').show();
                break;
            case 2:
                $('#tr2').show();
                break;
            case 3:
                $('#tr3').show();
                break;
        }

        $('#lblTicket' + (index + 1)).text('Ticket ' + t.numb);
        $('#lblEscritorio' + (index + 1)).text('Escritorio ' + t.desk).show();
    });

    var audio = new Audio('audio/new-ticket.mp3');
    //audio.src = 'audio/new-ticket.mp3';
    audio.play();
});

function cleanDasboard() {
    $('#lblTicket1').text('Sin Tickes');
    $('#lblEscritorio1').hide();
    $('#tdLast3').hide();
    $('#tr2').hide();
    $('#tr3').hide();
}

//$(document).ready(cleanDasboard());