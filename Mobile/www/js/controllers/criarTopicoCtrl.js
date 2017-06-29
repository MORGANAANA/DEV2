angular.module('criarTopicoCtrl', [])

  .controller('criarTopicoCtrl', ['$scope', '$http', 'livroService','criarTopicoService','config', '$location',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

    function ($scope, $http, livroService, criarTopicoService,config, $location) {
      var urlServer = config.url;

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
        if($scope.titulo.length > 10 || $scope.descricao.length > 20){
          $location.path('/menu/listaDeTopicos');
          console.log(window.localStorage.getItem('usuarioLogado').nome);
          $http.post(url, conteudo)
            .success(function () {
              console.log("Topico criado com sucesso");
            })
            .error(function () {
              console.log("Erro ao criar o topico");
            })
        }else{
          alert("O campo titulo deve ter no minimo 10 letras\nO campo descrição deve ter mais de 20 caracters")
          $location.path('/menu/criarTopico');
        }
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

      $scope.listaComent = function (){
        var url = 'http://' + urlServer + '/topico/comentario/'
        $http.get(url)

          .success(function (data) {
            $scope.comentar = data;
            criarTopicoService.listaComentario = data;

            console.log("Comentario Pego com sucesso")

          })
          .error(function () {
            console.log("Erro ao listar")
          })
      }


      //comentar topico
      $scope.comentarTopico = function (contexto, id) {
        var comentar = $scope.comentar;
        var url = 'http://' + urlServer + '/topico/id'+ id +'/comentario/';
        $http.post(url, comentar)
          .success(function (data) {
            console.log("Comentado com sucesso");
            $scope.comentar = data;
            $scope.listaComent();
          })
          .error(function (data) {
            console.log("Erro ao fazer o comentario");
            $scope.comentar = data;
          })
      }


    }])
