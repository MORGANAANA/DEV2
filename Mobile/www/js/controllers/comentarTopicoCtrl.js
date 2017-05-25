/**
 * Created by Adriel on 23/05/2017.
 */
angular.module('comentarTopicoCtrl', [])

.controller('comentarTopicoCtrl', ['$scope', '$stateParams',
  function ($scope, $stateParams, comentarTopicoService) {
    var urlServer = "45.76.8.32:80";

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
  }

]);
