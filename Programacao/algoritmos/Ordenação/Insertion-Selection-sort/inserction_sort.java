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
      troca(produtos,atual,menor); 
}
  return produtos;
      
    }
 
        public static Produto[] Ordem_Decrescente(Produto[] produtos){ 
    
      for(int atual =0; atual < produtos.length; atual++) {
    int menor = maisCaro(produtos,atual, produtos.length);
      troca(produtos,atual,menor); 
}
  return produtos;
      
    }
  
  public static Produto[] Ordem_Crescente2(Produto[] produtos){
    

    for(int atual = 1; atual < produtos.length; atual++) {
        int analise = atual;
        while(analise > 0 && produtos[analise].getPreco() < produtos[analise - 1].getPreco()) {
			troca(produtos,analise,analise-1);
            analise--;
        
    }
      
}
    return produtos;
    
  }
  
    public static Produto[] Ordem_Decrescente2(Produto[] produto){
    

    for(int atual = 1; atual < produto.length; atual++) {
        int analise = atual;
        while(analise > 0 && produto[analise].getPreco() > produto[analise - 1].getPreco()) {
		troca(produto,analise,analise-1);
            analise--;
        
    }
      
}
    return produto;
    
  }
  
  public static void troca(Produto[] produto, int primeiro, int segundo){
  //troca primeiro com segundo
            Produto primeiroProduto = produto[primeiro];
            Produto segundoProduto = produto[segundo];
            produto[primeiro] = segundoProduto;
            produto[segundo] = primeiroProduto;
  
  
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
          

          Produto[] o= ComProduto.Ordem_Crescente2(produtos);


          
          for(int i=0;i<o.length;i++){
            
            System.out.println(o[i].getNome() + " custa " + o[i].getPreco());
            
          }

          
        }
}

