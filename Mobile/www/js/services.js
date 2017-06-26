angular.module('app.services', [])


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
            window.localStorage.setItem('usuarioLogadoLiberep', res.token);

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
      window.localStorage.setItem('usuarioLogadoLiberep', '');
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








