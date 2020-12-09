//Comando para establecer la conexión

var socket = io();

let labelTicket = $('#lblNuevoTicket');



socket.on('connect', () => {
    console.log('Conectado al servidor');

});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});

socket.on('ticketActual', (ticket) => {
    labelTicket.text(`Ticket ${ticket.actual}`);
});




$('button').on('click', () => {
    socket.emit('siguienteTicket', null, function(ticketActual) {
        console.log(ticketActual);
        labelTicket.text(ticketActual);
    });
})