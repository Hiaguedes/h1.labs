 #define saida GPIO.F0
 int i;
 
void senoide();

 void interrupt(){
    if(TMR0IF_bit){

      TMR0IF_bit = 0x00;
      senoide();
     }
 }

void main() {

   CMCON  = 0x07; // Disable Comparator
   ADCON0 = 0x00; // Disable ADC
   ANSEL  = 0x00; // All ports in digital
   TRISIO = 0x00; // All pins in OUT

   OPTION_REG  = 0b10000000;  // Configuration 1000 0101
                        // (1)000 0111 GPPU = GPIO pull-ups are disabled
                        // 10000(101) PS2,PS1,PS = 1:64 prescaler TMR0 rate
   TMR0        = 100;   // 100Hz or 9,984ms ~ 10ms (10ms x 100 = 1000ms)
   INTCON      = 0xA0;  //


}



void senoide(){

 for(i=-180;i<=180;i++){
 //float seno;
    //seno=  sinE3(i*3.1415/180.0);
    saida=  sinE3(i*3.1415/180.0)*(255.0/2.0);
 }
 }