angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider

    .state('menu', {
      url: '/menu',
      abstract: true,
      templateUrl: 'templates/menu.html',

    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
    })

    .state('cadastro', {
      url: '/cadastro',
      templateUrl: 'templates/cadastro.html',
    })

    .state('menu.inicial', {
      url: '/inicial',
      views: {
        'menuContent': {
          templateUrl: 'templates/inicial.html',
        }
      }
    })

    .state('menu.listaDeLivros', {
      url: '/listaDeLivros',
      views: {
        'menuContent': {
          templateUrl: 'templates/listaDeLivros.html',
        }
      }
    })


    .state('menu.horaEstrela', {
      url: '/horaEstrela',
      views: {
        'menuContent': {
          templateUrl: 'templates/horaEstrela.html',
        }
      }
    })

    .state('menu.universidades', {
      url: '/universidades',
      views: {
        'menuContent': {
          templateUrl: 'templates/universidades.html',
        }
      }
    })
    .state('menu.comentarTopico', {
      url: '/comentarTopico',
      views: {
        'menuContent': {
          templateUrl: 'templates/comentarTopico.html',
        }
      }
    })

    .state('menu.marcarEncontro', {
      url: '/Marcarencontros',
      views: {
        'menuContent': {
          templateUrl: 'templates/marcarEncontro.html',
        }
      }
    })

    .state('menu.questoes', {
      url: '/questoes',
      views: {
        'menuContent': {
          templateUrl: 'templates/questoes.html',
        }
      }
    })

    .state('menu.encontroLocal', {
      url: '/detalhes-encontro',
      views: {
        'menuContent': {
          templateUrl: 'templates/encontroLocal.html',
        }
      }
    })

    .state('menu.simulado', {
      url: '/simulado',
      views: {
        'menuContent': {
          templateUrl: 'templates/simulado.html',
        }
      }
    })


    .state('menu.criarTopico', {
      url: '/criarTopico',
      views: {
        'menuContent': {
          templateUrl: 'templates/criarTopico.html',
        }
      }

    })

    .state('menu.gerarSimulado', {
    url: '/gerarSimulado',
      views: {
        'menuContent': {
          templateUrl: 'templates/gerarSimulado.html',
        }
      }
    })

    .state('menu.listaDeTopicos', {
        url: '/listaDeTopicos',
      views: {
        'menuContent': {
          templateUrl: 'templates/listaDeTopicos.html',
        }
      }
    })
    .state('menu.estatisticas', {
      url: '/estatisticas',
      views: {
        'menuContent': {
          templateUrl: 'templates/estatisticas.html',
        }
      }
    })



 $urlRouterProvider.otherwise('login')



});
