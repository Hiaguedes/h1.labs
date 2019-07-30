
void main() {

     TRISD.RD0= 0x00;
     PORTD.RD0= 1;
     CMCON=0X07;
      while(1){
        PORTD.RD0 = 0;
        delay_ms(100);
        PORTD.RD0 = 1;
        delay_ms(100);
      }
}