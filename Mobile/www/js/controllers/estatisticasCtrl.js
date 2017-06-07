angular.module('estatisticasCtrl',['zingchart-angularjs'])

.controller('estatisticasCtrl',['$scope','estatisticaService','graficoGeralFactory','graficoUniversidadeFactory','graficoDataFactory',
  function ($scope,estatisticaService,graficoGeralFactory,graficoUniversidadeFactory,graficoDataFactory) {

    var urlServer = '45.76.8.32:80';

    $scope.buscaEstatisticas = function(usuario){

      var url = "http://"+urlServer+"/estatistica/usuario/"+usuario;

      $http.get(url)

        .success(function(res){
          estatisticaService.estatistica = res;
          console.log("Estatisticas buscadas com sucesso");
        })

        .error(function(){
          console.log("Erro ao buscar estatisticas");
        })

    }


    $scope.graficoGeral  = graficoGeralFactory;
    $scope.graficoUniversidade = graficoUniversidadeFactory;
    $scope.graficoData = graficoDataFactory;



  }])


