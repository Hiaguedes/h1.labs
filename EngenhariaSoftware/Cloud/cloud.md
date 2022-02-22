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

### Consolidando o seu conhecimento
PRÓXIMA ATIVIDADE

Chegou a hora de você seguir todos os passos realizados por mim durante esta aula:

Caso você ainda não tenha um domínio, pode registrar um no Freenom
No seu domínio, crie um registro do tipo CNAME, com nome www e apontando para c.storage.googleapis.com

Acesse a Webmaster Central da Google

Clique em Add Property, insira o seu domínio e clique em Continue
Na aba Alternate methods, selecione Domain name provider e Other em seguida (caso seu domínio esteja registrado no Freenom. Copie o texto que será exibido

Volte ao Freenom e, no seu domínio, crie um registro do tipo TXT, apontando para o texto copiado acima

Volte à Webmaster Central da Google e clique em Verify
Através do console, criar um bucket que vai se referenciar ao seu site, por exemplo:

`gsutil mb gs://www.rmerceslabs.tk`

Em seguida, copie os arquivos do site (caso você não tenha baixado, baixe-o aqui) para dentro do bucket, por exemplo:

`gsutil -m cp -R * gs://www.rmerceslabs.tk`

Adicione a permissão de leitura para o bucket e todos os seus arquivos:

`gsutil acl ch -R -u AllUsers:R gs://www.rmerceslabs.tk`

Configure o bucket para ele se comportar como um site, dizendo qual é a página inicial e a de erro:

`gsutil web set -m index.html -e 404.html gs://www.rmerceslabs.tk`

Caso você faça alguma mudança no site, pode enviar as alterações para o bucket com o seguinte comando:

`gsutil -m rsync . gs://www.rmerceslabs.tk`

Caso já tenha feito, excelente. Se ainda não, é importante que você execute o que foi visto nos vídeos para poder continuar com a próxima aula.

### Trabalhando com ACLs

Para listarmos as ACLs (access control list) aplicadas no bucket xpto, utilizamos o seguinte comando:

`gsutil acl gs://xpto/*`

Ele está correto?

Alternativa correta
Não, pois o comando possui 2 erros

Alternativa correta! Além de não estarmos apontando corretamente para o bucket, é preciso utilizar o parâmetro get para obter a ACL:

`gsutil acl get gs://xpto`

### ACLs e IAM

Sobre ACLs e IAMs, podemos dizer que:

As ACLs permitem um controle maior sobre os objetos, permitindo uma maior granularidade das permissões

Alternativa correta! Exatamente, quando precisamos aplicar uma regra específica a um objeto, devemos utilizar a ACL.

No console, ao aplicarmos uma permissão, estamos utilizando o IAM

Alternativa correta! Via console, o Google Cloud aplica o permissionamento via IAM (Identity and Access Management (IAM)). As ACLs estão sendo descontinuadas, ainda dá para usar-las via terminal mas logo pode ser extinto

Dúvidas sobre qualquer comando digite

```gs
gsutil help <iam ou acl ou qq comando>
```

## IAM

Permissionamento

Ao utilizar o permissionamento IAM, podemos associá-lo a:

Usuários (utilizando e-mail)

Alternativa correta! Para configurar o permissionamento do bucket ou dos objetos, basta associá-lo ao e-mail.

Grupos (utilizando um e-mail do grupo)

Alternativa correta! Para que não seja necessário adicionar usuários um a um, podemos criar um grupo e vincular o permissionamento ao e-mail do grupo.

Chegou a hora de você seguir todos os passos realizados por mim durante esta aula:

Criar três buckets, para representar três empresas
Na Google Cloud Platform, em Browser, no bucket da primeira empresa, configure um membro como Storage Object Admin e outro membro como Storage Object Viewer
Em seguida, teste o premissionamento desses membros
Através do console, no bucket da segunda empresa, configure um membro como Storage Object Admin e outro membro como Storage Object Viewer
Em seguida, teste o premissionamento desses membros
Através do console, no bucket da terceira empresa, configure um grupo do Google Groups como Storage Object Viewer
Em seguida, teste o premissionamento dos membros do grupo

## Ciclo de vida dos objetos

Por padrão um bucket tem um ciclo de vida de 365 dias, após essa data os arquivos serão excluídos e tudo será deletado.

Para alterar somente basta alterar o arquivo .json chamado lifecycle.json e setar esse arquivo no projeto com:

```gs
gsutil lifecycle set lifecycle.json gs://<nome da bucket criada>
```

Sobre as regras de ciclo de vida dos objetos podemos dizer que:

Podem ser criadas regras baseadas nas classe de armazenamento (Multi-Regional, Nearline, etc)

Alternativa correta! Podemos basear nossas regras nas classes de armazenamento, inclusive mudá-las!

Alternativa correta
As regras são criadas baseadas em condição e ação

Alternativa correta! Primeiro você especifica uma ação, e caso esta seja atendida, a ação associada será executada. Por exemplo, excluir objetos com mais de 1 ano.

### Consolidando o seu conhecimento

Chegou a hora de você seguir todos os passos realizados por mim durante esta aula:

Através do console, crie um novo bucket, na região us-east1, por exemplo:

`gsutil mb -l us-east1 gs://004-ula`

Configure o ciclo de vida dos objetos desse bucket, para que eles sejam deletados após 100 dias
Através da Google Cloud Platform, configure o ciclo de vida dos objetos de um dos buckets criados na aula passada
Arquive objetos com 180 dias ou mais, ou seja, após esse período, a classe de armazenamento dele deve ser a Nearline
Caso já tenha feito, excelente. Se ainda não, é importante que você execute o que foi visto nos vídeos para poder continuar com a próxima aula.

## Versionamento

Sobre a ativação do versionamento

Sobre a ativação do versionamento na Google Cloud Storage, podemos afirmar que:

Alternativa correta
Podemos ativar o versionamento pelo gsutil (CLI)


Alternativa correta! Exatamente, para ativar o versionamento, precisamos utilizar o gsutil.

Alternativa correta
O comando abaixo ativa o versionamento;

gsutil versioning set on gs://xpto

Alternativa correta! Perfeito, a sintaxe está correta!

Por padrão o versionamento de um bucket é dado pelo seu timestamp

Considerações sobre o versionamento

Algumas considerações sobre o versionamento dos objetos:

Alternativa correta
Podem ser criadas regras baseadas no versionamento

Alternativa correta! Podemos nos referenciar tanto aos objetos ativos (última versão = live), como também aos objetos versionados (versões anteriores = archived).

Alternativa correta
O identificador utilizado para o versionamento é o timestamp

Alternativa correta! A Google Cloud Storage utiliza o timestamp como id:

1549541740755491 = GMT: Thursday, February 7, 2019 12:15:40.755 PM

### Consolidando o seu conhecimento

Chegou a hora de você seguir todos os passos realizados por mim durante esta aula:

Copie algum arquivo para dentro de um bucket

Habilite o versionamento para o bucket utilizado acima, por exemplo:

`gsutil versioning set on gs://001-spacex`

Copie novamente o mesmo arquivo para o mesmo bucket, e repare que haverá dois arquivos de mesmo nome, mas com versões diferentes, executando o seguinte comando, por exemplo:

`gsutil ls -a gs://001-spacex`

Você pode restaurar alguma versão antiga de um arquivo, copiando-o, juntamente com o seu identificador, para o próprio bucket, por exemplo:

`gsutil cp gs://001-spacex/arquivo.png#1548267325488499 gs://001-spacex/arquivo.png`

Para o bucket utilizado anteriormente, crie uma nova regra, para que objetos com 90 dias, que já estejam versionados, tenham suas classes de armazenamento alteradas para Nearline
Caso já tenha feito, excelente. Se ainda não, é importante que você execute o que foi visto nos vídeos para poder continuar com a próxima aula.

## Características do Transfer

O serviço Transfer, como o próprio nome sugere, faz a transferência de arquivos e tem a seguinte característica:

Conforme o volume de dados, é possível utilizar um appliance para a transferência

Alternativa correta! Se a quantidade de dados ultrapassar 20TB, é possível solicitar uma appliance para efetuar a transferência.
