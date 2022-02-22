import random

def jogar():
    print('---------------| Jogo da Adivinhação |---------------')
    print('*****************************************************', end="\n\n")

    correct =  False
    # numero_secreto = round(random.random() * 100) # random gera um numero entre 0 e 1 
    numero_secreto = random.randrange(0,101)
    tentativas = 0
    points = 100

    while(correct != True):
        numero_escrito = int(input('Digite um número entre 1 e 100: '))

        if(numero_escrito < 0 or numero_escrito > 100):
            print('por favor escreva um número entre 0 e 100')
            continue
        if(numero_secreto == numero_escrito):
            print('Você acertou!', end="\n\n")
            correct = True

        elif(numero_secreto > numero_escrito):
            print('Você errou, o número correto é maior que o escrito', end="\n\n")

        elif(numero_secreto < numero_escrito):
            print('Você errou, o número correto é menor que o escrito', end="\n\n")
        
        points = points - abs(numero_secreto - numero_escrito)
        tentativas = tentativas + 1

    print("numero de tentativas: {}".format(tentativas), end="\n\n")
    print("numero de pontos: {}".format(points), end="\n\n")

if(__name__ == '__main__'):
    jogar()