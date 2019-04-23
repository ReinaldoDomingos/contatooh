var http = require('http');
var app = require('./config/express')();

//http.createServer('Aqui entrs o Express com seus middlewares')
//        .listen(3000, '127.0.0.1');

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express Server escutando na porta " +
            app.get('port'));
});
        