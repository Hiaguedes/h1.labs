#line 1 "C:/Users/Hiago/Desktop/h1.labs/Video x4- Inversor de Frequencia/Gerando Senoide com Microcontrolador/MyProject.c"

 int i;

void senoide();

 void interrupt(){
 if(TMR0IF_bit){

 TMR0IF_bit = 0x00;
 senoide();
 }
 }

void main() {

 CMCON = 0x07;
 ADCON0 = 0x00;
 ANSEL = 0x00;
 TRISIO = 0x00;

 OPTION_REG = 0b10000000;


 TMR0 = 100;
 INTCON = 0xA0;


}



void senoide(){

 for(i=-180;i<=180;i++){


  GPIO.F0 = sinE3(i*3.1415/180.0)*(255.0/2.0);
 }
 }
