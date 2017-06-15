angular.module('loginCtrl', [])

  .controller('loginCtrl', ['$scope','cadastroService','loginService','$location',
    function ($scope,cadastroService,loginService,$location) {

      $scope.email = "";

      $scope.senha = "";

      $scope.login = function(){
        if($scope.email.length < 3 || $scope.senha.length < 3){
          alert("Os campos usuario ou senha devem ter no minimo 4 digitos");
        }
        loginService.login($scope.email,$scope.senha,function(result){
          if(result == true){
            $location.path('/menu/inicial');
          }else{
            $location.path('/login');
            console.log("Erro ao logar");
            alert("Erro ao realizar o login\n campo usuario ou senha incorreto");
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

