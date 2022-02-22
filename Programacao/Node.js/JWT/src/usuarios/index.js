module.exports = {
  rotas: require('./usuarios-rotas'),
  controlador: require('./usuarios-controlador'),
  modelo: require('./usuarios-modelo'),
  AuthStrategies: require('./estrategias.auth'),
  MiddlewareAuth: require('./middleware.auth')
}