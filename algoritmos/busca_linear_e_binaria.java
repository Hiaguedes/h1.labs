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
  

  private static int organiza(Nota[] notas, int inicio,int termino){
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

    private static void troca(Nota[] nota, int primeiro, int segundo){
  //troca primeiro com segundo
            Nota primeiroNota = nota[primeiro];
            Nota segundoNota = nota[segundo];
            nota[primeiro] = segundoNota;
            nota[segundo] = primeiroNota;
  
}

public static void quick_sort(Nota[] nota,int inicio,int termino){
int ele=termino-inicio;
if( ele>1){
   int posPivo= organiza(nota,inicio,termino);
   quick_sort(nota,inicio,posPivo);
   quick_sort(nota,posPivo+1,termino);
}
}

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
  
}

  public class busca{

public static int linear(Nota[] nota,int inicio, int termino, double busca){

	for(int atual=inicio; atual<termino; atual++){

	if(nota[atual].getNota() == busca){return atual;}

}
return -1;
}

public static int binaria(Nota[] nota,int inicio, int termino, double busca){

  int meio = (inicio+termino)/2;

if(inicio>termino){return -1;}

 if(nota[meio].getNota()== busca){return meio;}
 
 if(nota[meio].getNota() < busca){return binaria(nota,meio+1,termino,busca);}

return binaria(nota,inicio,meio-1,busca);
  
}

public static int binaria_nome(Nota[] nota,int inicio, int termino, String busca){

  int meio = (inicio+termino)/2;

if(inicio>termino){return -1;}

 if(nota[meio].getNome().compareTo(busca)==0){return meio;}
 
 if(nota[meio].getNome().compareTo(busca)<0){return binaria_nome(nota,meio+1,termino,busca);}

return binaria_nome(nota,inicio,meio-1,busca);
  
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

quick.quick_sort_nome(vetor3,0,vetor3.length);

for(Nota nota:vetor3){
    System.out.println(nota.getNome() +"  "+ nota.getNota());
}
      
      System.out.println();

int a = busca.binaria_nome(vetor3, 0,vetor3.length,"Geovanna");

if(a>=0){
System.out.println("O nome está na posição: " + a );
}else{System.out.println("Não encontrei o nome :(");}

    }
}