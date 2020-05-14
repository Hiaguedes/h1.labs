# Powershell 

WINDOWS+R digita MSTSC (abre a conexão de área de trabalho remota)

```sh
Get-Service -Name "Qualque um" (te dá se tal serviço está sendo feito pela sua máquina), poderia ter -ComputerName caso usassemos mais máquinas em estado remoto

variável $A (com $ na frente)

```

Nota-se que o powershell tem uma classe de funções bem com a cara verbo-adjetivo, tipo pegue-serviço e isso deixa o código um pouco mais legível, além de que podemos tratar a variável como um objeto, então podemos manusear uma pasta por exemplo de forma mais fácil e de forma a ser entendível.

Para pausar o áudio no windows podemos fazer:

```sh
$var=Get-Service -Name "Audiosrv"
$var.Stop()

E para voltar
$var.start()
```

O powershell não faz distinção entre maiúsculas e minúsculas

Uma função que pode ser feita no Ps É

```sh
 if($var.status -eq "Running"){
$var.stop()
$var.start()
}
```
Certos comandos comuns do dia-a-dia não são utilizados no PowerShell pois o mesmo se previne de alguns ataques maliciosos, porém isso acaba por fazer com que o powershell não execute simples arquivos .bat de maneira convencional então por isso temos que aplicar o CommandPrecedence então para executar um bat temos que fazer:

```sh
.\blabla.bat
```
Para ver o que tem na nossa PATH temos que escrever:

```sh
echo $env:path
```

env nos mostra as variáveis de ambiente, nele podemos ver o nome do usuário com:

```sh
echo $env:USERNAME
```

Ver o tipo da variável que estamos mechendo:

```sh
$env:path.getType()

Resultado:

IsPublic IsSerial Name                                     BaseType
-------- -------- ----                                     --------
True     True     String                                   System.Object
```

Qualquer dúvida em como manipular strings aqui, basta digitar no Google MSDN string

Então uma forma de melhorar o resultado do path podemos escrever:

```sh
$env:path.Split(';')
```

Então para ver algumas variáveis armazenadas dentro do Path 

```sh
 $env:path | Get-Member
```

O Get-Member nos dá todas as propriedades e métodos de uma função, tal como sua definição e escrita.
