#line 1 "F:/Downloads/vAula100_WR_Files/vAula100_source_file.c"
#line 36 "F:/Downloads/vAula100_WR_Files/vAula100_source_file.c"
int display(int num);
int display_dp(int num);
long average_volt();
void volts();



long store=0;
long store_old=0;
long t_Volts;
long m_amps;
char control = 1;
int cen, dez, uni, mil;

 int counter = 0x00;

void interrupt()
{
 if(TMR0IF_bit)
 {
 TMR0IF_bit = 0x00;


 if(! RB3_bit  && control == 1)
 {
 control = 0x02;
  RB0_bit  = 0x00;
  RB1_bit  = 0x00;
  RB2_bit  = 0x00;
 PORTC = 0x00;
 mil = (m_amps/1000);
  RB3_bit  = 0x01;
 PORTC = display(mil);

 }

 else if(! RB2_bit  && control == 2)
 {
 control = 0x03;
  RB0_bit  = 0x00;
  RB1_bit  = 0x00;
  RB3_bit  = 0x00;
 PORTC = 0x00;
 cen = (m_amps%1000)/100;
  RB2_bit  = 0x01;
 PORTC = display(cen);

 }

 else if(! RB1_bit  && control == 3)
 {
 control = 0x04;
  RB0_bit  = 0x00;
  RB2_bit  = 0x00;
  RB3_bit  = 0x00;
 PORTC = 0x00;
 dez = (m_amps%100)/10;
  RB1_bit  = 0x01;
 PORTC = display(dez);

 }

 else if(! RB0_bit  && control == 4)
 {
 control = 0x01;
  RB1_bit  = 0x00;
  RB2_bit  = 0x00;
  RB3_bit  = 0x00;
 PORTC = 0x00;
 uni = m_amps%10;
  RB0_bit  = 0x01;
 PORTC = display(uni);
 }

 }

}



void main()
{
 ADCON0 = 0x01;
 ADCON1 = 0x0E;
 CMCON = 0x07;
 INTCON = 0xA0;
 OPTION_REG = 0x83;

 TRISB = 0xF0;
 TRISC = 0x00;
 PORTB = 0xF0;
 PORTC = 0x00;


 while(1)
 {

 volts();
 delay_ms(200);

 }

}







int display(int num)
{
 int cathode;


 int SEGMENTO[10] = {0x3F,
 0x06,
 0x5B,
 0x4F,
 0x66,
 0x6D,
 0x7D,
 0x07,
 0x7F,
 0x67};

 cathode = SEGMENTO[num];

 return(cathode);

}

int display_dp(int num)
{
 int cathode;


 int SEGMENTO[10] = {0xBF,
 0x86,
 0xDB,
 0xCF,
 0xE6,
 0xEd,
 0xFd,
 0x87,
 0xFF,
 0xE7};

 cathode = SEGMENTO[num];

 return(cathode);

}

void volts()
{
 store_old=store;
 store = average_volt();
 t_Volts = (store*183 )/37;
 t_Volts = t_Volts*1000;
 m_amps = t_Volts/ 10000 ;


}

long average_volt()
{
 unsigned char i;
 long volt_store = 0;

 for(i=0; i<100; i++)
 {
 volt_store += ADC_Read(0);
 }

 return(volt_store/100);

}
