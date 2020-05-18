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

```Resultado
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
