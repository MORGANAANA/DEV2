angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider



      .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',

  })

  .state('cadastro', {
    url: '/cadastro',
    templateUrl: 'templates/cadastro.html',

  })

  .state('inicial', {
    url: '/inicial',
    templateUrl: 'templates/inicial.html',

  })

  .state('listaDeLivros', {
    url: '/listaDeLivros',
    templateUrl: 'templates/listaDeLivros.html',

  })


    .state('horaEstrela', {
      url: '/horaEstrela',
      templateUrl: 'templates/horaEstrela.html',

    })

  .state('universidades', {
    url: '/universidades',
    templateUrl: 'templates/universidades.html',

  })

  .state('comentarForum', {
    url: '/forum',
    templateUrl: 'templates/comentarForum.html',

  })

  .state('marcarEncontro', {
    url: '/Marcarencontros',
    templateUrl: 'templates/marcarEncontro.html',

  })

  .state('questoes', {
    url: '/questoes',
    templateUrl: 'templates/questoes.html',

  })

  .state('encontroLocal', {
    url: '/detalhes-encontro',
    templateUrl: 'templates/encontroLocal.html',

  })

  .state('simulado', {
    url: '/simulado',
    templateUrl: 'templates/simulado.html',

  })


  .state('criarTopico', {
    url: '/criarTopico',
    templateUrl: 'templates/criarTopico.html',


  })

  .state('gerarSimulado', {
  url: '/gerarSimulado',
  templateUrl: 'templates/gerarSimulado.html',

})

.state('listaDeTopicos', {
    url: '/listaDeTopicos',
    templateUrl: 'templates/listaDeTopicos.html',

  })
    .state('estatisticas', {
      url: '/estatisticas',
      templateUrl: 'templates/estatisticas.html',

    })



 $urlRouterProvider.otherwise('/forum')



});
