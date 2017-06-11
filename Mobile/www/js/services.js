angular.module('app.services', [])

  .factory('graficoGeralFactory', ['estatisticaService',function(estatisticaService){

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
        values:[10],
        //values: [estatisticaService.estatistica.graficoGeral.totalAcertos],
        backgroundColor: "#5e9732",
      }, {
        text: "Erros",
        values:[20],
        //values: [estatisticaService.estatistica.graficoGeral.totalAcertos],
        backgroundColor: "#aa5039"
      }]
    };

    return grafico;
  }])

  .factory('graficoUniversidadeFactory', ['estatisticaService',function(){

    var dados = [];

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

   //var universidades = estatisticaService.estatistica.graficoUniversidades;

    var universidades = [{
      questoesRealizadas:"30",
      universidade:"fuvest"
    },
      {
        questoesRealizadas:"20",
        universidade:"ufrgs"
      },
      {
        questoesRealizadas: "15",
        universidade: "puc"
      }
    ]


    dados = [{
      text: universidades[0].universidade,
      values: [universidades[0].questoesRealizadas],
      backgroundColor: corAleatoria(),
    }]

    for(var I=1;I<universidades.length;I++){
      var aux =
      {
        text: universidades[I].universidade,
        values: [universidades[I].questoesRealizadas],
        backgroundColor: corAleatoria(),
      }

      dados.push(aux);

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
      series: dados
    };

    //console.log(grafico.series[0].values[0]);
    return grafico;
  }])


  .factory('graficoDataFactory', ['estatisticaService',function(){

    var result = [];

    var questoes = [{
      acerto: "15",
      quantasQuestoes: "30"
    },{
      acerto: "5",
      quantasQuestoes: "10"
    },{
      acerto: "20",
      quantasQuestoes: "20"
    },
    ];

    //var questoes = estatisticaService.estatistica.graficoTempo;

    for(var I=0;I<questoes.length;I++){
      var acerto = questoes[I].acerto;   //10
      var qQuestoes = questoes[I].quantasQuestoes;   //30
      var aux = (100/qQuestoes)*acerto;

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

  .service('loginService',['$http',function($http){

    //função para logar o usuario.
    this.login = function(email,senha,callback){

      var urlServer = '45.76.8.32:80';

      //post com email e senha.
      $http.post('http://'+urlServer+'/usuario/login',{nome:email,senha:senha})
      //caso sucesso.


        .success(function(res) {

          if(res.token) {
            //define os dados do usuario que serao armazenados no sistema.
            var usuario = {email: email, senha: senha, token: res.token}

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

  .service('cadastroService',['$http',function($http){

          var urlServer = '45.76.8.32:80';

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








