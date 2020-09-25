# Continuando o curso de react

## Importando imagens

Posso importar imagens no react pelo html com:

```js
import deleteSVG from "../../assets/img/delete_forever.svg";
```

E aí no html do jsx podemos fazer

```jsx
<img src={deleteSVG} alt="Botão de delete, usado pra deletar o card"/>
```

Ou eu posso tratar como um componente do react como em

```js
import {ReactComponent as DeleteSVG} from "../../assets/img/delete_forever.svg";
```

E aí colocaremos no jsx como

```jsx
<DeleteSVG/>
```

Lindo né, mas se atente pois precisamos colocar com letras maiúsculas

Vimos que é muito comum precisarmos passar propriedades de um componente para ou outro e dessa maneira podemos passar referências para comportamentos que componentes mais abaixo de uma hierarquia precisam devem executar.

Sobre as propriedades marque a alternativa correta:

Ao recebermos uma propriedade dentro de um objeto não podemos alterar ela pois ela é imutável.

Exatamente, propriedades são imutáveis e isso nos garante que ao passarmos um valor para um objeto ele não será alterado.
