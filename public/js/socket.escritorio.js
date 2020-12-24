// Comando para establecer la comunicación

var socket = io();
var searchParams = new URLSearchParams(window.location.search); // Parametros de la URL

console.log(searchParams);

// Si no existe el escritorio, salimos de la pantalla
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}


var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);
$('h1').text('Escritorio: ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay más tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket: ' + resp.numero);
    });


});

// Contro de conexión
//socket.on('connect', function() {
//    console.log('Conectardo al servidor');
//});
//socket.on('disconnect', function() {
//    console.log('Desconectardo del servidor');
//});