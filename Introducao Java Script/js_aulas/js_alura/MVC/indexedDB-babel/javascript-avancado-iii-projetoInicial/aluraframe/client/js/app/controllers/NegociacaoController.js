'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        this._ordemAtual = '';
        this._init();
    }

    _createClass(NegociacaoController, [{
        key: '_init',
        value: function _init() {
            var _this = this;

            ConnectionFactory.getConnection().then(function (conc) {
                return new NegociacaoDao(conc);
            }).then(function (dao) {
                return dao.listaDados();
            }).then(function (negs) {
                return negs.forEach(function (neg) {
                    return _this._listaNegociacoes.adiciona(neg);
                });
            }).catch(function (erro) {
                console.log(erro);
                _this._mensagem.texto = erro;
            });

            setInterval(function () {
                return _this._importaNegociacoes();
            }, 3000);
        }
    }, {
        key: 'adiciona',
        value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();

            ConnectionFactory.getConnection().then(function (conc) {
                var negociacao = _this2._criaNegociacao();

                new NegociacaoDao(conc).adiciona(negociacao).then(function () {
                    _this2._listaNegociacoes.adiciona(negociacao);
                    _this2._mensagem.texto = 'Negociação adicionada com sucesso';
                    _this2._limpaFormulario();
                });
            }).catch(function (erro) {
                return _this2._mensagem.texto = erro;
            });
        }
    }, {
        key: '_importaNegociacoes',
        value: function _importaNegociacoes() {
            var _this3 = this;

            var service = new NegociacaoService();
            service.obterNegociacoes().then(function (negociacoes) {
                return negociacoes.filter(function (negociacao) {
                    return !_this3._listaNegociacoes.negociacoes.some(function (negociacaoExistente) {
                        return (// some (verifica se dentro do array tenho alguma coisa igual a uma query, se tiver retorna true) como queremos adicionar o que não existe por isso o !
                            JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)
                        );
                    });
                });
            }).then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    _this3._listaNegociacoes.adiciona(negociacao);
                    //this._mensagem.texto = 'Negociações do período importadas'   
                });
            }).catch(function (erro) {
                return _this3._mensagem.texto = erro;
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            var _this4 = this;

            ConnectionFactory.getConnection().then(function (conc) {
                return new NegociacaoDao(conc);
            }).then(function (dao) {
                return dao.apagaDados();
            }).then(function (msg) {
                _this4._mensagem.texto = msg;
                _this4._listaNegociacoes.esvazia();
            });
        }
    }, {
        key: '_criaNegociacao',
        value: function _criaNegociacao() {

            return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: '_limpaFormulario',
        value: function _limpaFormulario() {

            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;
            this._inputData.focus();
        }
    }, {
        key: 'ordena',
        value: function ordena(coluna) {

            if (this._ordemAtual == coluna) {
                this._listaNegociacoes.inverteOrdem();
            } else {
                this._listaNegociacoes.ordena(function (p, s) {
                    return p[coluna] - s[coluna];
                });
            }
            this._ordemAtual = coluna;
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map