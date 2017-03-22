angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('login', {
    url: '/page12',
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

  .state('aHoraDaEstrela', {
    url: '/livroSelecionado',
    templateUrl: 'templates/aHoraDaEstrela.html',
    controller: 'aHoraDaEstrelaCtrl'
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

  .state('questEs2', {
    url: '/questoes2',
    templateUrl: 'templates/questEs2.html',
    controller: 'questEs2Ctrl'
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

$urlRouterProvider.otherwise('/page12')

  

});