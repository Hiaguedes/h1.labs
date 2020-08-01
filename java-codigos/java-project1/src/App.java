public class App {
    public static void main(String[] args) throws Exception {
        int num = soma(1, 2);
        System.out.println("Hello, World!" + " " + num);

        for (int i = 0; i < 5; i++) {
            System.out.println(i);
        }

        double valorDivisao = divide(5, 3);

        System.out.println(valorDivisao);

        String bordao = "Oi eu sou o goku!";

        System.out.println(bordao);

        verificaIdade(30,1);
        verificaIdade(14,1);
        verificaIdade(15,2);
        verificaIdade(45,2);

        while(true){
            System.out.println("kooo");
            break;
        }

    }

    public static int soma(int num1, int num2) {
        return num1 + num2;
    }

    public static double divide(double num1, double num2) {
        return num1 / num2;
    }

    public static void verificaIdade(int idade, int qtde) {
        if (idade >= 18 || qtde>1)
            System.out.println("Pode entrar");
        else if(idade<18 && qtde==1)
            System.out.println("Não pode entrar");
    }
}
