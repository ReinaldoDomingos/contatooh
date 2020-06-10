var express = require('express');
var home = require('../app/routes/home.js.old');
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function () {
    var app = express();

    //Variavel de ambiente
    app.set('port', 3000);

    //middleware
    app.use(express.static('./public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');
    // home(app);
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());
    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
};