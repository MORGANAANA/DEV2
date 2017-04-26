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




  // Controle do livro.

  .controller ('livroCtrl', ['$scope', '$http','livroService',
    function ($scope, $http,livroService) {





      var urlServer = "192.168.1.173:7001";

      $scope.service = livroService;

      // ao executar buscaLivro(idDoLivro) preenche esta variavel com o livro.
      $scope.livro = "";

      // ao executar buscaListaLivros()  preenche esta varivel com a lista de livros.
      $scope.listaLivros = "";

      // ao executar adicionaLivro()  ele adiciona o livro presente nesta variavel.
      $scope.livroAAdicionar = "x";

      //$scope.poema = function(){
    //	  alert("A distinção entre presente, passado e futuro é apenas uma ilusao, teimosamente persistente!");
      //}
      
      
      // busca o livro referente ao id no banco e preenche a variavel indicada.
      $scope.buscaLivro = function(id){
        var url = 'http://'+urlServer+'/livro/id/'+id;
        $http.get(url)
          .success(function(data){
            console.log('funcionou');
            $scope.livro = data;
            livroService.setLivro(data);
          })

          .error(function(data){
            console.log('nao funcionou');
            $scope.livro = data;
          })
      };

      // busca a lista contendo todos livros e preenche a variavel indicada.
      $scope.buscaListaLivros = function(){

        var url = 'http://'+urlServer+'/livros';

        $http.get(url)

          .success(function(data){
            console.log("funcionou");
            $scope.listaLivros = data;
            livroService.setListaLivros(data);
          })

          .error(function(data){
            console.log("nao funcionou");
            $scope.listaLivros = data;
          })
      };


      //busca uma lista de livros filtrando por universidade.
      $scope.buscaListaLivrosPorUniversidade = function(universidade){

        var url = 'http://'+urlServer+'/livros/universidade/'+universidade;
        var cont = [];

        $http.get(url)

          .success(function(data){
            console.log("funcionou");

            for(I=0;I<data.length;I++){
              cont.push(data[I].livro);
            }

            livroService.setListaLivros(cont);
          })

          .error(function(){
            console.log("nao funcionou");
          })

      };


      // deleta o livro referente ao id passado por parametro
      $scope.deletaLivro = function(id){

        var url = 'http://'+urlServer+'/livro/id/'+id;

        $http.delete(url)

          .success(function(){
            console.log("Livro deletado com sucesso");

          })

          .error(function(){
            console.log("Erro ao deletar livro");
          })
      };


      // função que adiciona livro no banco, adiciona o livro presente na variavel livroAAdicionar.
      $scope.adicionaLivro = function(){

        if($scope.livroAAdicionar === "x"){
          console.log("O objeto livroAAdicionar nao esta preenchido");
        }else{

          var url = 'http://'+urlServer+'/livro';

          $http.post(url,$scope.livroAAdicionar)

            .success(function(){
              console.log("livro adicionado com sucesso");
            })

            .error(function(){
              console.log("erro ao adicionar livro no banco");
            })
        }
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

  // controle referente as questoes
  .controller('questoesCtrl', ['$scope', '$http','questaoService',
    function ($scope, $http, questaoService) {




      var urlServer = "192.168.1.173:7001";

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


  .controller('encontroLocalCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('simuladoCtrl', ['$scope', '$http','simuladoService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope,$http,simuladoService) {

      var urlServer = "192.168.1.173:7001";

      $scope.showSelectValue = function(mySelect) {
          $scope.universidade = mySelect;
          console.log(mySelect);
      }

      $scope.universidade = "";

      $scope.nQuestoes = "";

      // $scope.setUniversidade = function(u){
      //   $scope.universidade = u;
      // }

      $scope.setnQuestoes = function(n){
        $scope.nQuestoes = n;
      }

      $scope.service = simuladoService;

      $scope.simuladoResultado = "";

      $scope.setSimuladoResposta = function(idQuestao, alternativa){
    	 
    	  var respostas = {idQuestao:idQuestao,alternativa:alternativa,estado:'na'};
    	  
    	  //console.log("idquestao: "+respostas.idQuestao+"   alternativa escolhida: "+respostas.alternativa);
    	  
    	  // adiciona o valor da nova alternativa.
    		  simuladoService.respostasSimulado.push(respostas);
    		  // verifica se ja nao foi marcada uma opção na mesma questao e exclui a opção marcada anteriormente.
	    	  for(var I=simuladoService.respostasSimulado.length -1;I>=0;I--){
	    		  if(simuladoService.respostasSimulado[I].idQuestao == respostas.idQuestao && simuladoService.respostasSimulado[I].alternativa != respostas.alternativa ){
	    			  simuladoService.respostasSimulado.splice(I,1);
	    			  //console.log("entrou");
	    			  break;
	    		  }
	    	  }
    	  
    	  
    	  
    	 
    	  
    	  //var stri = angular.toJson(simuladoService.respostasSimulado);
    	  
    	  //console.log("         tudo: "+stri);
    	  
      }
      
      $scope.verificarRespostas = function(){
    	  var respostaUsuario = simuladoService.respostasSimulado;
    	  var questoes = simuladoService.simulado;
    	  var nAcerto=0;
    	  var nQuestoes=0;
    	  
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
    	  for(var I=0;I<respostaUsuario.length;I++){
    		  for(var I2=0;I2<questoes.length;I2++){
    			  if(respostaUsuario[I].idQuestao == questoes[I2]._id){
    				  nQuestoes++;
    				  if(respostaUsuario[I].alternativa == questoes[I2].resposta){
    					  respostaUsuario[I].estado = "certo";
    					  nAcerto++;
    				  }else{
    					  respostaUsuario[I].estado = questoes[I2].resposta;
    					  
    				  }
    			  }
    		  }
    	  }
    	  
    	  simuladoService.respostasSimulado = respostaUsuario;
    	  
    	  alert("acertou "+nAcerto+" questoes em "+nQuestoes+" questoes");
    	  
      }
      
      $scope.fazerSimulado = function(){

        var universidade = $scope.universidade;

        console.log(universidade);

        var numeroQuestoes = $scope.nQuestoes;

        $scope.buscarSimulado(universidade,numeroQuestoes);

        console.log("universidade: "+universidade+"   n questoes:  "+numeroQuestoes);

      }

      $scope.enviaResultado = function(){

        var url = 'http://'+urlServer+'/simulado/resultados';

        $http.post(url,$scope.simuladoResultado)

          .success(function(){
            console.log("resultado enviado com sucesso");
          })

          .error(function(){
            console.log("erro ao enviar resultado");
          })

      }

      //função para buscar simulado no banco
      $scope.buscarSimulado = function(universidade, quantidade){
        var url = "http://"+urlServer+"/simulado/universidade/"+universidade+"/quantidade/"+quantidade;

        $http.get(url)
          .success(function(data){
            console.log("Simulado pego com sucesso");
            simuladoService.simulado = data;
          })
          .error(function(){
            console.log("Erro ao buscar simulado");
          })

      }


    }])

  .controller('criarForumCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

    .controller('gerarSimuladoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
