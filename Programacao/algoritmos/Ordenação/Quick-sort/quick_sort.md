# Encontrando menores elementos dado um pivô

Imagina que meu nome é luisa e eu quero saber quantas pessoas tiveram a menor nota do que a minha, mais para efeito de comparação mesmo, para saber se realmente mandei bem na prova ou não. O que eu faço?

Eu vejo a nota de todos os alunos e vou contando uma a uma todas as notas menores que a minha e vejo a tem n notas na turma que tiraram abaixo que eu. E para isso eu posso apenas fazer o seguinte código abaixo:

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

public class quick{
    public static int encontraMenor(Nota pivo, Nota[] notas){
        int menores=0;
        for(int atual=0; atual<notas.length; atual++){
            if(notas[atual].getNota()<pivo.getNota()){
                menores++;
            }
        }
        return menores;
    }

}

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
          
          Nota Luisa=new Nota("Luisa",7.7);
          
         int menor= quick.encontraMenor(Luisa,vetor3);
          
          System.out.println("O número de notas menores que a da Luisa é de: " + menor);
          
        }
    }
```

Ond eu luisa separo a minha nota do resto e compara com o vetor total, nos dando um resultado de:

```r
O número de notas menores que a da Luisa é de: 6
```

Outra forma de chamar é:

```java
         int menor= quick.encontraMenor(vetor3[3],vetor3);
          
System.out.println("O número de notas menores que a da "+ vetor3[3].getNome() + " é de: " + menor);
```

Ainda teria um método mais simples que é com o foreach que fica:

```java
private static int buscaMenores(Nota busca, Nota[] notas) {

  int menores = 0;
  for(nota : notas) {
    if(nota.getNota() < busca.getNota()) {
      menores++;
    }
  }
  return menores;
}
```

Mas aí tem que ver se o compilador de java que você está usando suporta isso.

## Ordenando maiores elementos a direita do pivo e os menores a esquerda

É de boa prática encontrarmos o elemento que está na posição do meio e jogar ele pro final do array (ou no começo), assim costumamos arrumar quem tem uma nota menor a esquerda e quem tem uma nota maior a direita a esse pivô. E no vetor3 vemos que o melhor pivô é o Luis Maurício então transformamos o vetor da seguinte forma (você pode selecionar qualquer um para ser o pivô é só por que fica mais didático assim):

```java
        Nota[] vetor3={
          new Nota("Leonardo",2),
          new Nota("Pablo",2.9),
          new Nota("Joana",5.9),
          new Nota("Luisa",7.7),
          new Nota("Geovaldo",9.5),         
          new Nota("Geovanna",1.1),
          new Nota("Jonas",4.4),
          new Nota("Karina",8.5),
          new Nota("Xavier",9.7),
          new Nota("Luis Maurício",6.9)
          };  
```

E colocaremos o pivô bem no meio com o código:

```java
public class quick{
  
    public static int encontraMenor(Nota pivo, Nota[] notas){
        int menores=0;
        for(int atual=0; atual<notas.length; atual++){
            if(notas[atual].getNota()<pivo.getNota()){
                menores++;
            }
        }
        return menores;
    }
  
  public static void organiza(Nota[] notas, int inicio,int termino){
      int menor=0;
    Nota pivo=notas[termino-1];
    for (int atual=0; atual<termino-1; atual++){
        if(notas[atual].getNota()<=pivo.getNota()){
            
            menor++;
        }
    }
    troca(notas, termino-1,menor);
    
  }

    private static void troca(Nota[] nota, int primeiro, int segundo){
  //troca primeiro com segundo
            Nota primeiroNota = nota[primeiro];
            Nota segundoNota = nota[segundo];
            nota[primeiro] = segundoNota;
            nota[segundo] = primeiroNota;

}

}
```

E o main ficará:

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
          new Nota("Karina",8.5),
          new Nota("Xavier",9.7),
          new Nota("Luis Maurício",6.9)
          };  
          

          
         quick.organiza(vetor3,0, vetor3.length);
          
         for(Nota nota:vetor3){
          System.out.println(nota.getNome() +" "+ nota.getNota());
          }    
          
        }
    }
```

Resultado:

```r
Leonardo 2.0
Pablo 2.9
Joana 5.9
Luisa 7.7
Luis Maurício 6.9
Geovanna 1.1
Karina 8.5
Xavier 9.7
Geovaldo 9.5
```

Para saber qual o pivô eu fiz `Nota pivo=notas[termino-1];` e como determinamos qual o primeiro elemento e o último do array é dado por `vetor3.length-1` que o index do pivo nesse array, ai eu faço a troca com o elemento onde esse elemento deveria estar.

Só que note que o vetor está todo bagunçado ainda e eu quero fazer com que tudo que está acima do pivo seja menor e tudo que está abaixo seja maior, para isso só fazemos uma troca quando acharmos um menor ou seja

```java
  public static void organiza(Nota[] notas, int inicio,int termino){
      int menor=0;
    Nota pivo=notas[termino-1];
    for (int atual=0; atual<termino-1; atual++){
        if(notas[atual].getNota()<=pivo.getNota()){
          troca(notas,atual,menor);
            menor++;
        }
    }
    troca(notas, termino-1,menor);
    
  }
```

No momento que eu acho um valor menor eu penso, opa você não deveria estar aqui você deveria estar na posição onde aponta o número `menor` do vetor. E assim vou colocando os menores em posições menores e os maiores em relação as maiores posições dentro do nosso vetor.

Só que eu vou querer saber em que posição o pivo ficou, portanto invés de ser uma função void eu faço:

```java
  public static int organiza(Nota[] notas, int inicio,int termino){
      int menor=0;
    Nota pivo=notas[termino-1];
    for (int atual=0; atual<termino-1; atual++){
        if(notas[atual].getNota()<=pivo.getNota()){
          troca(notas,atual,menor);
            menor++;
        }
    }
    troca(notas, termino-1,menor);
    
    return menor;
  }
```

# Quick Sort

Agora queremos pegar todos esses algoritmos e implementar uma ordenação entre nossos elementos

Já temos uma certa ordem com um pivotamento e agora o que se faz? Pivota o vetor depois do primeiro pivo e antes do primeiro pivo, de forma recursiva, da seguinte forma:

```java
public static void quick_sort(Nota[] nota,int inicio,int termino){
int ele=termino-inicio;
if( ele>1){
   int posPivo= organiza(nota,inicio,termino);
   quick_sort(nota,inicio,posPivo);
   quick_sort(nota,posPivo+1,termino);
}
}
```

Ou seja eu chamo a função `organiza` para saber a posição do pivo, e depois eu chamo a função do começo do vetor até a posição do pivo e depois da posição depois do pivo até o termino e crio novos pivos para eles, o resultado disso é a organização total do nosso vetor:

```r
Geovanna 1.1
Leonardo 2.0
Pablo 2.9
Joana 5.9
Luis Maurício 6.9
Luisa 7.7
Karina 8.5
Geovaldo 9.5
Xavier 9.7
```

Note que se o número de elementos for menor que 1 não há sentido ordenar o vetor, então temos uma restrição de elementos a serem ordenados, que é de 1.

Para ordenar strings eu faço

```java
  private static int organiza_nome(Nota[] notas, int inicio,int termino){
      int menor=0;
    Nota pivo=notas[termino-1];
    for (int atual=0; atual<termino-1; atual++){
        if(notas[atual].getNome().compareTo(pivo.getNome())<0){
            troca(notas,atual,menor);
            menor++;
        }
    }
    troca(notas, termino-1,menor);
    return menor;
  }


  public static void quick_sort_nome(Nota[] nota,int inicio,int termino){
int ele=termino-inicio;
if( ele>1){
   int posPivo= organiza_nome(nota,inicio,termino);
   quick_sort_nome(nota,inicio,posPivo);
   quick_sort_nome(nota,posPivo+1,termino);
}
}
```

# Análise do Quick Sort

O core do quick sorte é parecido com o do merge sort está na função organiza que diz um pivo e troca um elemento com o outro no qual esse pivo deveria estar ou seja

```java
  private static int organiza(Nota[] notas, int inicio,int termino){
      int menor=0;
    Nota pivo=notas[termino-1];
    for (int atual=0; atual<termino-1; atual++){
        if(notas[atual].getNota()<=pivo.getNota()){
            troca(notas,atual,menor);
            menor++;
        }
    }
```

E nesse método vemos que ele varre o vetor inteiro (com um for somente). Então já temos uma complexidade `n` para um vetor de `n` elementos.

```java
public static void quick_sort(Nota[] nota,int inicio,int termino){
int ele=termino-inicio;
if( ele>1){
   int posPivo= organiza(nota,inicio,termino);
   quick_sort(nota,inicio,posPivo);
   quick_sort(nota,posPivo+1,termino);
}
}
```

Onde eu divido o vetor por dois, por dois, por dois, por dois. Isso nos dá o número de operações `log_2(n)` que vemos na busca binária, pois é o número de divisões feitas no pior caso possível. Então como temos a complexidade `n` do método trocada e a complexidade `log_2(n)` atrelada a recursividade então a complexidade dessa operação é de `O(nlon_2(n))`. Pense nesse algoritmo como divisão e troca n vezes.

![Gráfico da complexidade nlog_2(n)](/Ordenação/img/complexidade2.png)

E note que diferente do `merge sort` o quick sort cresce nlog_2(n) mesmo enquanto o merge cresce 2nlog_2(n) o quick sendo mais rápido
