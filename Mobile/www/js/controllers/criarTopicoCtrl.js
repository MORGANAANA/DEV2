angular.module('criarTopicoCtrl', [])

  .controller('criarTopicoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, TopicoService) {
      var urlServer = "localhost:7001";

      $scope.criarTopico = function (titulo, contexto, id) {
        var url = 'http://' + urlServer + '/topico/id/' + id;
        $http.get(url)
          .success(function (data) {
            console.log("Topico criado com sucesso");
            $scope.topico = data;
            TopicoService.setTopico(data);
          })
          .error(function () {
            console.log("Erro ao criar o topico");
            $scope.topico = data;
          })
      }
      $scope.deletarTopico = function (id) {

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
