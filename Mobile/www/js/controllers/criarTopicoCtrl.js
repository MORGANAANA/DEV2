angular.module('criarTopicoCtrl', [])

  .controller('criarTopicoCtrl', ['$scope', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $http) {
      var urlServer = "45.76.8.32:80";

      $scope.criarTopico = function () {

        var url = 'http://' + urlServer + '/topico' ;
        var titulo = $scope.titulo;
        var descricao = $scope.descricao;

        var conteudo = {
          titulo: titulo,
          descricao: descricao
          //usuario:
          //livro

        }


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

    }])
