# Algoritmo de Busca

Outros tipos de algoritmos muito úteis para a gente são os algoritmos de busca dentro de um vetor (ele estando ordenado ou não), afinal eu estou na lista de classificados de uma prova? Eu estou em que posição de altura em um grupo? São questões que fazemos para um vetor, e existem muitas formas de resolver essa pergunta e é o que veremos aqui.

## Busca Linear

É a busca mais simples, eu olho de um em um até chegar no final. Como pode se notar é a mais custosa também.

Para se implementar essa busca simplesmente fazemos:

```java
  public class busca{

public static int linear(Nota[] nota,int inicio, int termino, double busca){

	for(int atual=inicio; atual<termino; atual++){

	    if(nota[atual].getNota() == busca){return atual;}

}
return -1;
}
  }
```

Onde o `return -1` é para no caso de não termos encontrado nenhum valor. E como nenhum vetor tem index negativo então -1 é um bom indicativo para a gente.

Então para um main igual a:

```java
         Nota[] vetor3={
          new Nota("Leonardo",2),
          new Nota("Pablo",2.9),
          new Nota("Joana",5.9),
          new Nota("Luisa",7.7),
          new Nota("Geovaldo",9.5),         
          new Nota("Geovanna",1.1),
          new Nota("Jonas",4.4),
          new Nota("Luis Maurício",6.9),
          new Nota("Karina",8.5),
          new Nota("Xavier",9.7)
          };  

quick.quick_sort(vetor3,0,vetor3.length);

for(Nota nota:vetor3){
    System.out.println(nota.getNome() +"  "+ nota.getNota());
}

int a=busca.linear(vetor3, 0,vetor3.length,7.7);
     System.out.println(); 
System.out.println("A nota está na posição: " + a );
```

Onde organizamos o vetor com um `quick_sort` nós temos o seguinte resultado:

```r
Geovanna  1.1
Leonardo  2.0
Pablo  2.9
Jonas  4.4
Joana  5.9
Luis Maurício  6.9
Luisa  7.7
Karina  8.5
Geovaldo  9.5
Xavier  9.7

A nota está na posição: 6
```

O que está certo, mas note que temos um for do tamanho do vetor para realizar essa operação, o que não é legal pois a complexidade desse algoritmo é de O(n) e ele pode ser menos custoso que isso

## Busca Binária

E a melhor forma de implementar uma busca grande (como o nome de uma palavra) em um dicionário é fazendo a busca pela metade, se o que quisermos verificar algo acima dela nós descartamos tudo que tem abaixo dela, e assim vamos dividindo a metade e comparando se está acima ou abaixo, dessa forma conseguimos ver em poucos passos onde está determinado valor. Uma resolução para esse tipo de problema é o dado abaixo:

```java
public static int binaria(Nota[] nota,int inicio, int termino, double busca){

  int meio = (inicio+termino)/2;

 if(nota[meio].getNota()== busca){return meio;}
 
 if(nota[meio].getNota() < busca){return binaria(nota,meio+1,termino,busca);}

return binaria(nota,inicio,meio-1,busca);
  
}
```

Para um seguinte main

```java
   Nota[] vetor3={
          new Nota("Leonardo",2),
          new Nota("Pablo",2.9),
          new Nota("Joana",5.9),
          new Nota("Luisa",7.7),
          new Nota("Geovaldo",9.5),         
          new Nota("Geovanna",1.1),
          new Nota("Jonas",4.4),
          new Nota("Luis Maurício",6.9),
          new Nota("Karina",8.5),
          new Nota("Xavier",9.7)
          };  

quick.quick_sort(vetor3,0,vetor3.length);

for(Nota nota:vetor3){
    System.out.println(nota.getNome() +"  "+ nota.getNota());
}
      
      System.out.println();

int a=busca.binaria(vetor3, 0,vetor3.length,7.7);
System.out.println("A nota está na posição: " + a );
```

Temos o mesmo resultado da busca linear:

```r
Geovanna  1.1
Leonardo  2.0
Pablo  2.9
Jonas  4.4
Joana  5.9
Luis Maurício  6.9
Luisa  7.7
Karina  8.5
Geovaldo  9.5
Xavier  9.7

A nota está na posição: 6
```

Só que de uma forma muito mais eficiente.

### Só que e se pesquisarmos um valor que não existe no vetor?

Vamos pesquisar um número que não tem nesse vetor, como 7.5. O resultado é o seguinte

```java
Geovanna  1.1
Leonardo  2.0
Pablo  2.9
Jonas  4.4
Joana  5.9
Luis Maurício  6.9
Luisa  7.7
Karina  8.5
Geovaldo  9.5
Xavier  9.7

Exception in thread "main" java.lang.StackOverflowError
	at busca.binaria(busca.java:19)
	at busca.binaria(busca.java:19)
	at busca.binaria(busca.java:19)
	at busca.binaria(busca.java:19)
	at busca.binaria(busca.java:19)
	at busca.binaria(busca.java:19)
	at busca.binaria(busca.java:19)
	at busca.binaria(busca.java:19)
	at busca.binaria(busca.java:19)
	at busca.binaria(busca.java:19)
```

Temos um estouro da pilha, então vamos alterar nossa função binária de modo a termos:

```java
public static int binaria(Nota[] nota,int inicio, int termino, double busca){

  int meio = (inicio+termino)/2;
    System.out.println("Meio: " + meio + "inicio: " + inicio + " termino: " + termino );

 if(nota[meio].getNota()== busca){return meio;}
 
 if(nota[meio].getNota() < busca){return binaria(nota,meio+1,termino,busca);}

return binaria(nota,inicio,meio-1,busca);
  
}
```

Isso nos dá um resultado para 7.5 igual a:

```java
Geovanna  1.1
Leonardo  2.0
Pablo  2.9
Jonas  4.4
Joana  5.9
Luis Maurício  6.9
Luisa  7.7
Karina  8.5
Geovaldo  9.5
Xavier  9.7

Meio: 5inicio: 0 termino: 10
Meio: 8inicio: 6 termino: 10
Meio: 6inicio: 6 termino: 7
Meio: 5inicio: 6 termino: 5
Meio: 5inicio: 6 termino: 5
Meio: 5inicio: 6 termino: 5
Meio: 5inicio: 6 termino: 5
Meio: 5inicio: 6 termino: 5
Meio: 5inicio: 6 termino: 5
Meio: 5inicio: 6 termino: 5
Meio: 5inicio: 6 termino: 5
Meio: 5inicio: 6 termino: 5
Meio: 5inicio: 6 termino: 5
Meio: 5inicio: 6 termino: 5
Meio: 5inicio: 6 termino: 5
Meio: 5inicio: 6 termino: 5
Meio: 5inicio: 6 termino: 5
```

Ou seja ele fica meio doido, ele diz que o inicio é maior que o começo, então nossa função `binaria` deve ficar como:

```java
public static int binaria(Nota[] nota,int inicio, int termino, double busca){

  int meio = (inicio+termino)/2;

if(inicio>termino){return -1;}

 if(nota[meio].getNota()== busca){return meio;}
 
 if(nota[meio].getNota() < busca){return binaria(nota,meio+1,termino,busca);}

return binaria(nota,inicio,meio-1,busca);
  
}
```

E aí para uma busca pela nota 7.5 produzimos o seguinte resultado:

```r
Geovanna  1.1
Leonardo  2.0
Pablo  2.9
Jonas  4.4
Joana  5.9
Luis Maurício  6.9
Luisa  7.7
Karina  8.5
Geovaldo  9.5
Xavier  9.7

A nota está na posição: -1
```

Ou seja ele não encontrou nada. E como ele essa função retorna um número inteiro então podemos mudar o main da seguinte forma:

```java
quick.quick_sort(vetor3,0,vetor3.length);

for(Nota nota:vetor3){
    System.out.println(nota.getNome() +"  "+ nota.getNota());
}
      
      System.out.println();

int a = busca.binaria(vetor3, 0,vetor3.length,7.5);

if(a>=0){
System.out.println("A nota está na posição: " + a );
}else{System.out.println("Não encontrei a nota :(");}
```

E esse main nos dá o seguinte resultado:

```r
Geovanna  1.1
Leonardo  2.0
Pablo  2.9
Jonas  4.4
Joana  5.9
Luis Maurício  6.9
Luisa  7.7
Karina  8.5
Geovaldo  9.5
Xavier  9.7

Não encontrei a nota :(
```

Já para buscar um nome em uma lista como essa nós temos que fazer:

```java
public static int binaria_nome(Nota[] nota,int inicio, int termino, String busca){

  int meio = (inicio+termino)/2;

if(inicio>termino){return -1;}

 if(nota[meio].getNome().compareTo(busca)==0){return meio;}
 
 if(nota[meio].getNome().compareTo(busca)<0){return binaria_nome(nota,meio+1,termino,busca);}

return binaria_nome(nota,inicio,meio-1,busca);
  
}
```

Isso depois de organizar alfabeticamente o vetor.

O main deve estar

```java
quick.quick_sort_nome(vetor3,0,vetor3.length);

for(Nota nota:vetor3){
    System.out.println(nota.getNome() +"  "+ nota.getNota());
}
      
      System.out.println();

int a = busca.binaria_nome(vetor3, 0,vetor3.length,"Geovanna");

if(a>=0){
System.out.println("O nome está na posição: " + a );
}else{System.out.println("Não encontrei o nome :(");}
```

E o resultado será:

```r
Geovaldo  9.5
Geovanna  1.1
Joana  5.9
Jonas  4.4
Karina  8.5
Leonardo  2.0
Luis Maurício  6.9
Luisa  7.7
Pablo  2.9
Xavier  9.7

O nome está na posição: 1
```
