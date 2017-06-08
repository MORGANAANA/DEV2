angular.module('app.services', [])

  .factory('graficoGeralFactory', ['estatisticaService',function(){

    var grafico = graficoModel = {
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

    return grafico;
  }])

  .factory('graficoUniversidadeFactory', ['estatisticaService',function(){

    var grafico = graficoModel = {
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

    return grafico;
  }])


  .factory('graficoDataFactory', ['estatisticaService',function(){

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
          "values": [1,3,4,6,8,6]
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








