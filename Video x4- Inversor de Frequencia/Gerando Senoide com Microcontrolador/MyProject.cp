#line 1 "C:/Users/Hiago/Desktop/h1.labs/h1.labs/Video x4- Inversor de Frequencia/Gerando Senoide com Microcontrolador/MyProject.c"

 int i;

 void interrupt(){
 if(TMR0IF_bit){

 TMR0IF_bit = 0x00;

 for(i=-180;i<=180;i++){
  GPIO.F0 = 127+ sinE3(i*0.0174)*(127.5);
 }
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
