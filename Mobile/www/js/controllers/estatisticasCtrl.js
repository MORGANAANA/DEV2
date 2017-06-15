angular.module('estatisticasCtrl',['zingchart-angularjs'])

.controller('graficoCtrl',['$scope','estatisticaService','graficoGeralFactory','graficoUniversidadeFactory','graficoDataFactory',
  function ($scope,estatisticaService,graficoGeralFactory,graficoUniversidadeFactory,graficoDataFactory) {

    $scope.graficoGeral  = graficoGeralFactory;
    $scope.graficoUniversidade = graficoUniversidadeFactory;
    $scope.graficoData = graficoDataFactory;

  }])

.controller('estatisticasCtrl',['$http','$scope','estatisticaService','$location',function($http,$scope,estatisticaService,$location){

  var urlServer = '45.76.8.32:80';

  $scope.estatisticasUsuario = function(){

    var user = window.localStorage.getItem('usuarioLogado');

    var url = "http://"+urlServer+"/simulado/resultados/"+user;

    $http.get(url)
    //estatisticaService.estatistica.graficoGeral.nAcertoTotais
      .success(function(data){
        estatisticaService.estatistica = data;
        console.log("Estatisticas buscadas com sucesso");
       // console.log(data.graficoTempo);
        if(data.graficoTempo[0] != null){
          $location.path("/menu/estatisticas");
        }else{
          alert("Voce nao tem estatisticas para exibir, realize simulados antes");
        }


      })

      .error(function(){
        console.log("Erro ao buscar estatisticas");
      })

  }

}])


