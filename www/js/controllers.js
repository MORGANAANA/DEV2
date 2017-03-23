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

//WORK WORK WORK WORK WORK
.controller ('aHoraDaEstrelaCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {
  var infoLivro =[
  {
    nomeAutorx:"Clarisse Lispector"
    dataPublicacao:"1977"
    genero:"Romance"
    universisadesNoAno:"UFRGS,Ufpel"
    enredo:"DGFDSJFGDSKHFKJDSHFDSFDSFDSFDSFDSFDSF"
  }
 ]
  $scope.pefgaIfoLivro = infoLivro;
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

.controller('questEs2Ctrl', ['$scope', '$stateParams',
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
