angular.module('app.services', [])

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

  .service('estatisticaService',[function(){

    this.estatistica = "";

  }])

  .service('loginService',['$http','config',function($http,config){

    //função para logar o usuario.
    this.login = function(email,senha,callback){

      var urlServer = config.url;

      //post com email e senha.
      $http.post('http://'+urlServer+'/usuario/login',{nome:email,senha:senha})
      //caso sucesso.


        .success(function(res) {

          if(res.token) {
            //define os dados do usuario que serao armazenados no sistema.
            var usuario = email;

            //guarda no sistema o usuario logado.
            window.localStorage.setItem('usuarioLogado', usuario);

            //seta como padrao para as requisições o token de autorização.
            $http.defaults.headers.common.Authorization = res.token;

            //caso haja um token na requisição callback retorna positivo se nao negativo.
            callback(true);
          }else{

            callback(false);
          }

        })

        .error(function(){
          console.log("erro ao logar o usuario");
        })

    }


    this.logout = function(){

      window.localStorage.clear();

      $http.defaults.headers.common.Authorization = '';

    }

  }])

  .service('cadastroService',['$http','config',function($http,config){

          var urlServer = config.url;

          this.cadastrar = function(usuario,senha,telefone){

               var cont = {
                  'nome':usuario,
                  'senha':senha,
                  'telefone':telefone
              }

                $http.post('http://'+urlServer+'/usuario/registro',cont)

                .success(function(){
                   console.log("Usuario cadastrado");
                  })

                .error(function(){
                    console.log("Erro ao cadastrar usuario");
                  })



                }

        }])

  .service('questaoService',[function(){

    this.listaQuestoes = "";

    this.listaUniversidades = "";

    this.setListaUniversidades = function(list){
      this.listaUniversidades = list;
    }

    this.setListaQuestoes = function(list){
      this.listaQuestoes = list;
    }

  }])

  .service('simuladoService',[function(){

    this.respostasSimulado = [];

    this.universidade = "";

    this.simulado ="";

    this.resultado = "";

    this.setResultado = function(res){
      this.resultado = res;
    }

    this.getResultado = function(){
      return this.resultado;
    }

  }])

  .service('livroService', [function(){


    this.livro = "";
    this.listaLivros = "";



    this.setLivro = function(liv){
      this.livro = liv;
    }

    this.setListaLivros = function(list){
      this.listaLivros = list;
    }



  }])

  .service('criarTopicoService', [function(){

    this.topico = "";
    this.listaTopico = "";

    this.setTopico = function(top){
      this.topico = top;
    }
  }])

  .service('comentarTopicoService', [function () {
      this.comentar = "";

      this.setComentar = function (com) {
        this.comentar = com;
      }
  }])








