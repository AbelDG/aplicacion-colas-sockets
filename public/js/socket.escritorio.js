var socket = io();

var searchParams = new URLSearchParams(window.location.search); //Encuentra los parametros pasados por la URL

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');


$('h1').text('Escritorio ' + escritorio);


$('button').on('click', function() {
    socket.emit('atenderTicker', { escritorio: escritorio }, function(ticket) {
        if (ticket.numero) {
            label.text('ticket ' + ticket.numero);
        } else {
            $('h4').text(ticket);
            alert(ticket);
            window.location = 'index.html';
        }
    });
})