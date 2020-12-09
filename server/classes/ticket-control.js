const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}



class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [{}];
        this.error = 'No hay más tickets';
        let data = require('../data/data.json');

        //Reiniciar colas al empezar nuevo día
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }

    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [{}];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    getUltimoTicket() {
        return this.ultimo;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return this.error;
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //Elimina el primer elemento, el de la posición 0

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket); //Te lo agrega a la posición 0 y desplaza los demás

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borra el último elemento
        }

        console.log(this.ultimos4);
        this.grabarArchivo();

        return atenderTicket;
    }

    siguienteTicket() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }


}







module.exports = {
    TicketControl
}