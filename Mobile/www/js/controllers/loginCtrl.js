angular.module('loginCtrl', [])

  .controller('loginCtrl', ['$scope','cadastroService','loginService','$location',
    function ($scope,cadastroService,loginService,$location) {

      $scope.email = "";

      $scope.senha = "";

      $scope.login = function(){
        loginService.login($scope.email,$scope.senha,function(result){
          if(result == true){
            $location.path('/menu/inicial');
          }else{
            $location.path('/login');
            console.log("Erro ao logar");
          }
        })
      }

      $scope.logout = function(){
        loginService.logout();
      }

      $scope.cadastrar = function(){

        var senha = $scope.cp_senha;
        var confirmaSenha = $scope.cp_confirmeSenha;

        if(senha==confirmaSenha){
          cadastroService.cadastrar($scope.cp_email,$scope.cp_senha,$scope.cp_telefone);
          alert("Usuario cadastrado com sucesso, aguarde confirmação de email");
          $location.path('/login');
        }else{
          alert("As senhas nao condizem");
        }
      }

    }])
