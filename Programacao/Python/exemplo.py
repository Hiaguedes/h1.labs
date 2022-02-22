import random

for i in range(0,10):
    if(i%2 == 0):
        continue
    print(i)

print(0.1+0.2)

print('O saldo é de R$ {:.2f}'.format(123.9))

print('Data: {:02d}/{:02d}'.format(9,12))

#print(round(random.random() * 100))

print('Número aleatório',random.randrange(0,101))