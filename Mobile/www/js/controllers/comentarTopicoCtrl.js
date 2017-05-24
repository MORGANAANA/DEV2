/**
 * Created by Adriel on 23/05/2017.
 */
angular.module('comentarTopicoCtrl', [])

.controller('criarTopicoCtrl', ['$scope', '$stateParams',
  function ($scope, $stateParams, ComentarTopicoService) {
    var urlServer = "localhost:7001";

    $scope.comentarTopico = function (contexto, id) {
      var url = 'http://' + urlServer + '/comentario/id/' + id;
      $http.post(url)
        .success(function (data) {
          console.log("Comentado com sucesso");
          $scope.comentar = data;
          ComentarTopicoService.setComentar(data);
        })
        .error(function (data) {
          console.log("Erro ao fazer o comentario");
          $scope.comentar = data;
        })
    }
  }

]);
