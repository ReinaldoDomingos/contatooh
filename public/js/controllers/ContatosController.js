angular.module('contatooh').controller('ContatosController',
    function ($scope, Contato) {
        $scope.contatos = [];
        $scope.filtro = '';
        $scope.mensagem = {texto: ''};
        $scope.total = 0;

        $scope.incrementa = function () {
            $scope.total++;
        };

        // $http.get('/contatos') //até versão 1.4.3 AngularJS
        //     .success(function (data) {
        //         $scope.contatos = data;
        //     })
        //     .error(function (statusText) {
        //         console.log("Não foi possível obter a lista de contatos");
        //         console.log(statusText);
        //     });

        // $http({ //Versões superiores angular
        //     method: 'GET',
        //     url: '/contatos'
        // }).then(function (response) {
        //     $scope.contatos = response.data;
        // }, function (error) {
        //     console.log("Não foi possível obter a lista de contatos");
        //     console.log(error);
        // });

//            var promise = Contato.query().$promise;
//            promise // Requisição padrão REST
//                    .then(function (contatos) {
//                        $scope.contatos = contatos;
//                    })
//                    .catch(function (erro) {
//                        console.log("Não foi possível obter a lista de contatos");
//                        console.log(erro);
//                    });
        function buscaContatos() {
            Contato.query(
                function (contatos) {
                    $scope.contatos = contatos;
                    $scope.mensagem = {};
                },
                function (erro) {
                    console.log(erro);
                    $scope.mensagem = {
                        texto: "Não foi possível obter a lista de contatos"
                    };
                }
            );
        }

        buscaContatos();
        $scope.remove = function (contato) {
            Contato.delete({id: contato._id},
                buscaContatos,
                function (erro) {
                    $scope.mensagem = {
                        texto: "Não foi possivel remover o contato"
                    };
                    console.log("Não foi possivel remover o contato")
                    console.log(erro);
                }
            );
        }
    });