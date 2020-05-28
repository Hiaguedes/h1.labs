# Algoritmos II

Como visto no curso anterior se quisermos aumentar muito o número de elementos dentro de um vetor e quisermos ordenar eles mais trabalho o nosso computador terá. Só que a vida nos cobra um grande número de elementos para organizar.

Uma boa idéia para organizar um número muito grande de elementos é delegar para pessoas diferentes o trabalho de organizar frações do meu vetor e aí comparar todos eles e montar um vetor do tamanho original já organizado, essa é a ideia do `merge sort`

```java
public class Nota{

private String nome;
private double nota;

  public Nota(String nome, double nota){
	this.nome=nome;
    this.nota=nota;
  }
  
  public String getNome(){
    return nome; 
  }
  
  public double getNota(){
   return nota; 
    
  }

}

public class Merge{
  
  public static Nota[] mescla(Nota[] vetor1, Nota[] vetor2){
    
    int tamanhoTotal = vetor1.length + vetor2.length;
	Nota[] vetorTotal = new Nota[tamanhoTotal];
    
    
    int varre1=0; int varre2=0; int atual=0;
    

    
    while(varre1< vetor1.length && varre2 <vetor2.length){

      
       
    Nota nota1=vetor1[varre1];
    Nota nota2=vetor2[varre2];   
      
      if(nota1.getNota() < nota2.getNota()){
        vetorTotal[atual]=nota1;
        varre1++;
        
      }else{
        vetorTotal[atual]=nota2;
        varre2++;
        
        
      }
      atual++;
     
    }
    
    return vetorTotal;
  }
  
  
}

	public class main{
        public static void main(String[] args) {
          
          Nota[] vetor1={
          new Nota("João",2),
          new Nota("Ana",4.7),
          new Nota("Maria",5.2),
          new Nota("Alberto",8.5)
          };   
          
          
        Nota[] vetor2={
          new Nota("Maurício",5),
          new Nota("Jonathans",6.3),
          new Nota("Pedro",8.9),
          new Nota("Mariana",9.2),
          new Nota("Felipe",9.9)
          };  
          
          
          
          Nota[] rank= Merge.mescla(vetor1,vetor2);
          
          for(Nota nota:rank){
          System.out.println(nota.getNome() +" "+ nota.getNota());
          }
          
        }
    }
```

Note que os vetores de notas dadas no main já está separado e os dois estão ordenados de forma crescente porém se formos printar o resultado nós temos

```result
João 2.0
Ana 4.7
Maurício 5.0
Maria 5.2
Jonathans 6.3
Alberto 8.5
Exception in thread "main" java.lang.NullPointerException
	at main.main(main.java:25)

```

Resumindo ele percorre os dois vetores, mas quando ele chega no final de um ele termina o while e finaliza o vetorTotal mesmo ainda sobrando espaços para completar, nos dando esse exception. E se formos ver as condições dentro do while na função mescla vemos que uma condição é verdadeira enquanto a outra é falsa e mesmo assim ele fecha o while, até por que um dos vetores tem o tamanho maior que o estabelecido inicialmente então forço outros whiles da seguinte forma:

```java
public class Nota{

private String nome;
private double nota;

  public Nota(String nome, double nota){
	this.nome=nome;
    this.nota=nota;
  }
  
  public String getNome(){
    return nome; 
  }
  
  public double getNota(){
   return nota; 
    
  }

}

public class Merge{
  
  public static Nota[] mescla(Nota[] vetor1, Nota[] vetor2){
    
    int tamanhoTotal = vetor1.length + vetor2.length;
	Nota[] vetorTotal = new Nota[tamanhoTotal];
    
    
    int varre1=0; int varre2=0; int atual=0;
    

    
    while(varre1< vetor1.length && varre2 <vetor2.length){

    Nota nota1=vetor1[varre1];
    Nota nota2=vetor2[varre2];   
      
      if(nota1.getNota() < nota2.getNota()){
        vetorTotal[atual]=nota1;
        varre1++;
        
      }else{
        vetorTotal[atual]=nota2;
        varre2++;
        
        
      }
      atual++;
     
    }
    
    while(varre1<vetor1.length){
      vetorTotal[atual]=vetor1[varre1];
      atual++;
      varre1++;      
      
    }
    
    while(varre2<vetor2.length){
      vetorTotal[atual]=vetor2[varre2];
      atual++;
      varre2++;
      
    }
    
    return vetorTotal;
  }
  
  
}

	public class main{
        public static void main(String[] args) {
          
          Nota[] vetor1={
          new Nota("João",2),
          new Nota("Ana",4.7),
          new Nota("Maria",5.2),
          new Nota("Alberto",8.5)
          };   
          
          
        Nota[] vetor2={
          new Nota("Maurício",5),
          new Nota("Jonathans",6.3),
          new Nota("Pedro",8.9),
          new Nota("Mariana",9.2),
          new Nota("Felipe",9.9)
          };  
          
          
          
          Nota[] rank= Merge.mescla(vetor1,vetor2);
          
          for(Nota nota:rank){
          System.out.println(nota.getNome() +" "+ nota.getNota());
          }
          
        }
    }
```

Ou seja enquanto um valor não chegar no final do vetor vai completando o vetor total até acabar a varredura do vetor, assim

```java
while(varre1<vetor1.length){
      vetorTotal[atual]=vetor1[varre1];
      atual++;
      varre1++;      
      
    }
    
    while(varre2<vetor2.length){
      vetorTotal[atual]=vetor2[varre2];
      atual++;
      varre2++;
      
    }
```

Pois se qualquer um dos dois lados sobrar eu garanto que ele vai autocompletar no array Total, o que é a mesma coisa que isso

```java
    while(varre1<vetor1.length){
      vetorTotal[atual++]=vetor1[varre1++];   
      
    }
    
    while(varre2<vetor2.length){
      vetorTotal[atual++]=vetor2[varre2++];
      
    }
```

Só que tem códigos que nos dá apenas um array onde uma parte desse array está organizado até um determinado valor e depois temos outro array que vai desse valor até o final do valor total, para organizar esse único array temos que criar uma função parecida que será:

```java
    public static Nota[] mescla(Nota[] vetor1, int miolo){
    
    int tamanhoTotal = vetor1.length;
	Nota[] vetorTotal = new Nota[tamanhoTotal];
    
    
    int varre1=0; int varre2=miolo; int atual=0;
    

    
    while(varre1< miolo && varre2 <vetor1.length){

      
       
    Nota nota1=vetor1[varre1];
    Nota nota2=vetor1[varre2];   
      
      if(nota1.getNota() < nota2.getNota()){
        vetorTotal[atual]=nota1;
        varre1++;
        
      }else{
        vetorTotal[atual]=nota2;
        varre2++;
        
        
      }
      atual++;
     
    }
    
    while(varre1<miolo){
      vetorTotal[atual++]=vetor1[varre1++];   
      
    }
    
    while(varre2<vetor1.length){
      vetorTotal[atual++]=vetor1[varre2++];
      
    }
    
    return vetorTotal;
  }
```

Onde dizemos ao nosso arrumador onde está essa separação (que é o miolo) e fazemos a arrumação a partir deste.

Outra forma seria em pensar que na real não quero começar no começo e nem terminar nesse final mas em um valor intermediário, dando o início, o meio e o término então fazemos:

```java
  public static Nota[] mescla(Nota[] vetor1,int inicial, int miolo, int termino){
    
    
	Nota[] vetorTotal = new Nota[termino - inicial];
    
    
    int varre1=inicial; int varre2=miolo; int atual=0;
    

    
    while(varre1< miolo && varre2 <termino){

      
       
    Nota nota1=vetor1[varre1];
    Nota nota2=vetor1[varre2];   
      
      if(nota1.getNota() < nota2.getNota()){
        vetorTotal[atual]=nota1;
        varre1++;
        
      }else{
        vetorTotal[atual]=nota2;
        varre2++;
        
        
      }
      atual++;
     
    }
    
    while(varre1<miolo){
      vetorTotal[atual++]=vetor1[varre1++];   
      
    }
    
    while(varre2<termino){
      vetorTotal[atual++]=vetor1[varre2++];
      
    }

    for(int contador=0; contador<atual; contador++){

        vetor1[inicial+contador]=vetorTotal[contador];
    }
    
    return vetor1;
  }
```

Onde declaramos o vetor Total com tamanho termino menos o inicial e fazemos a arrumação no vetorTotal e depois alocamos ele dentro do vetor dado e com isso retornamos o vetor dado. O resultado  para

```java
          Nota[] rank1= Merge.mescla(vetor3,1,5,vetor3.length);
          
         for(Nota nota:rank1){
          System.out.println(nota.getNome() +" "+ nota.getNota());
          }   
```

Será:

```result
Leonardo 2.0
Geovanna 1.1
Pablo 2.9
Jonas 4.4
Joana 5.9
Luis Maurício 6.9
Luisa 7.7
Karina 8.5
Geovaldo 9.5
Xavier 9.7
```

Em todos os casos a função mescla somente funciona com vetores ordenados. Ou se queremos ordenar um elemento pois retorna ele mesmo, ou pra ordenar dois elementos quaisquer (independente se estao ordenados ou não), agora se for para ordenar um elemento todo bagunçado aí fica mais bagunçado ainda.

e é dai que começa o `merge sort`

## Merge Sort

A nossa função mescla  tem um começo meio e um fim, se formos ordenando de pouco em pouco nós podemos ordenar coisas maiores e maiores. Até um ponto que ele está ordenado. Por isso colocamos um inicio, um meio e um fim para a intercalação pois podemos alterar o valor deles.

De forma que se eu ordenar o elemento na posição 0 e na posição 1 e mandar intercalar eu tenho uma arrumação entre eles dois, ai depois arrumo o da posição 2 com o da posição 3, e agora se eu arrumar o da posição 0, com o meio na posição 2 e o termino na 4, pronto tenho os 4 elementos arrumados.

E para fazer a organização de um vetor desordenado e transformar ele em ordenado eu faço a operação recursivamente com:

```java
  public static void merge_sort(Nota[] notas,int inicial, int termino){
  int qtde= termino-inicial;

  if(qtde>1){

  int meio=(inicial+termino)/2;
  merge_sort(notas,inicial,meio);
  merge_sort(notas,meio,termino);

intercala(notas, inicial,meio,termino);
}
  }
```

Onde eu preciso limitar a quantidade de elementos no vetor se não ele vai ficar dividindo 0/2 infinitamente para o numero do meio. Dando um estouro da pilha ou Stack Overflow.

Método main:

```java
	public class main{
        public static void main(String[] args) {
               
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
          

            
      Merge.merge_sort(vetor3,0,9);
          
         for(Nota nota:vetor3){
          System.out.println(nota.getNome() +" "+ nota.getNota());
          }          
        }
    }
```

Resultado:

```r
Geovanna 1.1
Leonardo 2.0
Pablo 2.9
Jonas 4.4
Joana 5.9
Luis Maurício 6.9
Luisa 7.7
Karina 8.5
Geovaldo 9.5
Xavier 9.7
```

Caso queiramos organizar por ordem alfabética esse array (pelos nomes) nós temos que colocar a função:

```java
private static Nota[] intercala_nomes(Nota[] vetor1,int inicial, int miolo, int termino){
    
    
	Nota[] vetorTotal = new Nota[termino - inicial];
    
    
    int varre1=inicial; int varre2=miolo; int atual=0;
    

    
    while(varre1< miolo && varre2 <termino){

      
       
    Nota nota1=vetor1[varre1];
    Nota nota2=vetor1[varre2];   
      
      if(nota1.getNome().compareTo(nota2.getNome()) <0){
        vetorTotal[atual]=nota1;
        varre1++;
        
      }else{
        vetorTotal[atual]=nota2;
        varre2++;
        
        
      }
      atual++;
     
    }
    
    while(varre1<miolo){
      vetorTotal[atual++]=vetor1[varre1++];   
      
    }
    
    while(varre2<termino){
      vetorTotal[atual++]=vetor1[varre2++];
      
    }

    for(int contador=0; contador<atual; contador++){

        vetor1[inicial+contador]=vetorTotal[contador];
    }
    
    return vetor1;
  }


  public static void merge_sort_nomes(Nota[] notas, int inicio, int termino) {

  int quantidade = termino - inicio;
  if(quantidade > 1) {
    int meio = (termino + inicio) / 2;
    merge_sort_nomes(notas, inicio, meio);
    merge_sort_nomes(notas, meio, termino);
    intercala_nomes(notas, inicio, meio, termino);
  }
}
```

Onde eu faço a comparação de nomes com `nota1.getNome().compareTo(nota2.getNome()<0` 
