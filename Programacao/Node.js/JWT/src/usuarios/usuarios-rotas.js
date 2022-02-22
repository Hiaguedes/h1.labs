const usuariosControlador = require('./usuarios-controlador');
const passport = require('passport')
const MiddlewareAuth = require('./middleware.auth')

module.exports = app => {

  app.route('/usuario/login')
      .post(MiddlewareAuth.local, 
       usuariosControlador.login);


  app
    .route('/usuario')
    .post(usuariosControlador.adiciona)
    .get(usuariosControlador.lista);

  app
  .route('/usuario/:id')
  .delete(MiddlewareAuth.bearer, usuariosControlador.deleta);
};
