/*
   Amperímetro com PIC e display 7 segmentos catodo comum

   MCU: PIC16F876A   Clock: 4MHz

   Descrição: Mede a tensão na entrada AN0 e converte em Ampères a partir de uma resistência de desvio.

   Projetou-se um divisor de tensão para medir tensões de 0 a 40V.

   O display é atualizado a cada estouro do TMR0

   Prescaler configurado para 1:16

   Ciclo de máquina = 1us


    Autor: Eng. Wagner Rambo   Data: Janeiro de 2016

    www.wrkits.com.br | youtube.com/user/canalwrkits | facebook.com/wrkits


*/

// --- Mapeamento de Hardware ---
#define dig_uni  RB0_bit                       //Dígito das unidades no RB0
#define dig_dez  RB1_bit                       //Dígito das dezenas no RB1
#define dig_cen  RB2_bit                       //Dígito das centenas no RB2
#define dig_mil  RB3_bit                       //Dígito das milhares no RB3


// --- Constantes do Projeto ---
#define shunt    10000                          //Resistência de desvio igual a 0.47 ohm


// --- Protótipo das Funções Auxiliares ---
int display(int num);                          //Exibe o valor correspondente no display de catodo comum
int display_dp(int num);                       //Exibe o valor correspondente no display adicionando o ponto decimal
long average_volt();                           //Retorna a média de 100 leituras de tensão
void volts();                                  //Calcula a tensão em Volts


// --- Variávei Globais ---
long store=0;                                    //Armazena a média de 100 leituras de tensão
long store_old=0;
long t_Volts;                                  //Armazena tensão em Volts
long m_amps;                                   //Armazena a corrente em mili Ampères
char control = 1;                              //Variável de controle (para saber qual display está ativo)
int cen, dez, uni, mil;                        //Variáveis auxiliares para dados nos displays

          int counter = 0x00;
// --- Rotina de Interrupção ---
void interrupt()
{
     if(TMR0IF_bit)                            //Houve o estouro do TMR0?
     {
        TMR0IF_bit = 0x00;                     //Sim, limpa a flag


        if(!dig_mil && control == 1)           //Dígito dos milhares desligado?
        {                                      //Variável de controle igual a 1?
           control = 0x02;                     //Sim, control recebe o valor 2
           dig_uni = 0x00;                     //Apaga dígito das unidades
           dig_dez = 0x00;                     //Apaga dígito das dezenas
           dig_cen = 0x00;                     //Apaga dígito das centenas
           PORTC   = 0x00;                     //Desliga PORTC
           mil = (m_amps/1000);               //Calcula o dígito do milhar
           dig_mil = 0x01;                     //Ativa dígito dos milhares
           PORTC   = display(mil);             //Escreve o valor no display dos milhares

        } //end if dig_mil

        else if(!dig_cen && control == 2)      //Dígito das centenas desligado?
        {                                      //Variável de controle igual a 2?
            control = 0x03;                    //Sim, control recebe o valor 3
            dig_uni = 0x00;                    //Apaga o dígito das unidades
            dig_dez = 0x00;                    //Apaga o dígito das dezenas
            dig_mil = 0x00;                    //Apaga o dígito dos milhares
            PORTC   = 0x00;                    //Desliga PORTC
            cen = (m_amps%1000)/100;          //Calcula o dígito das centenas
            dig_cen = 0x01;                    //Ativa dígito das centenas
            PORTC   = display(cen);            //Escreve o valor no display das centenas

        } //end if dig_cen

        else if(!dig_dez && control == 3)      //Dígito das dezenas desligado?
        {                                      //Variável de controle igual a 3?
            control = 0x04;                    //Sim, control recebe o valor 4
            dig_uni = 0x00;                    //Apaga o dígito das unidades
            dig_cen = 0x00;                    //Apaga o dígito das centenas
            dig_mil = 0x00;                    //Apaga o dígito dos milhares
            PORTC   = 0x00;                    //Desliga PORTC
            dez = (m_amps%100)/10;            //Calcula o dígito das dezenas
            dig_dez = 0x01;                    //Ativa dígito das dezenas
            PORTC   = display(dez);            //Escreve o valor no display das dezenas

        } //end if dig_dez

        else if(!dig_uni && control == 4)      //Dígito das unidades desligado?
        {                                      //Variável de controle igual a 4?
            control = 0x01;                    //Sim, control recebe o valor 1 (para encerrar a lógica)
            dig_dez = 0x00;                    //Apaga o dígito das dezenas
            dig_cen = 0x00;                    //Apaga o dígito das centenas
            dig_mil = 0x00;                    //Apaga o dígito dos milhares
            PORTC   = 0x00;                    //Desliga PORTC
            uni = m_amps%10;                  //Calcula o dígito das unidades
            dig_uni = 0x01;                    //Ativa dígito das unidades
            PORTC   = display(uni);            //Escreve o valor no display das unidades
        }    //end if dig_uni

     } //end if (teste de estouro)

} //end interrupt


// --- Função Principal ---
void main()
{
     ADCON0     = 0x01;                        //Aciona o módulo conversor AD, Canal AN0
     ADCON1     = 0x0E;                        //Entrada AN0 como analógica
     CMCON      = 0x07;                        //Desabilita comparadores
     INTCON     = 0xA0;                        //Interrupção global, habilita interrupção do Timer0
     OPTION_REG = 0x83;                        //Timer0 incrementa pelo ciclo de máquina
                                               //Prescaler configurado para 1:16
     TRISB      = 0xF0;                        //Configura TRISB<7:4> como entrada, TRISB<3:0> como saída
     TRISC      = 0x00;                        //Configura todo PORTC como saída
     PORTB      = 0xF0;                        //Inicializa PORTB (dígitos desligados)
     PORTC      = 0x00;                        //Inicializa PORTC (segmentos desligados), RBC em nível alto

// --- Loop infinito ---
     while(1)
     {

       volts();                                //Chama a função para cálculo da tensão em Volts
       delay_ms(200);                          //taxa de atualização

     } //end while

} //end main


// --- Desenvolvimento das Funções Auxiliares ---

//Esta função acha o bit pertinente a cathode (matrix de bits) para ser enviado
//para o PORTC e mostrar um número no display de 7 segmentos. O número
//é passado como um parâmetro para a função.
int display(int num)
{
    int cathode;                               //armazena código BCD

    //-- Vetor para o código BCD --
    int SEGMENTO[10] = {0x3F,                  //BCD zero   '0'
                        0x06,                  //BCD um     '1'
                        0x5B,                  //BCD dois   '2'
                        0x4F,                  //BCD três   '3'
                        0x66,                  //BCD quatro '4'
                        0x6D,                  //BCD cinco  '5'
                        0x7D,                  //BCD seis   '6'
                        0x07,                  //BCD sete   '7'
                        0x7F,                  //BCD oito   '8'
                        0x67};                 //BCD nove   '9'

    cathode = SEGMENTO[num];                   //para retornar o cathode

    return(cathode);                           //retorna o número BCD

} //end display

int display_dp(int num)                        //Adiciona o ponto decimal
{
    int cathode;                               //armazena código BCD

    //Vetor para o código BCD
    int SEGMENTO[10] = {0xBF,                  //BCD zero   '0.'
                        0x86,                  //BCD um     '1.'
                        0xDB,                  //BCD dois   '2.'
                        0xCF,                  //BCD três   '3.'
                        0xE6,                  //BCD quatro '4.'
                        0xEd,                  //BCD cinco  '5.'
                        0xFd,                  //BCD seis   '6.'
                        0x87,                  //BCD sete   '7.'
                        0xFF,                  //BCD oito   '8.'
                        0xE7};                 //BCD nove   '9.'

    cathode = SEGMENTO[num];                   //para retornar o cathode

    return(cathode);                           //retorna o número BCD

} //end display

void volts()                                   //Função para cálculo da tensão em Volts
{
     store_old=store;
     store = average_volt();                   //Recebe o valor médio da tensão retornado pela função average_volts()
     t_Volts = (store*183 )/37;               //Converte o valor para Volts
     t_Volts = t_Volts*1000;
     m_amps = t_Volts/shunt;


} //end celsius

long average_volt()                            //Função que calcula a média de 100 leituras de tensão
{                                              //Garante maior precisão na medida
     unsigned char i;                          //Variável de iterações
     long volt_store = 0;                      //Variável local para armazenar o valor da tensão

     for(i=0; i<100; i++)                      //Somatório de 100 leituras
     {
              volt_store += ADC_Read(0);       //temp_store = temp_store + ADC_Read(0) (faz o somatório das 100 iterações)
     }

     return(volt_store/100);                   //retorna a média das iterações

} //end average_temp