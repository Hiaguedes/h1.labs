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
  

  private static Nota[] intercala(Nota[] vetor1,int inicial, int miolo, int termino){
    
    
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

  public static void merge_sort(Nota[] notas,int inicial, int termino){
  int qtde= termino-inicial;

  if(qtde>1){

  int meio=(inicial+termino)/2;
  merge_sort(notas,inicial,meio);
  merge_sort(notas,meio,termino);

intercala(notas, inicial,meio,termino);
}
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
          

            
      Merge.merge_sort_nomes(vetor3,0,9);
          
         for(Nota nota:vetor3){
          System.out.println(nota.getNome() +" "+ nota.getNota());
          }          
        }
    }
