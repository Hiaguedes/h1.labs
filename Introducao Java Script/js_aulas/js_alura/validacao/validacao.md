# Validando campos com js e html

## Validação com HTML

Em campos obrigatórios temos o atributo `required` que é para ser colocado dentro de input

Para assegurar que eu quero um email em um determinado campo use o `type="email"`

Para senhas eu posso via html colocar um numero mínimo de caracteres com o atributo `min-length` e setar o número de caracteres necessários

Para cadastro de datas temos o `type="date"`

E podemos colocar uma data mínima para ser válido pois ninguém nasceu ou tem alguma coisa em 1752 e fazemos isso dentro do input com `min="1900-01-01"`

### Perguntas

No nosso formulário, é necessário que o usuário preencha um campo de e-mail. Para codificar isso, utilizamos o atributo type="email" do próprio HTML para validar o valor digitado pelo usuário.

Por quê?

A validação é mais confiável e padronizada desta forma.

Está correto, pois a validação de e-mails através do HTML é uma forma padronizada, que toda a web tem acesso.

Nós definimos que a senha do nosso formulário deve ter no mínimo 4 caracteres e, para isso, utilizamos o atributo minLength, que é diferente do atributo min.

Qual é a diferença entre esses atributos?

Alternativa correta
O atributo minLength analisa os caracteres digitados, enquanto o min analisa um range dentro de um valor.

Está correto, já que o minLength realmente valida os caracteres digitados, enquanto o min analisa o valor dentro de um range de valores

## Começando com validação no js

A primeira coisa que temos que saber é que a `input.setCustomValidity` que vai fazer aquele input ser validado ou não. Onde passamos uma string com o erro que será informado ao usuário, porém ele não é ideal, pois ele não destaca muito pro usuário que aquele campo está errado (falando de maneira de UX mesmo)
