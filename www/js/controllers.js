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

.controller('listaDeLivrosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

function ($scope, $stateParams) {


}])


.controller ('livroCtrl', ['$scope', '$http',
function ($scope, $http) {

  $scope.livro = "";

  var url = 'ttp://localhost:7002/livro';

  $scope.pegaLivro = function(){
    $http.post(url)
      .success(function(data){
        console.log('funcionou');
        $scope.livro = data;
      })

      .error(function(data){
        console.log('funcionou');
        $scope.livro = data;
      })
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

.controller('questEsCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


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
