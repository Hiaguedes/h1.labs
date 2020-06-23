# Introdução

O javaScript (na web) servepara manipularmos páginas estáticas (que tem o css e o html prontos) e deixar-la mais funcional ou até mais animada.

## Boas práticas

Sempre abrir uma tag `<script>` para começar a escrever seus códigos em js, de preferência no final da página (seja depois do main, depois do body ou até mesmo depois da html) e fazer seu source para uma pasta js dentro dessa tag como em

```html
<script src="js/principal.js"></script>
```

Dessa forma conseguimos separar os mundos html do js e editar o conteúdo da página com uma maior limpeza

Para chamar uma tag de html e começar a editar suas propriedades podemos chamar a `querySelector`, `getElementById` ou `getElementByClassName`, prefira sempre classes e use querySelector (para passar um elemento em css) ou somento o nome com ClassName

## O document

O document é um elemento editável pro java script que contém todas as tags, classes e ids do html e com ele eu consigo manipular a página.

## Validação de formulários

Bem, é bom se previnir contra alguns erros de desenvolvedor, tipo não existe peso e altura negativa e nem alguém que pese 1000 kg e nem ninguém que mede 3 m (ao menos por enquanto que o recorde é 2.67 m) então uma forma de prevenir esses erros é com if e else da seguinte forma

```js
let pesoValido=true;
let alturaValido=true;
var calculo_imc=0;

if(peso <= 0 || peso >= 700){
    pesoValido=false;
}

if(altura<=0.5 || altura >3){
    alturaValido=false;
}

if(alturaValido && pesoValido){
var calculo_imc=peso/(altura*altura);// calculo o imc
paciente.querySelector(".info-imc").textContent=calculo_imc;
} else  if(!alturaValido && !pesoValido){
    paciente.querySelector(".info-imc").textContent='Altura e Peso Inválidos';
} else {
    if(!alturaValido) paciente.querySelector(".info-imc").textContent='Altura Inválida';
    if(!pesoValido) paciente.querySelector(".info-imc").textContent='Peso Inválido';
}

```

Atenção que o query selector só retorno um elemento e para mais elementos?

## Replicando validação

Seria muito chato e infeliz se cada usuário na tabela tivesse que receber um código extremamente igual ao anterior só mudando um pouquinho as variáveis, seria mais interessante fazer um loop onde eu pudesse olhar todas os pacientes de uma vez só. Para selecionar mais de um elemento com a mesma classe eu uso o `querySelectorAll`

## E se eu quero mudar um estilo no js?

Estilo é problema de css né? Então resolva pelo css e chame no js, para isso existe a `ClassList` onde se eu chegar numa determinada condição para chamar uma classe no css eu a chamo como em 

```js
pacientes[i].classList.add("paciente-invalido");//classe criada no css
```

Onde eu pinto a linha toda de vermelho, mas se tiver que ser via js dá para você alterar com `.style.backgroundColor` (nomes compostos estão com camelCase, tal como border-radius é borderRadius)

Quando selecionamos um elemento com as funções de querySelector, elas nos devolvem um objeto que tem algumas propriedades especiais, que falam sobre as características do HTML selecionado. Uma dessas propriedades é a .classList, que como o nome indica nos mostras classes que aquele HTML tem. e adicionamos a classe do css e não precisa de . antes do nome tal como no querySelector
