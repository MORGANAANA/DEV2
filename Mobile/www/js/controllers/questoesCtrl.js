angular.module('questoesCtrl', [])

// controle referente as questoes
  .controller('questoesCtrl', ['$scope', '$http','questaoService','config',
    function ($scope, $http, questaoService,config) {




      var urlServer = config.url;

      $scope.service = questaoService;

      // variavel que contem a questao a ser adicionada no banco com o metodo adicionaQuestao.
      $scope.questaoAAdicionar = "x";

      // ao executar a funcao listQuestoes() preenche a variavel com todas as questoes.
      $scope.listaQuestoes = "";

      // ao executar buscaQuestao(idDaQuestao) preenche a variavel com a questao referente ao id selecionado
      $scope.questao = "";


      // metodo que adiciona a questao na variavel questaoAAdicionar no banco.
      $scope.adicionaQuestao = function(){
        if($scope.livroAAdicionar === "x"){
          console.log("O objeto livroAAdicionar nao esta preenchido.");
        }else{

          var url = 'http://'+urlServer+'/questao';

          $http.post(url,$scope.questaoAAdicionar)

            .success(function(){
              console.log("A questao a ser adicionada foi incluida com sucesso.");
            })

            .error(function(){
              console.log("Erro ao adicionar a questao no banco");
            })
        }
      };

      // funcao que preenche a variavel listaQuestoes com todas as questoes presentes no banco.
      $scope.buscaListaQuestoes = function(){

        var url = 'http://'+urlServer+'/questoes';

        $http.get(url)

          .success(function(data){
            $scope.listaQuestoes = data;
            questaoService.setListaQuestoes(data);
            console.log("questoes listadas com sucesso");

          })

          .error(function(data){
            $scope.listaQuestoes = data;
            console.log("Erro ao listar todas as questoes do banco");
          })

      };

      // busca no banco e adiciona na variavel questao a questao referente ao id passado por parametro.
      $scope.buscaQuestao = function(id){

        var url = 'http://'+urlServer+'/questao/id/'+id;

        $http.get(url)
          .success(function(data){
            $scope.questao = data;
            console.log("questao buscada com sucesso");
          })

          .error(function(data){
            $scope.questao = data;
            console.log("Erro ao buscar questao");
          })

      };

      $scope.buscaResposta = function(id){

        var url = 'http://'+urlServer+'/Resposta/id/'+id;

        $http.get(url)
          .success(function(data){
            $scope.resposta = data;
            console.log("resposta buscada com sucesso");
          })

          .error(function(data){
            $scope.resposta = data;
            console.log("Erro ao buscar questao");
          })

      };


      // deleta a questao referente ao id enviado.
      $scope.deletaQuestao = function(id){

        var url = 'http://'+urlServer+'/questao/id/'+id;

        $http.delete(url)

          .success(function(){
            console.log("questao deletada com sucesso");
          })

          .error(function(){
            console.log("erro ao deletar questao");
          })

      }

      // busca a lista de todas universidades presentes no banco e numero de questoes.
      $scope.buscaListaUniversidades = function(){
        var url = 'http://'+urlServer+'/universidades';

        $http.get(url)

          .success(function(data){
            console.log("universidades listadas com sucesso");
            questaoService.setListaUniversidades(data);
          })

          .error(function(){
            console.log("erro ao listar universidades");
          })
      }





    }])
