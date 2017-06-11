angular.module('estatisticasCtrl',['zingchart-angularjs'])

.controller('graficoCtrl',['$scope','estatisticaService','graficoGeralFactory','graficoUniversidadeFactory','graficoDataFactory',
  function ($scope,estatisticaService,graficoGeralFactory,graficoUniversidadeFactory,graficoDataFactory) {

    $scope.graficoGeral  = graficoGeralFactory;
    $scope.graficoUniversidade = graficoUniversidadeFactory;
    $scope.graficoData = graficoDataFactory;

  }])

.controller('estatisticasCtrl',['$http','$scope',function($http,$scope){

  var urlServer = '45.76.8.32:80';

  $scope.estatisticasUsuario = function(){

    var user = window.localStorage.getItem('usuarioLogado');

    var url = "http://"+urlServer+"/estatistica/usuario/"+user;

    $http.get(url)

      .success(function(data){
        estatisticaService.estatistica = data;
        console.log("Estatisticas buscadas com sucesso");
      })

      .error(function(){
        console.log("Erro ao buscar estatisticas");
      })

  }

}])


