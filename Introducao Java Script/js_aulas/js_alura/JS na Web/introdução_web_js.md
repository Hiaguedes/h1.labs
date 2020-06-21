# Js

Essa parte vai ser sobre o canvas e animações

O problema no código de Herculano está nessa linha:

```js
 setInterval(atualizaTela(), 10);
 ```

Lembre-se mais uma vez que a função setInterval que já vem pronta no JavaScript precisa receber dois parâmetros para funcionar. O primeiro é a função que ela deve chamar e o segundo o intervalo de tempo no qual a função deve ser chamada.

Veja que não foi passada a função como parâmetro, mas o retorno dela. Como assim Flávio? Se você fizer atualizaTela() esta chamando uma função, certo? Mas a função atualizaTela retorna alguma coisa? Ela possui algum return? Não! Sendo assim, para que fique mais claro ainda o motivo disso não funcionar, vamos dividir o código em duas etapas:

```js
var retorno = atualizaTela();
setInterval(retorno, 10);'
```

O código acima faz sentido? Não faz, porque atualizaTela não possui retorno, sendo assim, a variável retorno será undefined e será esse valor passado para o setInterval. Faz sentido setInterval chamar a cada 10 milissegundos algo que é undefined? Não mesmo!

Outro ponto é que queremos que o JavaScript através do setInterval chame a função para nós e não faz sentido nós mesmos chamarmos atualizaTela().

Então, para corrigir, basta fazermos:

```js
// veja que não há mais o ()
 setInterval(atualizaTela, 10);
 ```

A pergunta que lhe faço é. Se não estamos usando o () estamos chamando a função? Não, não estamos. O que fizemos foi passar a função inteira como parâmetro para setInterval que internamente a chamará para nós. Quando queremos passar uma função como parâmetro para outra, precisamos omitir seu ().
