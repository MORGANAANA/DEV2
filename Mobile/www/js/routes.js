angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider



      .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('cadastro', {
    url: '/cadastro',
    templateUrl: 'templates/cadastro.html',
    controller: 'cadastroCtrl'
  })

  .state('inicial', {
    url: '/inicial',
    templateUrl: 'templates/inicial.html',
    controller: 'inicialCtrl'
  })

  .state('listaDeLivros', {
    url: '/listaDeLivros',
    templateUrl: 'templates/listaDeLivros.html',
    controller: 'livroCtrl'
  })

    .state('horaEstrela', {
      url: '/horaEstrela',
      templateUrl: 'templates/horaEstrela.html',
      controller: 'livroCtrl'
    })

  .state('universidades', {
    url: '/universidades',
    templateUrl: 'templates/universidades.html',
    controller: 'universidadesCtrl'
  })

  .state('anLiseDosPersonagens', {
    url: '/forum',
    templateUrl: 'templates/anLiseDosPersonagens.html',
    controller: 'anLiseDosPersonagensCtrl'
  })

  .state('marcarEncontro', {
    url: '/Marcarencontros',
    templateUrl: 'templates/marcarEncontro.html',
    controller: 'marcarEncontroCtrl'
  })

  .state('questoes', {
    url: '/questoes',
    templateUrl: 'templates/questoes.html',
    controller: 'questoesCtrl'
  })

  .state('encontroLocal', {
    url: '/detalhes-encontro',
    templateUrl: 'templates/encontroLocal.html',
    controller: 'encontroLocalCtrl'
  })

  .state('simulado', {
    url: '/simulado',
    templateUrl: 'templates/simulado.html',
    controller: 'simuladoCtrl'
  })

  .state('criarForum', {
    url: '/criar_forum',
    templateUrl: 'templates/criarForum.html',
    controller: 'criarForumCtrl'
  })

  .state('gerarSimulado', {
  url: '/gerarSimulado',
  templateUrl: 'templates/gerarSimulado.html',
  controller: 'gerarSimuladoCtrl'
})

$urlRouterProvider.otherwise('/inicial')



});
