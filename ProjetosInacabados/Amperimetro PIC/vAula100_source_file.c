/*
   Amper�metro com PIC e display 7 segmentos catodo comum

   MCU: PIC16F876A   Clock: 4MHz

   Descri��o: Mede a tens�o na entrada AN0 e converte em Amp�res a partir de uma resist�ncia de desvio.

   Projetou-se um divisor de tens�o para medir tens�es de 0 a 40V.

   O display � atualizado a cada estouro do TMR0

   Prescaler configurado para 1:16

   Ciclo de m�quina = 1us


    Autor: Eng. Wagner Rambo   Data: Janeiro de 2016

    www.wrkits.com.br | youtube.com/user/canalwrkits | facebook.com/wrkits


*/

// --- Mapeamento de Hardware ---
#define dig_uni  RB0_bit                       //D�gito das unidades no RB0
#define dig_dez  RB1_bit                       //D�gito das dezenas no RB1
#define dig_cen  RB2_bit                       //D�gito das centenas no RB2
#define dig_mil  RB3_bit                       //D�gito das milhares no RB3


// --- Constantes do Projeto ---
#define shunt    10000                          //Resist�ncia de desvio igual a 0.47 ohm


// --- Prot�tipo das Fun��es Auxiliares ---
int display(int num);                          //Exibe o valor correspondente no display de catodo comum
int display_dp(int num);                       //Exibe o valor correspondente no display adicionando o ponto decimal
long average_volt();                           //Retorna a m�dia de 100 leituras de tens�o
void volts();                                  //Calcula a tens�o em Volts


// --- Vari�vei Globais ---
long store=0;                                    //Armazena a m�dia de 100 leituras de tens�o
long store_old=0;
long t_Volts;                                  //Armazena tens�o em Volts
long m_amps;                                   //Armazena a corrente em mili Amp�res
char control = 1;                              //Vari�vel de controle (para saber qual display est� ativo)
int cen, dez, uni, mil;                        //Vari�veis auxiliares para dados nos displays

          int counter = 0x00;
// --- Rotina de Interrup��o ---
void interrupt()
{
     if(TMR0IF_bit)                            //Houve o estouro do TMR0?
     {
        TMR0IF_bit = 0x00;                     //Sim, limpa a flag


        if(!dig_mil && control == 1)           //D�gito dos milhares desligado?
        {                                      //Vari�vel de controle igual a 1?
           control = 0x02;                     //Sim, control recebe o valor 2
           dig_uni = 0x00;                     //Apaga d�gito das unidades
           dig_dez = 0x00;                     //Apaga d�gito das dezenas
           dig_cen = 0x00;                     //Apaga d�gito das centenas
           PORTC   = 0x00;                     //Desliga PORTC
           mil = (m_amps/1000);               //Calcula o d�gito do milhar
           dig_mil = 0x01;                     //Ativa d�gito dos milhares
           PORTC   = display(mil);             //Escreve o valor no display dos milhares

        } //end if dig_mil

        else if(!dig_cen && control == 2)      //D�gito das centenas desligado?
        {                                      //Vari�vel de controle igual a 2?
            control = 0x03;                    //Sim, control recebe o valor 3
            dig_uni = 0x00;                    //Apaga o d�gito das unidades
            dig_dez = 0x00;                    //Apaga o d�gito das dezenas
            dig_mil = 0x00;                    //Apaga o d�gito dos milhares
            PORTC   = 0x00;                    //Desliga PORTC
            cen = (m_amps%1000)/100;          //Calcula o d�gito das centenas
            dig_cen = 0x01;                    //Ativa d�gito das centenas
            PORTC   = display(cen);            //Escreve o valor no display das centenas

        } //end if dig_cen

        else if(!dig_dez && control == 3)      //D�gito das dezenas desligado?
        {                                      //Vari�vel de controle igual a 3?
            control = 0x04;                    //Sim, control recebe o valor 4
            dig_uni = 0x00;                    //Apaga o d�gito das unidades
            dig_cen = 0x00;                    //Apaga o d�gito das centenas
            dig_mil = 0x00;                    //Apaga o d�gito dos milhares
            PORTC   = 0x00;                    //Desliga PORTC
            dez = (m_amps%100)/10;            //Calcula o d�gito das dezenas
            dig_dez = 0x01;                    //Ativa d�gito das dezenas
            PORTC   = display(dez);            //Escreve o valor no display das dezenas

        } //end if dig_dez

        else if(!dig_uni && control == 4)      //D�gito das unidades desligado?
        {                                      //Vari�vel de controle igual a 4?
            control = 0x01;                    //Sim, control recebe o valor 1 (para encerrar a l�gica)
            dig_dez = 0x00;                    //Apaga o d�gito das dezenas
            dig_cen = 0x00;                    //Apaga o d�gito das centenas
            dig_mil = 0x00;                    //Apaga o d�gito dos milhares
            PORTC   = 0x00;                    //Desliga PORTC
            uni = m_amps%10;                  //Calcula o d�gito das unidades
            dig_uni = 0x01;                    //Ativa d�gito das unidades
            PORTC   = display(uni);            //Escreve o valor no display das unidades
        }    //end if dig_uni

     } //end if (teste de estouro)

} //end interrupt


// --- Fun��o Principal ---
void main()
{
     ADCON0     = 0x01;                        //Aciona o m�dulo conversor AD, Canal AN0
     ADCON1     = 0x0E;                        //Entrada AN0 como anal�gica
     CMCON      = 0x07;                        //Desabilita comparadores
     INTCON     = 0xA0;                        //Interrup��o global, habilita interrup��o do Timer0
     OPTION_REG = 0x83;                        //Timer0 incrementa pelo ciclo de m�quina
                                               //Prescaler configurado para 1:16
     TRISB      = 0xF0;                        //Configura TRISB<7:4> como entrada, TRISB<3:0> como sa�da
     TRISC      = 0x00;                        //Configura todo PORTC como sa�da
     PORTB      = 0xF0;                        //Inicializa PORTB (d�gitos desligados)
     PORTC      = 0x00;                        //Inicializa PORTC (segmentos desligados), RBC em n�vel alto

// --- Loop infinito ---
     while(1)
     {

       volts();                                //Chama a fun��o para c�lculo da tens�o em Volts
       delay_ms(200);                          //taxa de atualiza��o

     } //end while

} //end main


// --- Desenvolvimento das Fun��es Auxiliares ---

//Esta fun��o acha o bit pertinente a cathode (matrix de bits) para ser enviado
//para o PORTC e mostrar um n�mero no display de 7 segmentos. O n�mero
//� passado como um par�metro para a fun��o.
int display(int num)
{
    int cathode;                               //armazena c�digo BCD

    //-- Vetor para o c�digo BCD --
    int SEGMENTO[10] = {0x3F,                  //BCD zero   '0'
                        0x06,                  //BCD um     '1'
                        0x5B,                  //BCD dois   '2'
                        0x4F,                  //BCD tr�s   '3'
                        0x66,                  //BCD quatro '4'
                        0x6D,                  //BCD cinco  '5'
                        0x7D,                  //BCD seis   '6'
                        0x07,                  //BCD sete   '7'
                        0x7F,                  //BCD oito   '8'
                        0x67};                 //BCD nove   '9'

    cathode = SEGMENTO[num];                   //para retornar o cathode

    return(cathode);                           //retorna o n�mero BCD

} //end display

int display_dp(int num)                        //Adiciona o ponto decimal
{
    int cathode;                               //armazena c�digo BCD

    //Vetor para o c�digo BCD
    int SEGMENTO[10] = {0xBF,                  //BCD zero   '0.'
                        0x86,                  //BCD um     '1.'
                        0xDB,                  //BCD dois   '2.'
                        0xCF,                  //BCD tr�s   '3.'
                        0xE6,                  //BCD quatro '4.'
                        0xEd,                  //BCD cinco  '5.'
                        0xFd,                  //BCD seis   '6.'
                        0x87,                  //BCD sete   '7.'
                        0xFF,                  //BCD oito   '8.'
                        0xE7};                 //BCD nove   '9.'

    cathode = SEGMENTO[num];                   //para retornar o cathode

    return(cathode);                           //retorna o n�mero BCD

} //end display

void volts()                                   //Fun��o para c�lculo da tens�o em Volts
{
     store_old=store;
     store = average_volt();                   //Recebe o valor m�dio da tens�o retornado pela fun��o average_volts()
     t_Volts = (store*183 )/37;               //Converte o valor para Volts
     t_Volts = t_Volts*1000;
     m_amps = t_Volts/shunt;


} //end celsius

long average_volt()                            //Fun��o que calcula a m�dia de 100 leituras de tens�o
{                                              //Garante maior precis�o na medida
     unsigned char i;                          //Vari�vel de itera��es
     long volt_store = 0;                      //Vari�vel local para armazenar o valor da tens�o

     for(i=0; i<100; i++)                      //Somat�rio de 100 leituras
     {
              volt_store += ADC_Read(0);       //temp_store = temp_store + ADC_Read(0) (faz o somat�rio das 100 itera��es)
     }

     return(volt_store/100);                   //retorna a m�dia das itera��es

} //end average_temp