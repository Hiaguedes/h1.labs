# java

Para usar o java no vscode, aperte `CTRL + SHIFT + P` e digite java e vá em create java project

E lembre-se JRE é diferente de JDK, o primeiro é só o visualizador o segundo é o visualizador mais bibliotecas e mais a plataforma de desenvolvimento.

## modo roots

O arquivo .java vai ser compilado com o programa no prompt `javac` e o arquivo .class vai ser lido pelo `JVM` (java virtual machine) com o comando `java`

## Coisas que não sabia

casting -> colocar um valor de uma atributo que foi declarado como double dentro de um valor que foi declarado como int, para isso fazemos

```java
double salario=2250.75;
int valor = (int) salario;
```

Isso pode ser feito o valor fica igual a 2250

digitando sysout `CTRL+ Space` temos o `System.ou.println()` e digitando `main` e `ALT + Space` temos o `public static main(String[] args)`

Dessa vez, João fez uma implementação para calcular o salário de um funcionário em caso de promoção. Ele fez a seguinte implementação:

```java
public class TesteSalario {

    public static void main(String[] args) {

        boolean foiPromovido = true;

        if(foiPromovido) {
            double salario = 4200.0;
        } else {
            double salario = 3800.0;
        }

        System.out.println(salario);
    }
}
```

O código nem compila, pois fora do bloco if/else a variável salario não existe mais.

Correto, a variável salario só é visível dentro do bloco if/else. Pois a variável salario está dentro somente daquele escopo (bloco) e não fora dela

## Coisas que não pode esquecer

Lembre-se, uma String é declarada com aspas duplas " e pode ter zero ou mais caracteres. Um char é declarado com aspas simples ' e pode usar apenas um caractere!

Veja o código abaixo:

```java
int idade = 68;
boolean ehIdoso = idade >= 65;
```

Executando esse código corretamente dentro de um método main, qual será o valor da variável ehIdoso?

`true`

Pois imagina dentro do if que temos `idade>=65` isso retorna true, eu posso usar isso para setar um booleano sem problemas

### O switch

Implementação

```java
public class TestaMes {

    public static void main(String[] args) {

        int mes = 10;

        switch (mes) {
            case 1:
                System.out.println("O mês é Janeiro");
                break;
            case 2:
                System.out.println("O mês é Fevereiro");
                break;
            case 3:
                System.out.println("O mês é Março");
                break;
            case 4:
                System.out.println("O mês é Abril");
                break;
            case 5:
                System.out.println("O mês é Maio");
                break;
            case 6:
                System.out.println("O mês é Junho");
                break;
            case 7:
                System.out.println("O mês é Julho");
                break;
            case 8:
                System.out.println("O mês é Agosto");
                break;
            case 9:
                System.out.println("O mês é Setembro");
                break;
            case 10:
                System.out.println("O mês é Outubro");
                break;
            case 11:
                System.out.println("O mês é Novembro");
                break;
            case 12:
                System.out.println("O mês é Dezembro");
                break;
            default:
                System.out.println("Mês inválido");
                break;
        }
    }
}
```
