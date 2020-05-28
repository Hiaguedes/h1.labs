# Algoritmos de seleção

Usando o compilador de java online com o link https://www.compilejava.net/ nós temos um selecionador de quem tem o maior e o menor preço dentro do array de produtos que pode ser visto no código abaixo.

```java
    public class TestaMenoreMaiorPreco {

        public static void main(String[] args) {


          
Produto produtos[] = new Produto[5];    

produtos[0] = new Produto("Lamborghini", 1000000);
produtos[1] = new Produto("Jipe", 46000);
produtos[2] = new Produto("Brasília", 16000);
produtos[3] = new Produto("Smart", 46000);
produtos[4] = new Produto("Fusca", 17000);

            double maisCaro = 0;
            double maisBarato= 0;
            int atual = 0;
            int atualMaisCaro = 0;
          	int atualMaisBarato = 0;
          
            for(atual=0;atual<produtos.length;atual++) {
              
              if(atual==0){
               maisCaro = produtos[0].getPreco(); 
               maisBarato =produtos[0].getPreco();
              }
                if (produtos[atual].getPreco() > maisCaro) {
                    maisCaro = produtos[atual].getPreco();
                    atualMaisCaro=atual;

                }
              
                if (produtos[atual].getPreco() < maisBarato) {
                    maisBarato = produtos[atual].getPreco();
                    atualMaisBarato=atual;

                }              
            

                System.out.println("Preço mais barato até o momento: "+ maisBarato + "      "+ "Preço mais caro até o momento: " + maisCaro);
            }
                System.out.println();
                System.out.println("Preço mais caro: " + maisCaro + " do modelo " + produtos[atualMaisCaro].getNome());
                System.out.println("Preço mais barato: " + maisBarato + " do modelo " + produtos[atualMaisBarato].getNome());
        }
      
    }


public class Produto {

    private String nome;
    private double preco;

    public Produto(String nome, double preco) {
        this.nome = nome;
        this.preco = preco;
    }

    public double getPreco() {
        return preco;
    }

    public String getNome() {
        return nome;
    }
}
```

Cujo resultado nos dá:

```Resultado
Preço mais barato até o momento: 1000000.0      Preço mais caro até o momento: 1000000.0
Preço mais barato até o momento: 46000.0      Preço mais caro até o momento: 1000000.0
Preço mais barato até o momento: 16000.0      Preço mais caro até o momento: 1000000.0
Preço mais barato até o momento: 16000.0      Preço mais caro até o momento: 1000000.0
Preço mais barato até o momento: 16000.0      Preço mais caro até o momento: 1000000.0

Preço mais caro: 1000000.0 do modelo Lamborghini
Preço mais barato: 16000.0 do modelo Brasília
```

Lembrando que em java podemos declarar vetores das seguintes maneiras:

```java
Produto produtos[] = new Produto[5]; 
Produto[] produtos = { new Produto("Fusca", 13.000), new Produto("Jipe", 45.000) };
Produto[] produtos = new Produto[5];
```

Ou seja podemos colocar [] junto do nome da classe.

Só que note que fizemos um processo de setup, onde digo que o mais barato é igual ao mais caro quando começamos a varrer nosso vetor. Esse processo pode ser eliminado ao fazer:

```java
public class TestaMenoreMaiorPreco {

        public static void main(String[] args) {


          
Produto produtos[] = new Produto[5];    

produtos[0] = new Produto("Lamborghini", 1000000);
produtos[1] = new Produto("Jipe", 46000);
produtos[2] = new Produto("Brasília", 16000);
produtos[3] = new Produto("Smart", 46000);
produtos[4] = new Produto("Fusca", 17000);

            int atualCaro = 0;
            int atualBarato= 0;
            int atual = 0;

          
            for(atual=0;atual<produtos.length;atual++) {
              

                if (produtos[atual].getPreco() >produtos[atualCaro].getPreco()) {
                    atualCaro =atual;


                }
              
                if (produtos[atual].getPreco() < produtos[atualBarato].getPreco()) {
                    atualBarato=atual;


                }              
            

                System.out.println("Preço mais barato até o momento: "+ produtos[atualBarato].getPreco() + "      "+ "Preço mais caro até o momento: " + produtos[atualCaro].getPreco());
            }
                System.out.println();
                System.out.println("Preço mais caro: " + produtos[atualCaro].getPreco() + " do modelo " + produtos[atualCaro].getNome());
                System.out.println("Preço mais barato: " + produtos[atualBarato].getPreco() + " do modelo " + produtos[atualBarato].getNome());
        }
      
    }


public class Produto {

    private String nome;
    private double preco;

    public Produto(String nome, double preco) {
        this.nome = nome;
        this.preco = preco;
    }

    public double getPreco() {
        return preco;
    }

    public String getNome() {
        return nome;
    }
}

```

O que diminui significativamente nosso código e implementa menos variáveis intermediárias, agora para deixar ele mais simples vamos refatorar o código ao deixar ao fazer a função maisBarato e maisCaro da seguinte forma:

```java
private static int maisBarato(Produto[] produtos) {
    int maisBarato = 0;

    for(int atual = 0; atual <= 4; atual++){ 
        if(produtos[atual].getPreco() < produtos[maisBarato].getPreco()) { 
            maisBarato = atual;
        }            
    }
    return maisBarato;
}

private static int maisCaro(Produto[] produtos) {
    int maisCaro = 0;
    for(int atual = 0; atual <= 4; atual++){ 
        if(produtos[atual].getPreco() > produtos[maisCaro].getPreco()) { 
            maisCaro = atual;
        }            
    }
    return maisCaro;
}
```
Então vamos colocar eles dentro da função TesteMaioreMenorPreco da seguinte forma:

```java
public class TestaMenoreMaiorPreco {

        public static void main(String[] args) {


          
          Produto produtos[] = {    

 new Produto("Lamborghini", 1000000),
 new Produto("Jipe", 46000),
 new Produto("Brasília", 16000),
 new Produto("Smart", 46000),
 new Produto("Fusca", 17000)
            
          };

            int indexCaro = maisCaro(produtos);
            int indexBarato = maisBarato(produtos);


                System.out.println("Preço mais caro: " + produtos[indexCaro].getPreco() + " do modelo " + produtos[indexCaro].getNome());
                System.out.println("Preço mais barato: " + produtos[indexBarato].getPreco() + " do modelo " + produtos[indexBarato].getNome());

        }
  
  private static int maisBarato(Produto[] produtos) {
  
 int atual=0;
 int atualBarato= 0;  
  
              for(atual=0;atual<produtos.length;atual++) {
              

                if (produtos[atual].getPreco() < produtos[atualBarato].getPreco()) {
                    atualBarato = atual;
					}
              }
  return atualBarato;
}

private static int maisCaro(Produto[] produtos) {
  
int atual=0;
int atualCaro= 0;  
  
              for(atual=0;atual>produtos.length;atual++) {
              

                if (produtos[atual].getPreco() > produtos[atualCaro].getPreco()) {
                    atualCaro =atual;
					}
              }
  return atualCaro;
}
  
  
}

public class Produto {

    private String nome;
    private double preco;

    public Produto(String nome, double preco) {
        this.nome = nome;
        this.preco = preco;
    }

    public double getPreco() {
        return preco;
    }

    public String getNome() {
        return nome;
    }
}

```
Isso nos gera resultados:

```Resultados
Preço mais caro: 1000000.0 do modelo Lamborghini
Preço mais barato: 16000.0 do modelo Brasília
```

As vezes não é possível colocar o tamanho do vetor (seja por que a linguagem não tem essa função ou porque não podemos extrair essa informação mesmo), então mudamos nosso código de modo que temos que informar quando o vetor começa até quando ele termina, e adequar a função para esses valores

## Ordenação

Ordenar os vetores de acordo com um parâmetro é bastante importante, pois com eles podemos dizer quais são os três carros mais baratos e mais caros de uma lista de 5000 carros de modo bem rápido. Basta fazer um vetor de preços crescente e dizer quem são os três últimos desse vetor e os três primeiros.

### Selection Sort

Abaixo temos o código do Selection sort, que vê o array de carros, vê quem tem o menor preço e coloca ele na primeira casinha, trocando de posição em quem estava na primeira casinha anteriormente, e a medida que as casinhas vão passando eu vou analisando o resto de vetor que ainda falta arrumar.

```java
public class ComProduto {

  
  public static int maisBarato(Produto[] produtos,int inicio,int termino) {
  
 int atualBarato=inicio;
  
              for(int atual=inicio;atual<termino;atual++) {
              

                if (produtos[atual].getPreco() < produtos[atualBarato].getPreco()) {
                     atualBarato = atual;
					}
              }
  return atualBarato;
}


public static int maisCaro(Produto[] produtos,int inicio,int termino) {
    
  int atualCaro=inicio;
  
              for(int atual=inicio;atual<termino;atual++) {
              

                if (produtos[atual].getPreco() > produtos[atualCaro].getPreco()) {
                     atualCaro =atual;
					}
              }
  return atualCaro;
}
  
      public static Produto[] Ordem_Crescente(Produto[] produtos){ 
    
      for(int atual =0; atual < produtos.length; atual++) {
    int menor = maisBarato(produtos,atual, produtos.length);
    Produto produtoAtual = produtos[atual];
    Produto produtoMenor = produtos[menor];
    produtos[atual] = produtoMenor;
    produtos[menor] = produtoAtual; 
}
  return produtos;
      
    }
  
  
}



public class Produto {

    private String nome;
    private double preco;

    public Produto(String nome, double preco) {
        this.nome = nome;
        this.preco = preco;
    }

    public double getPreco() {
        return preco;
    }

    public String getNome() {
        return nome;
    }
}

	public class main{
        public static void main(String[] args) {


          
          Produto produtos[] = {    

 new Produto("Lamborghini", 1000000),
 new Produto("Jipe", 46000),
 new Produto("Brasília", 16000),
 new Produto("Smart", 46000),
 new Produto("Fusca", 17000)
            
          };
          

          Produto[] o= ComProduto.Ordem_Crescente(produtos);

            int indexCaro = ComProduto.maisCaro(produtos,0,produtos.length);
            int indexBarato = ComProduto.maisBarato(produtos,0,produtos.length);


                System.out.println("Preço mais caro: " + produtos[indexCaro].getPreco() + " do modelo " + produtos[indexCaro].getNome());
                System.out.println("Preço mais barato: " + produtos[indexBarato].getPreco() + " do modelo " + produtos[indexBarato].getNome());
System.out.println();
          
          for(int i=0;i<o.length;i++){
            
            System.out.println(o[i].getNome() + " custa " + o[i].getPreco());
            
          }
        }
}
```
Resultado:

```r
Preço mais caro: 1000000.0 do modelo Lamborghini
Preço mais barato: 16000.0 do modelo Brasília

Brasília custa 16000.0
Fusca custa 17000.0
Smart custa 46000.0
Jipe custa 46000.0
Lamborghini custa 1000000.0
```

Além de termos organizado tudo dentro de uma classe só chamada `ComProduto` e termos colocado nosso `main` do lado de fora da classe, nós também mudamos as funções `maisBarato` e `maisCaro` de modo a ter um valor de começo e de final, somente assim foi possível poder verificar o que vinha depois de termos colocado o `maisBarato` na primeira clase de um vetor produto `o` criado no nosso `main`.

Mais apesar dos apesares o método Selection Sort é considerado um método de seleção muito lento, pois imagina só, organizar um vetor de 500 posições com valores crescentes em um vetor ordenado decrescente, teríamos que fazer 500 operações até chegar no vetor que queremos, muito trabalhoso. Porém o selection sort é o mais tranquilo de entender e é um bom ponto de partida.

Na pasta tem o código do selection sort bonitinho. Ás vezes é comum ignorarmos a última troca, pois ele já está com o valor que queremos antes mesmo de chegarmos nele.

### Inserction Sort

Agora dentro da função ComProduto faremos outra função de ordenação crescente cujo código será:

```java
  public static Produto[] Ordem_Crescente2(Produto[] produtos){
    

    for(int atual = 0; atual < produtos.length; atual++) {
        int analise = atual;
        while(analise > 0 && produtos[analise].getPreco() < produtos[analise - 1].getPreco()) {
            Produto produtoAnalise = produtos[analise];
            Produto produtoAnaliseAnterior = produtos[analise -1];
            produtos[analise] = produtoAnaliseAnterior;
            produtos[analise -1] = produtoAnalise;
            analise--;
        
    }
      
}
    return produtos;
    
  }
```

A ideia aqui é olharmos para o vetor ordenado qualquer como [4,5,7,10,2], e queremos ordenar ele de modo a termos o menor na primeira posição e seguir de ordem crescente. Só que primeiro olharemos para a carta na posição 1 e depois para a de posição 0 e inverter a posição deles caso a carta em 1 seja menor do que a em 0. Caso contrário deixa quieto.

Depois avançamos para a posição 2 e vemos se a carta na posição 2 é menor do que a que está na posição 1, se for troque e veja se ela é menor do que a carta na posição 0, se não deixa quieto. A ideia é que na posição n, nós analisemos com n-1, se essa carta em n for menor troca, e vai trocando até esbarrar com uma carta que seja menor do que ela fazendo então com que pare. No final tudo estará organizado.

Atenção que a variável analise é usada tanto para ver produtos na posição[atual] como na posição[atual-1], portanto atual-1 tem que ser diferente de -1. O resultado é o mesmo porém de maneira mais otimizada.

Então pensando no vetor que escrevemos temos o seguinte passo a passo:

Bem, 5 é maior que 4, então deixa assim
7 é maior que 5 então deixa assim
10 é maior que 7 então
Opa, 2 é menor que 10 troca, opa 2 é menor que 7 troca, opa 2 é menor que 5 troca, 2 é menor que 4 troca, portanto o vetor arrumado fica [2,4,5,7,10]. 

O que acontece normalmente é começarmos a analisar desde a casinha numero 1, já que normalmente o caso onde a casinha é 0 não tem muito o que ser feito, então o código dessa função fica da seguinte forma:

```java
  public static Produto[] Ordem_Crescente2(Produto[] produtos){
    

    for(int atual = 1; atual < produtos.length; atual++) {
        int analise = atual;
        while(analise > 0 && produtos[analise].getPreco() < produtos[analise - 1].getPreco()) {
            Produto produtoAnalise = produtos[analise];
            Produto produtoAnaliseAnterior = produtos[analise -1];
            produtos[analise] = produtoAnaliseAnterior;
            produtos[analise -1] = produtoAnalise;
            analise--;
        
    }
      
}
    return produtos;
    
  }
```

Uma dica é criar uma função feita só para trocar os produtos de lugar, como:

```java
  public static void troca(Produto[] produto, int primeiro, int segundo){
  //troca primeiro com segundo
            Produto produtoAnalise = produto[primeiro];
            Produto produtoAnaliseAnterior = produto[segundo];
            produto[primeiro] = produtoAnaliseAnterior;
            produto[segundo] = produtoAnalise;
  
  
}
```

## Complexidade do Algoritmos

Todos os algoritmos requerem um esforço de memória para ser processado, e quanto temos um vetor de 10000000 de elementos para processar a qualidade do nosso código será de suma importância para grandes aplicações.

Existem diversos critérios de comparação de algoritmos, por exemplo dois: consumo de memória e o tempo para resolução do problema.

Em relação ao primeiro critério: Quanto o algoritmo precisa processar o nosso computador? Quantas contas ele precisa fazer? Quantas operações o algoritmo precisa fazer para terminar e retornar o resultado? Dada a entrada, veremos a saída. Isto significa que poderemos comparar o quanto de memória os algoritmos consomem e com base nisto, determinar: "Esse é o melhor, porque consome menos memória."

O tipo mais famoso de comparação que podemos fazer é o de desempenho de velocidade, que nos informa o quão rápido pode ser um algoritmo. Porém, vamos com calma... Como iremos medir a velocidade? Em segundos, em minutos ou em horas?

Então, qual unidade iremos usar? O computador é capaz de fazer contas, por isso iremos medir a velocidade a partir da quantidade de operações que o computador precisa fazer para encontrar a resolução de um algoritmo. Se precisarmos fazer 10 ou 9 operações, não faz muita diferença na velocidade. No entanto, se a variação for entre 10 e 1 bilhão de operações, a diferença será enorme!

O número de operações do código `maisBarato`, `maisCaro` está restrito em apenas um for e um if em sequência. Um for varre todo o array então se o array tiver n elementos então pelo menos ele vai ao menos fazer `n` operações e se o array tiver o azar de cair em todos os if então esse número será dobrado chegando a `2n`, então o número de operações que esse código vai ter está entre `n` e `2n` com n sendo o número de elementos dentro do array.

Agora analisando a complexidade do `Selection Sort`sabendo o algotimo `maisBarato` está dentro dele. Um `selectionSort` tem dois for's dentro dele (um de `buscaMenor` e outro de varredura do vetor) e ao fazer um for eu varro todo o vetor e dentro desse for eu tenho outro for que varre todo o vetor de novo, então no melhor caso onde o vetor já está organizados temos ao menos `n^2` (na verdade é `n^2+n` operações pois eu tenho que guardar um número dentro do if, porém esse n se torna irrelevante para um n muito grande) operações causadas pelos for's. Um n causado pelo método de busca e outro pela varredura (não contando aqui as trocas que dependendo do tamanho do vetor é irrelevante) e o pior caso é devido ao método Busca que nos dá uma complexidade máxima de `2n` deixando o `selectionSort` com uma complexidade máxima de `2n^2`. E a diferença é tão absurda entre uma complexidade quadrática e uma linear que não importa muito nem o fator constante de multiplicação no número de operações.

Então o preferível é que tenhamos algoritmos mais parecidos com um algorítimo linear, por ele ter menos operações do que um quadrático ou até cúbico. Pois quanto menos operações para realizar um operação mais rápido ele sera.

No insertion sort temos um for e um while dentro desse for, mas no pior caso o while acaba se comportando como um for passando por todos os elementos de novo (só qie da direita para a esquerda). Então o insertion sort também tem uma complexidade quadrática.

![Comparação entre algoritmos](/Ordenação/img/complexidade.png)
![Comparação entre algoritmos com um número menor de elementos](/Ordenação/img/complexidade1.png)

Por essas imagens conseguimos ver que o fator multiplicado como 2n^2 não interfere muito na complexidade de um algoritmo (pois para n^2 a diferneça entre os aplicativos lineares não é perceptível assim como muito menos e muito menos um algoritmo n+c fará diferença nesse gráfico).

## Existem algoritmos de ordenação que não são quadráticos e são próximos ao linear nesse mundão de Deus?

Sim existe haha, só que eles não são lineares, até por que o linear é simplão demais, pra isso vamos ver o crescimento exponencial.

Mas primeiros vamos passar pelos tempos possíveis, tempo constante, tenho um tempo constante quando queremos apenas dizer que está na posição n/2 em um array de n elementos. Esse algoritmo nos dá apenas um tempo fixo, não preciso fazer operações que varrem todo o vetor, é bem simples na real. Ou escrevemos O(1), a letra O representa essa complexidade de um algoritmo

Algoritmos de busca, tem complexidade logarítmica, e são usados em vetores já ordenados. (para buscar um valor e retornar onde ele está no nosso vetor), a ordem de complexidade desses algoritmos é de `nlog(n)`, é mais complexo que a linear mas bem melhor que as quadráticas por exemplo. (O(nlogn))

E uma complexidade que deve ser bom para atacar máquinas que `2^n` que para poucos elementos já nos dá um número imenso e absurdo de operações para fazer O(2^n )
