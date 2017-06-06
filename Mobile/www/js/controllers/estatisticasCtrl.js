angular.module('estatisticasCtrl',['zingchart-angularjs'])

.controller('estatisticasCtrl',['$scope','estatisticaService',
  function ($scope) {

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

    var graficoModel = {
      globals: {
        shadow: false,
        fontFamily: "Comic Sans",
        fontWeight: "100"
      },

      type: "pie",
      backgroundColor: "#fff",

      legend: {
        layout: "x2",
        position: "0%",
        borderColor: "transparent",
        marker: {
          borderRadius: 10,
          borderColor: "transparent"
        }
      },

      plot: {
        'selection-mode':"none",
        'selected-marker':"none",
        refAngle: "-90",
        borderWidth: "0px",
        valueBox: {
          placement: "in",
          text: "%npv %",
          fontSize: "15px",
          textAlpha: 1,
        },
        animation:{
          delay:"100000",
          effect:"3",
          method:"2",
          sequence:"1",
        }
      },
      series: [{
        text: "Acertos",
        values: [5],
        backgroundColor: "#5e9732",
      }, {
        text: "Erros",
        values: [10],
        backgroundColor: "#aa5039"
      }]
    };

    $scope.graficoMediaAcertoErros = graficoModel;


  }])


