angular.module('criarTopicoCtrl', [])

  .controller('criarTopicoCtrl', ['$scope', '$http', 'livroService','criarTopicoService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

    function ($scope, $http, livroService, criarTopicoService) {
      var urlServer = "45.76.8.32:80";

      $scope.service = criarTopicoService;

      $scope.criarTopico = function () {

        var url = 'http://' + urlServer + '/topico' ;
        var titulo = $scope.titulo;
        var descricao = $scope.descricao;

        var conteudo = {
          titulo: titulo,
          descricao: descricao,
          usuario: window.localStorage.getItem('usuarioLogado').nome,
          livro: livroService.livro.titulo

        }

        console.log(window.localStorage.getItem('usuarioLogado').nome);


        $http.post(url, conteudo)
          .success(function () {
            console.log("Topico criado com sucesso");

            //criarTopicoService.setTopico(data);
          })
          .error(function () {
            console.log("Erro ao criar o topico");

          })
      }
      $scope.deletarTopico = function () {

        var url = 'http://' + urlServer + '/topico/id/' + id;

        $http.delete(url)

          .success(function () {
            console.log("Topico deletado com sucesso");
          })

          .error(function () {
            console.log("erro ao deletar o topico");
          })
      }

      //Listar topico
      $scope.listaTopico = function (){
        var url = 'http://' +urlServer+ '/topicos';
        $http.get(url)

        .success(function (data) {
            $scope.topico = data;
            criarTopicoService.listaTopico = data;

            console.log("Topico Pego com sucesso")

        })
          .error(function () {
            console.log("Erro ao listar")
          })
      }

      //comentar topico
      $scope.comentarTopico = function (contexto, id) {
        var url = 'http://' + urlServer + '/topico/id/:id/comentario/' + id;
        $http.post(url)
          .success(function (data) {
            console.log("Comentado com sucesso");
            $scope.comentar = data;
            comentarTopicoService.setComentar(data);
          })
          .error(function (data) {
            console.log("Erro ao fazer o comentario");
            $scope.comentar = data;
          })
      }


    }])
