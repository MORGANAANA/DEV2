angular.module('app.factorys', [])

  .factory('graficoGeralFactory', ['estatisticaService',function(estatisticaService){

    var nAcertos = estatisticaService.estatistica.graficoGeral.nAcertoTotais;
    var nQuestoes = estatisticaService.estatistica.graficoGeral.nQuestoesTotais;

    var nErros = nQuestoes - nAcertos;

    var grafico =  {
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
        //values:[10],
        values: [nAcertos],
        backgroundColor: "#5e9732",
      }, {
        text: "Erros",
        //values:[20],
        values: [nErros],
        backgroundColor: "#aa5039"
      }]
    };

    return grafico;
  }])

  .factory('graficoUniversidadeFactory', ['estatisticaService',function(estatisticaService){

    var mdados = [];

    var aleatorio = function (inferior,superior){
      numPossibilidades = superior - inferior
      aleat = Math.random() * numPossibilidades
      aleat = Math.floor(aleat)
      return parseInt(inferior) + aleat
    }

    var corAleatoria = function(){
      var hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
      var cor_aleatoria = "#";
      for (i=0;i<6;i++){
        var posarray = aleatorio(0,hexadecimal.length);
        cor_aleatoria += hexadecimal[posarray];
      }
      return cor_aleatoria;
    }

    var universidades = estatisticaService.estatistica.graficoUniversidade;

    /*var universidades = [{
     nQuestoes:"30",
     _id:"fuvest"
     },
     {
     nQuestoes:"20",
     _id:"ufrgs"
     },
     {
     nQuestoes: "15",
     _id: "puc"
     }
     ]
     */
    for(var I=0;I<universidades.length;I++){
      var aux =
        {
          text: universidades[I]._id,
          values: [universidades[I].nQuestoes],
          backgroundColor: corAleatoria(),
        }

      mdados.push(aux);

    }

    var grafico = {
      globals: {
        shadow: false,
        fontFamily: "Comic Sans",
        fontWeight: "100"
      },

      type: "pie",
      backgroundColor: "#fff",

      legend: {
        layout: "x4",
        position: "0%",
        borderColor: "transparent",
        marker: {
          borderRadius: 10,
          borderColor: "transparent"
        }
      },

      plot: {
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
      series: mdados
    };

    //console.log(grafico.series[0].values[0]);
    return grafico;
  }])


  .factory('graficoDataFactory', ['estatisticaService',function(estatisticaService){

    var result = [];
    /*
     var questoes = [{
     nAcerto: "15",
     nQuestoes: "30"
     },{
     nAcerto: "5",
     nQuestoes: "10"
     },{
     nAcerto: "20",
     nQuestoes: "20"
     },
     ];
     */
    var questoes = estatisticaService.estatistica.graficoTempo;

    for(var I=0;I<questoes.length;I++){
      var acerto = questoes[I].nAcerto;   //10
      var qQuestoes = questoes[I].nQuestoes;   //30
      var aux = parseInt((100/qQuestoes)*acerto);

      result.push(aux);
    }


    var grafico = {
      "type": "line",

      legend: {
        layout: "x2",
        position: "0%",
        borderColor: "transparent",
        marker: {
          borderRadius: 10,
          borderColor: "transparent"
        }
      },
      "plot": {
        "value-box": {
          "text": "%node-value"
        }
      },
      "series": [
        {
          "text":"Media de desempenho",
          "values": result
        }
      ]
    }

    return grafico;
  }])

