unsigned const short Alphabet[156]={   //26*6
                                     0x7f, 0x88, 0x88, 0x88, 0x88, 0x7f,  // A
                                     0xff, 0x91, 0x91, 0x91, 0x91, 0x6e,  // B
                                     0x7e, 0x81, 0x81, 0x81, 0x81, 0x42,  // C
                                     0xff, 0x81, 0x81, 0x81, 0x81, 0x7e,  // D
                                     0x81, 0xff, 0x91, 0x91, 0x91, 0x91,  // E
                                     0x81, 0xff, 0x91, 0x90, 0x90, 0x80,  // F
                                     0x7e, 0x81, 0x81, 0x89, 0x89, 0x4e,  // G
                                     0xff, 0x10, 0x10, 0x10, 0x10, 0xff,  // H
                                     0x00, 0x81, 0xff, 0xff, 0x81, 0x00,  // I
                                     0x06, 0x01, 0x81, 0xfe, 0x80, 0x00,  // J
                                     0x81, 0xff, 0x99, 0x24, 0xc3, 0x81,  // K
                                     0x81, 0xff, 0x81, 0x01, 0x01, 0x03,  // L
                                     0xff, 0x60, 0x18, 0x18, 0x60, 0xff,  // M
                                     0xff, 0x60, 0x10, 0x08, 0x06, 0xff,  // N
                                     0x7e, 0x81, 0x81, 0x81, 0x81, 0x7e,  // O
                                     0x81, 0xff, 0x89, 0x88, 0x88, 0x70,  // P
                                     0x7e, 0x81, 0x85, 0x89, 0x87, 0x7e,  // Q
                                     0xff, 0x98, 0x98, 0x94, 0x93, 0x61,  // R
                                     0x62, 0x91, 0x91, 0x91, 0x91, 0x4e,  // S
                                     0xc0, 0x81, 0xff, 0xff, 0x81, 0xc0,  // T
                                     0xfe, 0x01, 0x01, 0x01, 0x01, 0xfe,  // U
                                     0xfc, 0x02, 0x01, 0x01, 0x02, 0xfc,  // V
                                     0xff, 0x02, 0x04, 0x04, 0x02, 0xff,  // W
                                     0xc3, 0x24, 0x18, 0x18, 0x24, 0xc3,  // X
                                     0xc0, 0x20, 0x1f, 0x1f, 0x20, 0xc0,  // Y
                                     0xc3, 0x85, 0x89, 0x91, 0xa1, 0xc3,  // Z
                                     };
           unsigned const short Nums[60]={
                                     0x00 , 0x7E , 0xA1 , 0x91 , 0x89 , 0x7E,           //0
                                     0x00 , 0x21 , 0x41 , 0xFF , 0x01 , 0x01,           //1
                                     0x00 , 0x4F , 0x91 , 0x91 , 0x91 , 0x61,           //2
                                     0x00 , 0x82 , 0x81 , 0x91 , 0xB3 , 0xCE,           //3
                                     0x08 , 0x18 , 0x28 , 0x48 , 0xFF , 0x08,           //4
                                     0xF2 , 0x91 , 0x91 , 0x91 , 0x91 , 0x8E,           //5
                                     0x3E , 0x49 , 0x89 , 0x89 , 0x89 , 0x46,           //6
                                     0x00 , 0xC0 , 0x80 , 0x80 , 0x8F , 0xF0,           //7
                                     0x76 , 0x89 , 0x89 , 0x89 , 0x89 , 0x76,           //8
                                     0x00 , 0x62 , 0x91 , 0x91 , 0x91 , 0x7E            //9
           } ;
           
           unsigned const short alphabet_littlecase[156]={
                                    0x06 , 0x49 , 0x49 , 0x49 , 0x49 , 0x3E,            //a
                                    0x00 , 0x3E , 0x09 , 0x09 , 0x09 , 0x06,             //b
                                    0x0E , 0x11 , 0x11 , 0x11 , 0x11 , 0x00,             //c
                                    0x00 , 0x0E , 0x11 , 0x11 , 0x09 , 0x7F,             //d
                                    0x00 , 0x0E , 0x15 , 0x15 , 0x0D , 0x00,             //e
                                    0x00 , 0x08 , 0x1F , 0x28 , 0x20 , 0x00,             //f
                                    0x08 , 0x15 , 0x15 , 0x15 , 0x1E , 0x00,             //g
                                    0x00 , 0x7F , 0x04 , 0x08 , 0x08 , 0x07,             //h
                                    0x00 , 0x00 , 0x2F , 0x00 , 0x00 , 0x00,             //i
                                    0x02 , 0x01 , 0x01 , 0x2E , 0x00 , 0x00,             //j
                                    0x00 , 0x00 , 0x3F , 0x04 , 0x0A , 0x11,              //k
                                    0x00 , 0x21 , 0x3F , 0x01 , 0x00 , 0x00,              //l
                                    0x00 , 0x3F , 0x10 , 0x0F , 0x10 , 0x0F,              //m
                                    0x00 , 0x1F , 0x08 , 0x10 , 0x10 , 0x0F,              //n
                                    0x0E , 0x11 , 0x11 , 0x11 , 0x0E , 0x00,              //o
                                    0x00 , 0x1F , 0x24 , 0x24 , 0x24 , 0x18,              //p
                                    0x00 , 0x18 , 0x24 , 0x24 , 0x24 , 0x1F,              //q
                                    0x00 , 0x1F , 0x08 , 0x10 , 0x10 , 0x08,              //r
                                    0x08 , 0x15 , 0x15 , 0x15 , 0x15 , 0x12,              //s
                                    0x00 , 0x10 , 0x7E , 0x11 , 0x00 , 0x00,              //t
                                    0x00 , 0x1E , 0x01 , 0x01 , 0x01 , 0x1E,              //u
                                    0x00 , 0x18 , 0x06 , 0x01 , 0x06 , 0x18,              //v
                                    0x00 , 0x1E , 0x01 , 0x1E , 0x01 , 0x1E,              //w
                                    0x11 , 0x12 , 0x0E , 0x09 , 0x11 , 0x00,              //x
                                    0x00 , 0x38 , 0x05 , 0x05 , 0x05 , 0x3E,              //y
                                    0x11 , 0x13 , 0x15 , 0x19 , 0x11 , 0x00               //z
                                    

       };
       
        unsigned const short acentuacao[156]={
        
                                   0x00 , 0x03 , 0x15 , 0x55 , 0x95 , 0x0E,               //á
                                   0x00 , 0x03 , 0x55 , 0x95 , 0x95 , 0x5E,               //â
                                   0x40 , 0x83 , 0x95 , 0x55 , 0x55 , 0x8F,               //ã
                                   0x00 , 0x0E , 0x15 , 0x55 , 0x8D , 0x00,                //é
                                   0x00 , 0x0E , 0x55 , 0x95 , 0x4D , 0x00,                //ê
                                   0x00 , 0x00 , 0x00 , 0x1F , 0x40 , 0x80,                //í
                                   0x00 , 0x0E , 0x11 , 0x51 , 0x91 , 0x0E,                //ó
                                   0x00 , 0x0E , 0x51 , 0x91 , 0x51 , 0x0E,                //ô
                                   0x40 , 0x8E , 0x91 , 0x51 , 0x51 , 0x8E,                //õ
                                   0x00 , 0x1E , 0x01 , 0x41 , 0x81 , 0x1E                 //ú
        
        };
       
 unsigned const short Symbols[136]={
                                    0x00, 0x3c, 0x42, 0x81, 0x00, 0x00,   // (
                                    0x00, 0x00, 0x81, 0x42, 0x3c, 0x00,   // )
                                    0x00, 0x00, 0xff, 0x81, 0x00, 0x00,   // [
                                    0x00, 0x00, 0x81, 0xff, 0x00, 0x00,   // ]
                                    0x00, 0x18, 0xe7, 0x81, 0x00, 0x00,   // {
                                    0x00, 0x00, 0x81, 0xe7, 0x18, 0x00,   // }
                                    0x00, 0x18, 0x24, 0x42, 0x81, 0x00,   // <
                                    0x00, 0x81, 0x42, 0x24, 0x18, 0x00,   // >
                                    0x00, 0x03, 0x0c, 0x30, 0xc0, 0x00,   // /
                                    0x00, 0xc0, 0x30, 0x0c, 0x03, 0x00,   // \
                                    0x00, 0x00, 0x00, 0x00, 0x00, 0x00,   //
                                    0x00, 0x00, 0xfd, 0xfd, 0x00, 0x00,   // !
                                    0x60, 0x80, 0x8d, 0x8d, 0x90, 0x60,   // ?
                                    0x42, 0x24, 0xff, 0xff, 0x24, 0x42,   // *
                                    0x24, 0xff, 0x24, 0x24, 0xff, 0x24,   // #
                                    0x62, 0x91, 0xff, 0xff, 0x91, 0x4e,   // $
                                    0x66, 0x99, 0x99, 0x66, 0x09, 0x00,   // &
                                    0x42, 0xa4, 0x48, 0x12, 0x25, 0x42,   // %
                                    0x20, 0x3f, 0x20, 0x20, 0x3e, 0x21,   // pi
                                    0x00,0x00,0x66,0x66,0x00,0x00,        // ;
                                    0x08 , 0x08 , 0x3E , 0x08 , 0x08 , 0x00, //+
                                    0x08 , 0x08 , 0x08 , 0x08 , 0x08 , 0x00, //-
                                    0x04 , 0x12 , 0x02 , 0x02 , 0x12 , 0x04, // :)
                                    };

// Serial 8x8 Matrix Display connections.
sbit Chip_Select at RC0_bit;
sbit Chip_Select_Direction at TRISC0_bit;

// End Serial 8x8 Matrix Display connections.

// Here we set the configuration of max7219.
void max7219_init(int maxrow, int maxcolumn)
{
 int lc;
 if(maxrow == 0 && maxcolumn == 0) lc=0;
 if(maxrow == 0 && maxcolumn == 1) lc=1;
 if(maxrow == 1 && maxcolumn == 0) lc=10;
 if(maxrow == 1 && maxcolumn == 1) lc=11;
 
 switch(lc){
  case 0:
  
 Chip_Select = 0;       // SELECT MAX
SPI1_write(0x09);      // BCD mode for digit decoding
SPI1_write(0x00);
Chip_Select = 1;       // DESELECT MAX

Chip_Select = 0;       // SELECT MAX
SPI1_write(0x0A);
SPI1_write(0x0F);      // Segment luminosity intensity
Chip_Select = 1;       // DESELECT MAX

Chip_Select = 0;       // SELECT MAX
SPI1_write(0x0B);
SPI1_write(0x07);      // Display refresh
Chip_Select = 1;       // DESELECT MAX

Chip_Select = 0;       // SELECT MAX
SPI1_write(0x0C);
SPI1_write(0x01);      // Turn on the display
Chip_Select = 1;       // DESELECT MAX

Chip_Select = 0;       // SELECT MAX
SPI1_write(0x00);
SPI1_write(0xFF);      // No test
Chip_Select = 1;       // DESELECT MAX
  break;
 
 
 case 1:
 
 Chip_Select = 0;       // SELECT MAX
  SPI1_write(0x09);      // BCD mode for digit decoding
  SPI1_write(0x00);      // using Code-B
  SPI1_write(0x00);    // Bypass the 1st Chip
  SPI1_write(0x00);
  Chip_Select= 1;       // DESELECT MAX

  Chip_Select= 0;       // SELECT MAX
  SPI1_write(0x0A);
  SPI1_write(0x0F);      // Segment luminosity intensity
  SPI1_write(0x00);    // Bypass the 1st Chip
  SPI1_write(0x00);
  Chip_Select = 1;       // DESELECT MAX

  Chip_Select = 0;       // SELECT MAX
 SPI1_write(0x0B);
  SPI1_write(0x07);      // Display refresh
  SPI1_write(0x00);    // Bypass the 1st Chip
  SPI1_write(0x00);
  Chip_Select = 1;       // DESELECT MAX

  Chip_Select= 0;       // SELECT MAX
  SPI1_write(0x0C);
  SPI1_write(0x01);      // Turn on the display
  SPI1_write(0x00);    // Bypass the 1st Chip
  SPI1_write(0x00);
  Chip_Select = 1;       // DESELECT MAX

  Chip_Select = 0;       // SELECT MAX
  SPI1_write(0x00);
  SPI1_write(0xFF);      // No test
  SPI1_write(0x00);    // Bypass the 1st Chip
  SPI1_write(0x00);
  Chip_Select = 1;
  break;
 }

}


//------------------------------------------------------------------------------------------------------------------------------------------------------
// This is write Byte function.
void Write_Byte(unsigned short myColumn, unsigned short myValue,unsigned int maxrow,unsigned int maxcolumn)
{
 int lc;
 if(maxrow == 0 && maxcolumn == 0) lc=0;
 if(maxrow == 0 && maxcolumn == 1) lc=1;
 if(maxrow == 1 && maxcolumn == 0) lc=10;
 if(maxrow == 1 && maxcolumn == 1) lc=11;
 
 switch(lc){
 case 0:
 
 Chip_Select = 0;       // select max7219.
 SPI1_write(myColumn);  // send myColumn value to max7219 (digit place).
 SPI1_write(myValue);   // send myValue value to max7219 (digit place).
 Chip_Select = 1;       // deselect max7219.
 break;
 
 case 1:
 
 Chip_Select = 0;
      // select ma7219.
 SPI1_write(myColumn);
 SPI1_write(myValue);
 SPI1_write(0x00);    // Bypass the 1st Chip
 SPI1_write(0x00);

 Chip_Select = 1;
 break;
 }
 }
 //-----------------------------------------------------------------------------------------------------
// This is clear matrix function.
void Clear_Matrix(void)
{
unsigned short x;

for(x=1;x<9;x++)
{
  Write_Byte(x,0x00,0,0);
  Write_Byte(x,0x00,0,1);
  }
}
 //------------------------------------------------------------------------------------------------------
void Write_Char(char myChar,int maxrow,int maxcolumn)
{
unsigned short Column, Start_Byte;
int lc;
Clear_Matrix();

// The next line defines our byte, from which to start the array.
Start_Byte = (myChar - 65) * 6;     // 65 represents the letter "A" in ASCII code.


 
  if(maxrow==0 && maxcolumn==0) lc=0;
 if(maxrow==0 && maxcolumn==1) lc=1;
 if(maxrow==1 && maxcolumn==0) lc=10;
 if(maxrow==1 && maxcolumn==1) lc=11;
 
 switch(lc){
 
 case 0:
 
 for(Column=2;Column<8;Column++)
{
  Write_Byte(Column, Alphabet[Start_Byte++],0,0);
  }break;
  
  case 1:
     for(Column=2;Column<8;Column++)
{
  Write_Byte(Column, Alphabet[Start_Byte++],0,1);
  }break;
  
}

 }
// We are using only columns from 2 through 7 for displaying the character.


 //-----------------------------------------------------------------------------------------------------------
   void Write_Little_Char(char myChar, int maxrow, int maxcolumn)
{
unsigned short Column, Start_Byte;
 int lc;
Clear_Matrix();

// The next line defines our byte, from which to start the array.
Start_Byte = (myChar - 97) * 6;     // 97 represents the letter "a" in ASCII code.



  if(maxrow==0 && maxcolumn==0) lc=0;
 if(maxrow==0 && maxcolumn==1) lc=1;
 if(maxrow==1 && maxcolumn==0) lc=10;
 if(maxrow==1 && maxcolumn==1) lc=11;
 
 switch(lc){
       case 0:
           for(Column=2;Column<8;Column++)
{
           Write_Byte(Column, alphabet_littlecase[Start_Byte++],0,0);
  } break;
          case 1:
          
          for(Column=2;Column<8;Column++)
{
           Write_Byte(Column, alphabet_littlecase[Start_Byte++],0,1);
  } break;

            }
// We are using only columns from 2 through 7 for displaying the character.

}
//----------------------------------------------------------------------------------------------------------------
void Write_Num(int myNum,int maxrow,int maxcolumn)
{
unsigned short Column, Start_Byte;
int lc;
// We will use only uppercase characters, so we will start from 65
// (look at the ascii chart), with an offset of 6, becouse we are using only 6
// bytes for each character.

// Clear the display first.
Clear_Matrix();

// The next line defines our byte, from which to start the array.
Start_Byte = (myNum) * 6;     // 65 represents the letter "A" in ASCII code.



  if(maxrow==0 && maxcolumn==0) lc=0;
 if(maxrow==0 && maxcolumn==1) lc=1;
 if(maxrow==1 && maxcolumn==0) lc=10;
 if(maxrow==1 && maxcolumn==1) lc=11;


   switch(lc){
   case 0:
   for(Column=2;Column<8;Column++)
{
  Write_Byte(Column, Nums[Start_Byte++],0,0);
  }  break;
   case 1:
      for(Column=2;Column<8;Column++)
{
  Write_Byte(Column, Nums[Start_Byte++],0,1);
  }break;
   

   }
}

//-------------------------------------------------------------------------------------------------------------------
// This is write char function.
void Write_Symbol(char mysymbols,int maxrow, int maxcolumn)
{
unsigned short Column1, Start_Byte1;
int lc;
// We will use only uppercase characters, so we will start from 65
// (look at the ascii chart), with an offset of 6, becouse we are using only 6
// bytes for each character.

// Clear the display first.
Clear_Matrix();

// The next line defines our byte, from which to start the array.
Start_Byte1 = (mysymbols-0) * 6 ;

   switch(mysymbols){
   case '(': Start_Byte1=0;break;
  case ')':Start_Byte1=6;break;
  case '[': Start_Byte1=12;break;
  case ']':Start_Byte1=18;break;
  case '{': Start_Byte1=24;break;
  case '}':Start_Byte1=30;break;
  case '<': Start_Byte1=36;break;
  case '>':Start_Byte1=42;break;
  case '/': Start_Byte1=48;break;
  case '\ ':Start_Byte1=54;break;
  case ' ':Start_Byte1=6*10;break;
  case '!':Start_Byte1=6*11;break;
  case '?':Start_Byte1=6*12;break;
  case '*':Start_Byte1=6*13;break;
  case '#':Start_Byte1=6*14;break;
  case '$':Start_Byte1=6*15;break;
  case '&':Start_Byte1=6*16;break;
  case '%':Start_Byte1=6*17;break;
  case 'p':Start_Byte1=6*18;break;
  case ';':Start_Byte1=6*19;break;
  case '+':Start_Byte1=6*20;break;
  case '-':Start_Byte1=6*21;break;
  case 'h':Start_Byte1=6*22;break;
  }

  if(maxrow==0 && maxcolumn==0) lc=0;
 if(maxrow==0 && maxcolumn==1) lc=1;
 if(maxrow==1 && maxcolumn==0) lc=10;
 if(maxrow==1 && maxcolumn==1) lc=11;
 
 switch(lc){
  case 0:
    for(Column1=2;Column1<8;Column1++)
{
  Write_Byte(Column1, Symbols[Start_Byte1++],0,0);
  }

  case 1:
    for(Column1=2;Column1<8;Column1++)
{
  Write_Byte(Column1, Symbols[Start_Byte1++],0,1);
  }

 }

// We are using only columns from 2 through 7 for displaying the character.

}
//--------------------------------------------------------------------------------------------------------------------
void Write_acento(char myacento,int maxrow, int maxcolumn){

 unsigned short Column1, Start_Byte1;
 int lc;
 Clear_Matrix();
 


  if(maxrow==0 && maxcolumn==0) lc=0;
 if(maxrow==0 && maxcolumn==1) lc=1;
 if(maxrow==1 && maxcolumn==0) lc=10;
 if(maxrow==1 && maxcolumn==1) lc=11;
 
 switch(myacento) {
  case 'á': Start_Byte1=0;break;
  case 'â':Start_Byte1=6;break;
  case 'ã': Start_Byte1=12;break;
  case 'é':Start_Byte1=18;break;
  case 'ê': Start_Byte1=24;break;
  case 'í':Start_Byte1=30;break;
  case 'ó': Start_Byte1=36;break;
  case 'ô':Start_Byte1=42;break;
  case 'õ': Start_Byte1=48;break;
  case 'ú':Start_Byte1=54;break;
 }
 
 switch(lc){
  case 0:
  
    for(Column1=2;Column1<8;Column1++)
{
  Write_Byte(Column1, acentuacao[Start_Byte1++],0,0);
  } break;
 
  case 1:
    for(Column1=2;Column1<8;Column1++)
{
          Write_Byte(Column1, acentuacao[Start_Byte1++],0,1);
  } break;
 }

}
 //--------------------------------------------------------------------------------------------------------------------
   void Char_scroll_left(char myChar,int row,int begin_column,int end_column,int begin_max,int end_max){
     unsigned short Display_Byte[8],Display_Byte_rec_0[8],Display_Byte_rec_1[8];
     unsigned short i,j,StartByte,n,m=0,c;

     m==end_max-begin_max+1; //numero de drivers atingidos
     StartByte = (myChar - 97) * 6;
     for(i=0;i<6;i++){
     Display_Byte[i]== Alphabet[StartByte + i];
     }
     for(i=0;i<8;i++){
      Display_Byte_rec_0[i]==Display_Byte[i];
     }
      //Write_Char(char myChar,int maxrow,int maxcolumn)
      //Write_Byte(unsigned short myColumn, unsigned short myValue,unsigned int maxrow,unsigned int maxcolumn)
       if(end_max!=begin_max) {c=0; }
       if(end_max==begin_max) {c=1; }
   switch(c){
   
   case 1:
      m= 7*(end_max-begin_max);n= (begin_column-end_column);
      for(j=0;j<0;j++){
      for(i=0;i<n;i++){
      Write_Byte(begin_column-i,Display_Byte[j],row,begin_max);
      }
      Delay_ms(50);
      Clear_Matrix();
      Display_Byte[i]>>1;
      Delay_ms(50);

      } break;
       case 0:
       n= (begin_column-end_column);
        break;
      
      }
   }
 //-----------------------------------------------------------------------------------------------------------------------

   void led_string(const char *s,int row,int begin_column,int end_column,int begin_max,int end_max)
{
while(*s) Char_scroll_left(*s++,row,begin_column,end_column,begin_max,end_max);
}

 //---------------------------------------------------------------------------------------------------------------------
 int aux=5;int aux1=2,i=8;
 unsigned int n=0,row=0,column=0;
unsigned const short array;
//------------------------------------------------------------------------------------------------------------------------------------------------------
// Here we have the main function.
void main()
{
  TRISA.RA0 = 1;
//unsigned int x,y;


Chip_Select_Direction = 0;    // Set RC0 pin as output.
SPI1_init();                  // Initialize SPI1 module.

max7219_init(0,0);              // initialize  max7219.
max7219_init(0,1);

Clear_Matrix();

while(1)                            // infinite loop.
{

   Char_scroll_left('A',0,8,0,0,0);
   //Char_scroll_left(char myChar,int row,int begin_column,int end_column,int begin_max,int end_max)



  // You can write the characters this way, one at a time.

    /*for(i=8;i>0;i--){
    Write_Byte(i,Alphabet[0],0,n);
    Write_Byte(i-1,Alphabet[1],0,n);
    Write_Byte(i-2,Alphabet[2],0,n);
//    Write_Byte(i-3,Alphabet[3],0,n);
//    Write_Byte(i-4,Alphabet[4],0,n);
//    Write_Byte(i-5,Alphabet[5],0,n);
    Delay_ms(50);
    Clear_Matrix();
    Delay_ms(50);
    
     if(i==1 && n==0 ){
     n=1;
     }else if(i==1 &&n==1){
      n=0;
     }

    
     }*/

     


    }
    }


/*
   for (k=0; k<StringLength; k++)
 {
  for (scroll=0; scroll<(8/shift_step); scroll++)
   {
         for (ShiftAmount=0; ShiftAmount<8; ShiftAmount++)
         {
          index = message[k];
          index1=message[k-1];
          temp =CharData[index-32][ShiftAmount];
          temp1 =CharData[index-32][ShiftAmount];

          DisplayBuffer[ShiftAmount] = (DisplayBuffer[ShiftAmount] << shift_step)| (temp >> ((8-shift_step)-scroll*shift_step));
          DisplayBuffer1[ShiftAmount] = (DisplayBuffer1[ShiftAmount] << shift_step)| (temp1 >> ((8-shift_step)-scroll*shift_step));
         }


        for(l=0; l<5;l++)
        {
                 for (i=0; i<8; i++)
                 {
                     Write_Byte(i+1,DisplayBuffer[i]);  //Scrolling k character on first LED Matrix
                     if(k>0)
                     Write_Byte1(i+1,DisplayBuffer1[i]);Scrolling k-1 character on second LED Matrix

                 }
        }


   }
   }

 }


*/