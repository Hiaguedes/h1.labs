const postsControlador = require('./posts-controlador');
const { MiddlewareAuth } = require('../usuarios');

module.exports = app => {
  app
    .route('/post')
    .get(postsControlador.lista)
    .post(
      MiddlewareAuth.bearer,
      postsControlador.adiciona);
};
