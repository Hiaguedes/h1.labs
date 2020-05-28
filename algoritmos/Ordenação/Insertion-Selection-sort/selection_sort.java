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
 
        public static Produto[] Ordem_Decrescente(Produto[] produtos){ 
    
      for(int atual =0; atual < produtos.length; atual++) {
    int menor = maisCaro(produtos,atual, produtos.length);
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
          Produto[] o1= ComProduto.Ordem_Decrescente(produtos);

            int indexCaro = ComProduto.maisCaro(produtos,0,produtos.length);
            int indexBarato = ComProduto.maisBarato(produtos,0,produtos.length);


                System.out.println("Preço mais caro: " + produtos[indexCaro].getPreco() + " do modelo " + produtos[indexCaro].getNome());
                System.out.println("Preço mais barato: " + produtos[indexBarato].getPreco() + " do modelo " + produtos[indexBarato].getNome());
System.out.println();
          
          for(int i=0;i<o.length;i++){
            
            System.out.println(o[i].getNome() + " custa " + o[i].getPreco());
            
          }
          
          System.out.println();
          
                    for(int i=0;i<o.length;i++){
            
            System.out.println(o1[i].getNome() + " custa " + o1[i].getPreco());
            
          }
        }
}