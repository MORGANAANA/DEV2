angular.module('simuladoCtrl', [])


  .controller('simuladoCtrl', ['$scope', '$http','simuladoService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope,$http,simuladoService) {

      var urlServer = '45.76.8.32:80';

      $scope.showSelectValue = function (mySelect) {
        $scope.universidade = mySelect;
        console.log(mySelect);
      }

      $scope.universidade = "";

      $scope.nQuestoes = "";

      // $scope.setUniversidade = function(u){
      //   $scope.universidade = u;
      // }

      $scope.setnQuestoes = function (n) {
        $scope.nQuestoes = n;
      }

      $scope.service = simuladoService;

      $scope.simuladoResultado = "";

      $scope.setSimuladoResposta = function (idQuestao, alternativa) {

        var respostas = {idQuestao: idQuestao, alternativa: alternativa, estado: 'na'};

        //console.log("idquestao: "+respostas.idQuestao+"   alternativa escolhida: "+respostas.alternativa);

        // adiciona o valor da nova alternativa.
        simuladoService.respostasSimulado.push(respostas);
        // verifica se ja nao foi marcada uma opção na mesma questao e exclui a opção marcada anteriormente.
        for (var I = simuladoService.respostasSimulado.length - 1; I >= 0; I--) {
          if (simuladoService.respostasSimulado[I].idQuestao == respostas.idQuestao && simuladoService.respostasSimulado[I].alternativa != respostas.alternativa) {
            simuladoService.respostasSimulado.splice(I, 1);
            //console.log("entrou");
            break;
          }
        }


        //var stri = angular.toJson(simuladoService.respostasSimulado);

        //console.log("         tudo: "+stri);

      }

      $scope.verificarRespostas = function () {
        var respostaUsuario = simuladoService.respostasSimulado;
        var questoes = simuladoService.simulado;
        var nAcerto = 0;
        var nQuestoes = 0;

        /* //filtra a resposta usuario para manter apenas a ultima alternativa marcada.
         for(var I2=0;I2<respostaUsuario.length;I2++){
         for(var I=0;I<I2;I++){
         if(respostaUsuario[I].idQuestao == respostaUsuario[I2].idQuestao && I2!=I){
         respostaUsuario.splice(I);
         I2--;
         }
         }
         }
         */
        //atualiza o resposta usuario apensa com valores validos.
        //simuladoService.respostasSimulado = respostaUsuario;


        //verifica se o usuario acertou a resposta e marca na variavel estado.
        for (var I = 0; I < respostaUsuario.length; I++) {
          nQuestoes = 0;
          for (var I2 = 0; I2 < questoes.length; I2++) {
            nQuestoes++;
            if (respostaUsuario[I].idQuestao == questoes[I2]._id) {

              if (respostaUsuario[I].alternativa == questoes[I2].resposta) {
                respostaUsuario[I].estado = "certo";
                nAcerto++;
              } else {
                respostaUsuario[I].estado = questoes[I2].resposta;

              }
            }
          }
        }

        simuladoService.respostasSimulado = respostaUsuario;

        var porcentagen = Math.round((100 * nAcerto) / nQuestoes);
        if (porcentagen == 100) {
          alert("Parabens você acertou todas as questões");
        } else if (porcentagen >= 75 && porcentagen < 100) {
          alert("Você esta muito bem!! Parabens, acertou " + porcentagen + "% das questões");
        } else if (porcentagen >= 50 && porcentagen < 75) {
          alert("Você precisa melhorar mais, acertou " + porcentagen + "% das questões");
        } else if (porcentagen >= 25 && porcentagen < 50) {
          alert("Você está mau, estude mais, acertou " + porcentagen + "% das questões")
        } else if (porcentagen > 0 && porcentagen < 25) {
          alert("Você foi péssimo, acertou quase nada, acertou " + porcentagen + "% das questões");
        } else if (porcentagen == 0) {
          alert("Você não acertou nenhuma");
        }
      }

      $scope.fazerSimulado = function () {

        var universidade = $scope.universidade;

        console.log(universidade);

        var numeroQuestoes = $scope.nQuestoes;

        $scope.buscarSimulado(universidade, numeroQuestoes);

        console.log("universidade: " + universidade + "   n questoes:  " + numeroQuestoes);

      }
      //envia resultado do banco para a nalisar.
      $scope.enviaResultado = function (resultado) {

        var url = 'http://' + urlServer + '/simulado/resultados';

        $http.post(url, resultado)

          .success(function () {
            console.log("resultado enviado com sucesso");
          })

          .error(function () {
            console.log("erro ao enviar resultado");
          })

      }

      //função para buscar simulado no banco
      $scope.buscarSimulado = function (universidade, quantidade) {
        var url = "http://" + urlServer + "/simulado/universidade/" + universidade + "/quantidade/" + quantidade;

        $http.get(url)
          .success(function (data) {
            console.log("Simulado pego com sucesso");
            simuladoService.simulado = data;
          })
          .error(function () {
            console.log("Erro ao buscar simulado");
          })

      }
    }])
