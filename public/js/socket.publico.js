var socket = io();

var lblTickets = [];
var lblEscritorios = [];
const maxLBL = 4;


for (var i = 1; i <= maxLBL; i++) {
    lblTickets.push($('#lblTicket' + i));
    lblEscritorios.push($('#lblEscritorio' + i));
}


socket.on('ticketActual', function(data) {
    actualizarHTML(data.ultimos4);
});

socket.on('ultimos4', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizarHTML(data.ultimos4);
});


function actualizarHTML(ultimos4) {
    for (var i = 0; i <= ultimos4.length - 1; i++) {
        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}