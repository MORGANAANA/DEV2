angular.module('loginCtrl', [])

  .controller('loginCtrl', ['$scope','loginService','$location',
    function ($scope,loginService,$location) {

      $scope.email = "";

      $scope.senha = "";

      $scope.login = function(){
        loginService.login($scope.email,$scope.senha,function(result){
          if(result == true){
            $location.path('inicial');
          }else{
            $location.path('login');
            console.log("Erro ao logar");
          }
        })
      }

      $scope.logout = function(){
        loginService.logout();
      }


    }])
