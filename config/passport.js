var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');


module.exports = function () {
    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: 'b00f5e218fb0eaccb8d7',
        clientSecret: 'a30d662e6b959c39eda4a700ece81b6497f8765e',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    }, function (accessToken, refreshToken, profile, done) {
        Usuario.findOrCreate(
            {"login": profile.username},
            {"nome": profile.username},
            function (erro, usuario) {
                if (erro) {
                    console.log(erro);
                    return done(erro);
                }
                return done(null, usuario);
            }
        );
    }))

    /* Chamado apenas UMA vez e recebe o usuário do nosso
    banco disponibilizado pelo callback da estratégia de
    autenticação. Realizará a serialização apenas do
    ObjectId do usuário na sessão. */
    passport.serializeUser(function (usuario, done) {
        done(null, usuario._id);
    });

    passport.deserializeUser(function (id, done) {
        Usuario.findById(id).exec()
            .then(function (usuario) {
                done(null, usuario);
            });
    });
}
