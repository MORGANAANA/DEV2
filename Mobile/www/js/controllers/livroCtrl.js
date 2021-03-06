angular.module('livroCtrl', [])

  .controller ('livroCtrl', ['$scope', '$http','livroService','config',
    function ($scope, $http,livroService,config) {





      var urlServer = config.url;

      $scope.service = livroService;


      // ao executar buscaLivro(idDoLivro) preenche esta variavel com o livro.
      $scope.livro = "";

      // ao executar buscaListaLivros()  preenche esta varivel com a lista de livros.
      $scope.listaLivros = "";

      // ao executar adicionaLivro()  ele adiciona o livro presente nesta variavel.
      $scope.livroAAdicionar = "x";

      //$scope.poema = function(){
      //	  alert("A distinção entre presente, passado e futuro é apenas uma ilusao, teimosamente persistente!");
      //}


      $scope.setUniversidade = (universidade) =>{
        livroService.universidade = universidade;
      }

      // busca o livro referente ao id no banco e preenche a variavel indicada.
      $scope.buscaLivro = function(id){
        var url = 'http://'+urlServer+'/livro/id/'+id;
        $http.get(url)
          .success(function(data){
            console.log('Livro buscado com sucesso');
            $scope.livro = data;
            livroService.setLivro(data);
          })

          .error(function(data){
            console.log('nao funcionou');
            $scope.livro = data;
          })
      };

      $scope.buscaLivroUniversidade = function(livro){
        //var url = 'http://'+urlServer+'/livro/id/'+id;
        var url = 'http://'+urlServer+'/questoes/livro/'+livro;
        $http.get(url)
          .success(function(data){
            console.log('Universidades por Livro buscado com sucesso');
            $scope.livro = data;
            livroService.universidadeLivros = data;
          })

          .error(function(data){
            console.log('nao funcionou');
            $scope.livro = data;
          })
      };

      // busca a lista contendo todos livros e preenche a variavel indicada.
      $scope.buscaListaLivros = function(){

        var url = 'http://'+urlServer+'/livros';

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

        var url = 'http://'+urlServer+'/livros/universidade/'+universidade;
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

        var url = 'http://'+urlServer+'/livro/id/'+id;

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

          var url = 'http://'+urlServer+'/livro';

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
