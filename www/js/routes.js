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
    url: '/listaLivros',
    templateUrl: 'templates/listaDeLivros.html',
    controller: 'listaDeLivrosCtrl'
  })

    .state('horaEstrela', {
      url: '/livroSelecionado',
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

  .state('questEs', {
    url: '/questoes_ufrgs',
    templateUrl: 'templates/questEs.html',
    controller: 'questEsCtrl'
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

$urlRouterProvider.otherwise('/livroSelecionado')



});
