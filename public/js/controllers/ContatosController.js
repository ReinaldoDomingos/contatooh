angular.module('contatooh').controller('ContatosController',
    function ($scope, Contato) {
        $scope.contatos = [];
        $scope.filtro = '';
        $scope.mensagem = {texto: ''};
        $scope.total = 0;

        $scope.incrementa = function () {
            $scope.total++;
        };

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