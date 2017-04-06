angular.module('app.controllers', [])

  .controller('loginCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


    }])

  .controller('cadastroCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


    }])

  .controller('inicialCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


    }])




  // Controle do livro.

  .controller ('livroCtrl', ['$scope', '$http','livroService',
    function ($scope, $http,livroService) {

      $scope.service = livroService;

      // ao executar buscaLivro(idDoLivro) preenche esta variavel com o livro.
      $scope.livro = "";

      // ao executar buscaListaLivros()  preenche esta varivel com a lista de livros.
      $scope.listaLivros = "";

      // ao executar adicionaLivro()  ele adiciona o livro presente nesta variavel.
      $scope.livroAAdicionar = "x";

      // busca o livro referente ao id no banco e preenche a variavel indicada.
      $scope.buscaLivro = function(id){
        var url = 'http://localhost:7001/livro/'+id;
        $http.get(url)
          .success(function(data){
            console.log('funcionou');
            $scope.livro = data;
            livroService.setLivro(data);
          })

          .error(function(data){
            console.log('nao funcionou');
            $scope.livro = data;
          })
      };

      // busca a lista contendo todos livros e preenche a variavel indicada.
      $scope.buscaListaLivros = function(){

        var url = 'http://localhost:7001/livros';

        $http.get(url)

          .success(function(data){
            console.log("funcionou");
            $scope.listaLivros = data;
            livroService.setListaLivros(data);
          })

          .error(function(data){
            console.log("nao funcionou");
            $scope.listaLivros = data;
          })
      };


      //busca uma lista de livros filtrando por universidade.
      $scope.buscaListaLivrosPorUniversidade = function(universidade){

        var url = 'http://localhost:7001/livros/'+universidade;
        var cont = [];

        $http.get(url)

          .success(function(data){
            console.log("funcionou");

            for(I=0;I<data.length;I++){
              cont.push(data[I].livro);
            }

            livroService.setListaLivros(cont);
          })

          .error(function(){
            console.log("nao funcionou");
          })

      };


      // deleta o livro referente ao id passado por parametro
      $scope.deletaLivro = function(id){

        var url = 'http://localhost:7001/livro/'+id;

        $http.delete(url)

          .success(function(){
            console.log("Livro deletado com sucesso");

          })

          .error(function(){
            console.log("Erro ao deletar livro");
          })
      };


      // função que adiciona livro no banco, adiciona o livro presente na variavel livroAAdicionar.
      $scope.adicionaLivro = function(){

        if($scope.livroAAdicionar === "x"){
          console.log("O objeto livroAAdicionar nao esta preenchido");
        }else{

          var url = 'http://localhost:7001/livro';

          $http.post(url,$scope.livroAAdicionar)

            .success(function(){
              console.log("livro adicionado com sucesso");
            })

            .error(function(){
              console.log("erro ao adicionar livro no banco");
            })
        }
      }



    }])

  .controller('universidadesCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


    }])

  .controller('anLiseDosPersonagensCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


    }])

  .controller('marcarEncontroCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


    }])

  // controle referente as questoes
  .controller('questoesCtrl', ['$scope', '$http','questaoService',
    function ($scope, $http, questaoService) {

      $scope.service = questaoService;

      // variavel que contem a questao a ser adicionada no banco com o metodo adicionaQuestao.
      $scope.questaoAAdicionar = "x";

      // ao executar a funcao listQuestoes() preenche a variavel com todas as questoes.
      $scope.listaQuestoes = "";

      // ao executar buscaQuestao(idDaQuestao) preenche a variavel com a questao referente ao id selecionado
      $scope.questao = "";


      // metodo que adiciona a questao na variavel questaoAAdicionar no banco.
      $scope.adicionaQuestao = function(){
        if($scope.livroAAdicionar === "x"){
          console.log("O objeto livroAAdicionar nao esta preenchido.");
        }else{

          var url = 'http://localhost:7001/questao';

          $http.post(url,$scope.questaoAAdicionar)

            .success(function(){
              console.log("A questao a ser adicionada foi incluida com sucesso.");
            })

            .error(function(){
              console.log("Erro ao adicionar a questao no banco");
            })
        }
      };

      // funcao que preenche a variavel listaQuestoes com todas as questoes presentes no banco.
      $scope.buscaListaQuestoes = function(){

        var url = "http://localhost:7001/questoes";

        $http.get(url)

          .success(function(data){
            $scope.listaQuestoes = data;
            questaoService.setListaQuestoes(data);
            console.log("questoes listadas com sucesso");

          })

          .error(function(data){
            $scope.listaQuestoes = data;
            console.log("Erro ao listar todas as questoes do banco");
          })

      };

      // busca no banco e adiciona na variavel questao a questao referente ao id passado por parametro.
      $scope.buscaQuestao = function(id){

        var url = "http://localhost:7001/questao/"+id;

        $http.get(url)
          .success(function(data){
            $scope.questao = data;
            console.log("questao buscada com sucesso");
          })

          .error(function(data){
            $scope.questao = data;
            console.log("Erro ao buscar questao");
          })

      };


      // deleta a questao referente ao id enviado.
      $scope.deletaQuestao = function(id){

        var url = "http://localhost:7001/questao/"+id;

        $http.delete(url)

          .success(function(){
            console.log("questao deletada com sucesso");
          })

          .error(function(){
            console.log("erro ao deletar questao");
          })

      }

      // busca a lista de todas universidades presentes no banco e numero de questoes.
      $scope.buscaListaUniversidades = function(){
        var url = "http://localhost:7001/universidades";

        $http.get(url)

          .success(function(data){
            console.log("universidades listadas com sucesso");
            questaoService.setListaUniversidades(data);
          })

          .error(function(){
            console.log("erro ao listar universidades");
          })
      }

    }])


  .controller('encontroLocalCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('simuladoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('criarForumCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

