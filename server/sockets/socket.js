const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const tickerControl = new TicketControl();


io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        callback(tickerControl.siguienteTicket());
    })

    client.emit('ticketActual', {
        actual: tickerControl.getUltimoTicket(),
        ultimos4: tickerControl.getUltimos4()
    });

    client.on('atenderTicker', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = tickerControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //Notificar cambios en los últimos 4
        client.broadcast.emit('ultimos4', { ultimos4: tickerControl.getUltimos4() });
    });
});