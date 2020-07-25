# Cloud

Aqui falaremos do uso da cloud do google onde eu preciso baixar o google cloud sdk e configurar uma conta de pagamento no serviço deles e com isso testar minhas aplicações web e fazer testes de performance e coisas do tipo

Em geral os provedores na nuvem provem 1 ano de acesso gratuito aos seus serviços e podendo ser de graça por mais tempo desde que não extrapole certos limites (ou seja desde que não lance um site profissional, aí terá que pagar mesmo)

Um bucket é nada mais que um repositório que é onde realizaremos os trabalhos

Você tem a opção de utilizar tanto a cli, quanto o console do Google Cloud para a criação dos buckets. Via page é melhor para iniciantes e com a prática você automatiza melhor isso com a cli

É possível compartilhar um único objeto dentro de um bucket

Alternativa correta! Correto! Basta abrir o bucket e clicar com o botão direito do mouse no objeto que você deseja compartilhar.

Alternativa correta
É possível compartilhar objetos especificando os usuários e suas respectivas permissões

Alternativa correta! Exatamente. Você pode compartilhar o objeto especificando o acesso, por exemplo: allUsers - Reader. Assim, você estaria compartilhando o objeto em questão para qualquer usuário com permissão de leitura.

## Usando o SDK

Você instala o sdk ele pede a sua conta do google vinculada ao serviço e depois dá os seguinte comando

```cmd
gcloud init
```

Depois você logar sua conta e ver seus projetos e selecionar o default

Depois vai em

```cmd
gsutil ls
```

Para ver os buckets no projeto depois com

```cmd
gsutil ls gs://<nome do bucket>/*
```

Eu vejo todos os arquivos lá dentro

Para criar o bucket via cli faça

```gs
gsutil mb gs://<nome do bucket>
```
