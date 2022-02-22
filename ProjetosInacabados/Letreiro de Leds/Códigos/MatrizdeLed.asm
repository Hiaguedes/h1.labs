
_max7219_init:

;MatrizdeLed.c,121 :: 		void max7219_init(int maxrow, int maxcolumn)
;MatrizdeLed.c,124 :: 		if(maxrow == 0 && maxcolumn == 0) lc=0;
	MOVLW      0
	XORWF      FARG_max7219_init_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__max7219_init235
	MOVLW      0
	XORWF      FARG_max7219_init_maxrow+0, 0
L__max7219_init235:
	BTFSS      STATUS+0, 2
	GOTO       L_max7219_init2
	MOVLW      0
	XORWF      FARG_max7219_init_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__max7219_init236
	MOVLW      0
	XORWF      FARG_max7219_init_maxcolumn+0, 0
L__max7219_init236:
	BTFSS      STATUS+0, 2
	GOTO       L_max7219_init2
L__max7219_init209:
	CLRF       max7219_init_lc_L0+0
	CLRF       max7219_init_lc_L0+1
L_max7219_init2:
;MatrizdeLed.c,125 :: 		if(maxrow == 0 && maxcolumn == 1) lc=1;
	MOVLW      0
	XORWF      FARG_max7219_init_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__max7219_init237
	MOVLW      0
	XORWF      FARG_max7219_init_maxrow+0, 0
L__max7219_init237:
	BTFSS      STATUS+0, 2
	GOTO       L_max7219_init5
	MOVLW      0
	XORWF      FARG_max7219_init_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__max7219_init238
	MOVLW      1
	XORWF      FARG_max7219_init_maxcolumn+0, 0
L__max7219_init238:
	BTFSS      STATUS+0, 2
	GOTO       L_max7219_init5
L__max7219_init208:
	MOVLW      1
	MOVWF      max7219_init_lc_L0+0
	MOVLW      0
	MOVWF      max7219_init_lc_L0+1
L_max7219_init5:
;MatrizdeLed.c,126 :: 		if(maxrow == 1 && maxcolumn == 0) lc=10;
	MOVLW      0
	XORWF      FARG_max7219_init_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__max7219_init239
	MOVLW      1
	XORWF      FARG_max7219_init_maxrow+0, 0
L__max7219_init239:
	BTFSS      STATUS+0, 2
	GOTO       L_max7219_init8
	MOVLW      0
	XORWF      FARG_max7219_init_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__max7219_init240
	MOVLW      0
	XORWF      FARG_max7219_init_maxcolumn+0, 0
L__max7219_init240:
	BTFSS      STATUS+0, 2
	GOTO       L_max7219_init8
L__max7219_init207:
	MOVLW      10
	MOVWF      max7219_init_lc_L0+0
	MOVLW      0
	MOVWF      max7219_init_lc_L0+1
L_max7219_init8:
;MatrizdeLed.c,127 :: 		if(maxrow == 1 && maxcolumn == 1) lc=11;
	MOVLW      0
	XORWF      FARG_max7219_init_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__max7219_init241
	MOVLW      1
	XORWF      FARG_max7219_init_maxrow+0, 0
L__max7219_init241:
	BTFSS      STATUS+0, 2
	GOTO       L_max7219_init11
	MOVLW      0
	XORWF      FARG_max7219_init_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__max7219_init242
	MOVLW      1
	XORWF      FARG_max7219_init_maxcolumn+0, 0
L__max7219_init242:
	BTFSS      STATUS+0, 2
	GOTO       L_max7219_init11
L__max7219_init206:
	MOVLW      11
	MOVWF      max7219_init_lc_L0+0
	MOVLW      0
	MOVWF      max7219_init_lc_L0+1
L_max7219_init11:
;MatrizdeLed.c,129 :: 		switch(lc){
	GOTO       L_max7219_init12
;MatrizdeLed.c,130 :: 		case 0:
L_max7219_init14:
;MatrizdeLed.c,132 :: 		Chip_Select = 0;       // SELECT MAX
	BCF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,133 :: 		SPI1_write(0x09);      // BCD mode for digit decoding
	MOVLW      9
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,134 :: 		SPI1_write(0x00);
	CLRF       FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,135 :: 		Chip_Select = 1;       // DESELECT MAX
	BSF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,137 :: 		Chip_Select = 0;       // SELECT MAX
	BCF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,138 :: 		SPI1_write(0x0A);
	MOVLW      10
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,139 :: 		SPI1_write(0x0F);      // Segment luminosity intensity
	MOVLW      15
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,140 :: 		Chip_Select = 1;       // DESELECT MAX
	BSF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,142 :: 		Chip_Select = 0;       // SELECT MAX
	BCF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,143 :: 		SPI1_write(0x0B);
	MOVLW      11
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,144 :: 		SPI1_write(0x07);      // Display refresh
	MOVLW      7
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,145 :: 		Chip_Select = 1;       // DESELECT MAX
	BSF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,147 :: 		Chip_Select = 0;       // SELECT MAX
	BCF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,148 :: 		SPI1_write(0x0C);
	MOVLW      12
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,149 :: 		SPI1_write(0x01);      // Turn on the display
	MOVLW      1
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,150 :: 		Chip_Select = 1;       // DESELECT MAX
	BSF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,152 :: 		Chip_Select = 0;       // SELECT MAX
	BCF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,153 :: 		SPI1_write(0x00);
	CLRF       FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,154 :: 		SPI1_write(0xFF);      // No test
	MOVLW      255
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,155 :: 		Chip_Select = 1;       // DESELECT MAX
	BSF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,156 :: 		break;
	GOTO       L_max7219_init13
;MatrizdeLed.c,159 :: 		case 1:
L_max7219_init15:
;MatrizdeLed.c,161 :: 		Chip_Select = 0;       // SELECT MAX
	BCF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,162 :: 		SPI1_write(0x09);      // BCD mode for digit decoding
	MOVLW      9
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,163 :: 		SPI1_write(0x00);      // using Code-B
	CLRF       FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,164 :: 		SPI1_write(0x00);    // Bypass the 1st Chip
	CLRF       FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,165 :: 		SPI1_write(0x00);
	CLRF       FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,166 :: 		Chip_Select= 1;       // DESELECT MAX
	BSF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,168 :: 		Chip_Select= 0;       // SELECT MAX
	BCF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,169 :: 		SPI1_write(0x0A);
	MOVLW      10
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,170 :: 		SPI1_write(0x0F);      // Segment luminosity intensity
	MOVLW      15
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,171 :: 		SPI1_write(0x00);    // Bypass the 1st Chip
	CLRF       FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,172 :: 		SPI1_write(0x00);
	CLRF       FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,173 :: 		Chip_Select = 1;       // DESELECT MAX
	BSF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,175 :: 		Chip_Select = 0;       // SELECT MAX
	BCF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,176 :: 		SPI1_write(0x0B);
	MOVLW      11
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,177 :: 		SPI1_write(0x07);      // Display refresh
	MOVLW      7
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,178 :: 		SPI1_write(0x00);    // Bypass the 1st Chip
	CLRF       FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,179 :: 		SPI1_write(0x00);
	CLRF       FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,180 :: 		Chip_Select = 1;       // DESELECT MAX
	BSF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,182 :: 		Chip_Select= 0;       // SELECT MAX
	BCF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,183 :: 		SPI1_write(0x0C);
	MOVLW      12
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,184 :: 		SPI1_write(0x01);      // Turn on the display
	MOVLW      1
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,185 :: 		SPI1_write(0x00);    // Bypass the 1st Chip
	CLRF       FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,186 :: 		SPI1_write(0x00);
	CLRF       FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,187 :: 		Chip_Select = 1;       // DESELECT MAX
	BSF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,189 :: 		Chip_Select = 0;       // SELECT MAX
	BCF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,190 :: 		SPI1_write(0x00);
	CLRF       FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,191 :: 		SPI1_write(0xFF);      // No test
	MOVLW      255
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,192 :: 		SPI1_write(0x00);    // Bypass the 1st Chip
	CLRF       FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,193 :: 		SPI1_write(0x00);
	CLRF       FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,194 :: 		Chip_Select = 1;
	BSF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,195 :: 		break;
	GOTO       L_max7219_init13
;MatrizdeLed.c,196 :: 		}
L_max7219_init12:
	MOVLW      0
	XORWF      max7219_init_lc_L0+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__max7219_init243
	MOVLW      0
	XORWF      max7219_init_lc_L0+0, 0
L__max7219_init243:
	BTFSC      STATUS+0, 2
	GOTO       L_max7219_init14
	MOVLW      0
	XORWF      max7219_init_lc_L0+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__max7219_init244
	MOVLW      1
	XORWF      max7219_init_lc_L0+0, 0
L__max7219_init244:
	BTFSC      STATUS+0, 2
	GOTO       L_max7219_init15
L_max7219_init13:
;MatrizdeLed.c,198 :: 		}
L_end_max7219_init:
	RETURN
; end of _max7219_init

_Write_Byte:

;MatrizdeLed.c,203 :: 		void Write_Byte(unsigned short myColumn, unsigned short myValue,unsigned int maxrow,unsigned int maxcolumn)
;MatrizdeLed.c,206 :: 		if(maxrow == 0 && maxcolumn == 0) lc=0;
	MOVLW      0
	XORWF      FARG_Write_Byte_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Byte246
	MOVLW      0
	XORWF      FARG_Write_Byte_maxrow+0, 0
L__Write_Byte246:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Byte18
	MOVLW      0
	XORWF      FARG_Write_Byte_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Byte247
	MOVLW      0
	XORWF      FARG_Write_Byte_maxcolumn+0, 0
L__Write_Byte247:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Byte18
L__Write_Byte213:
	CLRF       Write_Byte_lc_L0+0
	CLRF       Write_Byte_lc_L0+1
L_Write_Byte18:
;MatrizdeLed.c,207 :: 		if(maxrow == 0 && maxcolumn == 1) lc=1;
	MOVLW      0
	XORWF      FARG_Write_Byte_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Byte248
	MOVLW      0
	XORWF      FARG_Write_Byte_maxrow+0, 0
L__Write_Byte248:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Byte21
	MOVLW      0
	XORWF      FARG_Write_Byte_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Byte249
	MOVLW      1
	XORWF      FARG_Write_Byte_maxcolumn+0, 0
L__Write_Byte249:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Byte21
L__Write_Byte212:
	MOVLW      1
	MOVWF      Write_Byte_lc_L0+0
	MOVLW      0
	MOVWF      Write_Byte_lc_L0+1
L_Write_Byte21:
;MatrizdeLed.c,208 :: 		if(maxrow == 1 && maxcolumn == 0) lc=10;
	MOVLW      0
	XORWF      FARG_Write_Byte_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Byte250
	MOVLW      1
	XORWF      FARG_Write_Byte_maxrow+0, 0
L__Write_Byte250:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Byte24
	MOVLW      0
	XORWF      FARG_Write_Byte_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Byte251
	MOVLW      0
	XORWF      FARG_Write_Byte_maxcolumn+0, 0
L__Write_Byte251:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Byte24
L__Write_Byte211:
	MOVLW      10
	MOVWF      Write_Byte_lc_L0+0
	MOVLW      0
	MOVWF      Write_Byte_lc_L0+1
L_Write_Byte24:
;MatrizdeLed.c,209 :: 		if(maxrow == 1 && maxcolumn == 1) lc=11;
	MOVLW      0
	XORWF      FARG_Write_Byte_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Byte252
	MOVLW      1
	XORWF      FARG_Write_Byte_maxrow+0, 0
L__Write_Byte252:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Byte27
	MOVLW      0
	XORWF      FARG_Write_Byte_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Byte253
	MOVLW      1
	XORWF      FARG_Write_Byte_maxcolumn+0, 0
L__Write_Byte253:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Byte27
L__Write_Byte210:
	MOVLW      11
	MOVWF      Write_Byte_lc_L0+0
	MOVLW      0
	MOVWF      Write_Byte_lc_L0+1
L_Write_Byte27:
;MatrizdeLed.c,211 :: 		switch(lc){
	GOTO       L_Write_Byte28
;MatrizdeLed.c,212 :: 		case 0:
L_Write_Byte30:
;MatrizdeLed.c,214 :: 		Chip_Select = 0;       // select max7219.
	BCF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,215 :: 		SPI1_write(myColumn);  // send myColumn value to max7219 (digit place).
	MOVF       FARG_Write_Byte_myColumn+0, 0
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,216 :: 		SPI1_write(myValue);   // send myValue value to max7219 (digit place).
	MOVF       FARG_Write_Byte_myValue+0, 0
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,217 :: 		Chip_Select = 1;       // deselect max7219.
	BSF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,218 :: 		break;
	GOTO       L_Write_Byte29
;MatrizdeLed.c,220 :: 		case 1:
L_Write_Byte31:
;MatrizdeLed.c,222 :: 		Chip_Select = 0;
	BCF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,224 :: 		SPI1_write(myColumn);
	MOVF       FARG_Write_Byte_myColumn+0, 0
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,225 :: 		SPI1_write(myValue);
	MOVF       FARG_Write_Byte_myValue+0, 0
	MOVWF      FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,226 :: 		SPI1_write(0x00);    // Bypass the 1st Chip
	CLRF       FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,227 :: 		SPI1_write(0x00);
	CLRF       FARG_SPI1_Write_data_+0
	CALL       _SPI1_Write+0
;MatrizdeLed.c,229 :: 		Chip_Select = 1;
	BSF        RC0_bit+0, BitPos(RC0_bit+0)
;MatrizdeLed.c,230 :: 		break;
	GOTO       L_Write_Byte29
;MatrizdeLed.c,231 :: 		}
L_Write_Byte28:
	MOVLW      0
	XORWF      Write_Byte_lc_L0+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Byte254
	MOVLW      0
	XORWF      Write_Byte_lc_L0+0, 0
L__Write_Byte254:
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Byte30
	MOVLW      0
	XORWF      Write_Byte_lc_L0+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Byte255
	MOVLW      1
	XORWF      Write_Byte_lc_L0+0, 0
L__Write_Byte255:
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Byte31
L_Write_Byte29:
;MatrizdeLed.c,232 :: 		}
L_end_Write_Byte:
	RETURN
; end of _Write_Byte

_Clear_Matrix:

;MatrizdeLed.c,235 :: 		void Clear_Matrix(void)
;MatrizdeLed.c,239 :: 		for(x=1;x<9;x++)
	MOVLW      1
	MOVWF      Clear_Matrix_x_L0+0
L_Clear_Matrix32:
	MOVLW      9
	SUBWF      Clear_Matrix_x_L0+0, 0
	BTFSC      STATUS+0, 0
	GOTO       L_Clear_Matrix33
;MatrizdeLed.c,241 :: 		Write_Byte(x,0x00,0,0);
	MOVF       Clear_Matrix_x_L0+0, 0
	MOVWF      FARG_Write_Byte_myColumn+0
	CLRF       FARG_Write_Byte_myValue+0
	CLRF       FARG_Write_Byte_maxrow+0
	CLRF       FARG_Write_Byte_maxrow+1
	CLRF       FARG_Write_Byte_maxcolumn+0
	CLRF       FARG_Write_Byte_maxcolumn+1
	CALL       _Write_Byte+0
;MatrizdeLed.c,242 :: 		Write_Byte(x,0x00,0,1);
	MOVF       Clear_Matrix_x_L0+0, 0
	MOVWF      FARG_Write_Byte_myColumn+0
	CLRF       FARG_Write_Byte_myValue+0
	CLRF       FARG_Write_Byte_maxrow+0
	CLRF       FARG_Write_Byte_maxrow+1
	MOVLW      1
	MOVWF      FARG_Write_Byte_maxcolumn+0
	MOVLW      0
	MOVWF      FARG_Write_Byte_maxcolumn+1
	CALL       _Write_Byte+0
;MatrizdeLed.c,239 :: 		for(x=1;x<9;x++)
	INCF       Clear_Matrix_x_L0+0, 1
;MatrizdeLed.c,243 :: 		}
	GOTO       L_Clear_Matrix32
L_Clear_Matrix33:
;MatrizdeLed.c,244 :: 		}
L_end_Clear_Matrix:
	RETURN
; end of _Clear_Matrix

_Write_Char:

;MatrizdeLed.c,246 :: 		void Write_Char(char myChar,int maxrow,int maxcolumn)
;MatrizdeLed.c,250 :: 		Clear_Matrix();
	CALL       _Clear_Matrix+0
;MatrizdeLed.c,253 :: 		Start_Byte = (myChar - 65) * 6;     // 65 represents the letter "A" in ASCII code.
	MOVLW      65
	SUBWF      FARG_Write_Char_myChar+0, 0
	MOVWF      R0+0
	MOVLW      6
	MOVWF      R4+0
	CALL       _Mul_8X8_U+0
	MOVF       R0+0, 0
	MOVWF      Write_Char_Start_Byte_L0+0
;MatrizdeLed.c,257 :: 		if(maxrow==0 && maxcolumn==0) lc=0;
	MOVLW      0
	XORWF      FARG_Write_Char_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Char258
	MOVLW      0
	XORWF      FARG_Write_Char_maxrow+0, 0
L__Write_Char258:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Char37
	MOVLW      0
	XORWF      FARG_Write_Char_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Char259
	MOVLW      0
	XORWF      FARG_Write_Char_maxcolumn+0, 0
L__Write_Char259:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Char37
L__Write_Char217:
	CLRF       Write_Char_lc_L0+0
	CLRF       Write_Char_lc_L0+1
L_Write_Char37:
;MatrizdeLed.c,258 :: 		if(maxrow==0 && maxcolumn==1) lc=1;
	MOVLW      0
	XORWF      FARG_Write_Char_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Char260
	MOVLW      0
	XORWF      FARG_Write_Char_maxrow+0, 0
L__Write_Char260:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Char40
	MOVLW      0
	XORWF      FARG_Write_Char_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Char261
	MOVLW      1
	XORWF      FARG_Write_Char_maxcolumn+0, 0
L__Write_Char261:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Char40
L__Write_Char216:
	MOVLW      1
	MOVWF      Write_Char_lc_L0+0
	MOVLW      0
	MOVWF      Write_Char_lc_L0+1
L_Write_Char40:
;MatrizdeLed.c,259 :: 		if(maxrow==1 && maxcolumn==0) lc=10;
	MOVLW      0
	XORWF      FARG_Write_Char_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Char262
	MOVLW      1
	XORWF      FARG_Write_Char_maxrow+0, 0
L__Write_Char262:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Char43
	MOVLW      0
	XORWF      FARG_Write_Char_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Char263
	MOVLW      0
	XORWF      FARG_Write_Char_maxcolumn+0, 0
L__Write_Char263:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Char43
L__Write_Char215:
	MOVLW      10
	MOVWF      Write_Char_lc_L0+0
	MOVLW      0
	MOVWF      Write_Char_lc_L0+1
L_Write_Char43:
;MatrizdeLed.c,260 :: 		if(maxrow==1 && maxcolumn==1) lc=11;
	MOVLW      0
	XORWF      FARG_Write_Char_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Char264
	MOVLW      1
	XORWF      FARG_Write_Char_maxrow+0, 0
L__Write_Char264:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Char46
	MOVLW      0
	XORWF      FARG_Write_Char_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Char265
	MOVLW      1
	XORWF      FARG_Write_Char_maxcolumn+0, 0
L__Write_Char265:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Char46
L__Write_Char214:
	MOVLW      11
	MOVWF      Write_Char_lc_L0+0
	MOVLW      0
	MOVWF      Write_Char_lc_L0+1
L_Write_Char46:
;MatrizdeLed.c,262 :: 		switch(lc){
	GOTO       L_Write_Char47
;MatrizdeLed.c,264 :: 		case 0:
L_Write_Char49:
;MatrizdeLed.c,266 :: 		for(Column=2;Column<8;Column++)
	MOVLW      2
	MOVWF      Write_Char_Column_L0+0
L_Write_Char50:
	MOVLW      8
	SUBWF      Write_Char_Column_L0+0, 0
	BTFSC      STATUS+0, 0
	GOTO       L_Write_Char51
;MatrizdeLed.c,268 :: 		Write_Byte(Column, Alphabet[Start_Byte++],0,0);
	MOVF       Write_Char_Column_L0+0, 0
	MOVWF      FARG_Write_Byte_myColumn+0
	MOVF       Write_Char_Start_Byte_L0+0, 0
	ADDLW      _Alphabet+0
	MOVWF      R0+0
	MOVLW      hi_addr(_Alphabet+0)
	BTFSC      STATUS+0, 0
	ADDLW      1
	MOVWF      R0+1
	MOVF       R0+0, 0
	MOVWF      ___DoICPAddr+0
	MOVF       R0+1, 0
	MOVWF      ___DoICPAddr+1
	CALL       _____DoICP+0
	MOVWF      FARG_Write_Byte_myValue+0
	CLRF       FARG_Write_Byte_maxrow+0
	CLRF       FARG_Write_Byte_maxrow+1
	CLRF       FARG_Write_Byte_maxcolumn+0
	CLRF       FARG_Write_Byte_maxcolumn+1
	CALL       _Write_Byte+0
	INCF       Write_Char_Start_Byte_L0+0, 1
;MatrizdeLed.c,266 :: 		for(Column=2;Column<8;Column++)
	INCF       Write_Char_Column_L0+0, 1
;MatrizdeLed.c,269 :: 		}break;
	GOTO       L_Write_Char50
L_Write_Char51:
	GOTO       L_Write_Char48
;MatrizdeLed.c,271 :: 		case 1:
L_Write_Char53:
;MatrizdeLed.c,272 :: 		for(Column=2;Column<8;Column++)
	MOVLW      2
	MOVWF      Write_Char_Column_L0+0
L_Write_Char54:
	MOVLW      8
	SUBWF      Write_Char_Column_L0+0, 0
	BTFSC      STATUS+0, 0
	GOTO       L_Write_Char55
;MatrizdeLed.c,274 :: 		Write_Byte(Column, Alphabet[Start_Byte++],0,1);
	MOVF       Write_Char_Column_L0+0, 0
	MOVWF      FARG_Write_Byte_myColumn+0
	MOVF       Write_Char_Start_Byte_L0+0, 0
	ADDLW      _Alphabet+0
	MOVWF      R0+0
	MOVLW      hi_addr(_Alphabet+0)
	BTFSC      STATUS+0, 0
	ADDLW      1
	MOVWF      R0+1
	MOVF       R0+0, 0
	MOVWF      ___DoICPAddr+0
	MOVF       R0+1, 0
	MOVWF      ___DoICPAddr+1
	CALL       _____DoICP+0
	MOVWF      FARG_Write_Byte_myValue+0
	CLRF       FARG_Write_Byte_maxrow+0
	CLRF       FARG_Write_Byte_maxrow+1
	MOVLW      1
	MOVWF      FARG_Write_Byte_maxcolumn+0
	MOVLW      0
	MOVWF      FARG_Write_Byte_maxcolumn+1
	CALL       _Write_Byte+0
	INCF       Write_Char_Start_Byte_L0+0, 1
;MatrizdeLed.c,272 :: 		for(Column=2;Column<8;Column++)
	INCF       Write_Char_Column_L0+0, 1
;MatrizdeLed.c,275 :: 		}break;
	GOTO       L_Write_Char54
L_Write_Char55:
	GOTO       L_Write_Char48
;MatrizdeLed.c,277 :: 		}
L_Write_Char47:
	MOVLW      0
	XORWF      Write_Char_lc_L0+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Char266
	MOVLW      0
	XORWF      Write_Char_lc_L0+0, 0
L__Write_Char266:
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Char49
	MOVLW      0
	XORWF      Write_Char_lc_L0+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Char267
	MOVLW      1
	XORWF      Write_Char_lc_L0+0, 0
L__Write_Char267:
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Char53
L_Write_Char48:
;MatrizdeLed.c,279 :: 		}
L_end_Write_Char:
	RETURN
; end of _Write_Char

_Write_Little_Char:

;MatrizdeLed.c,284 :: 		void Write_Little_Char(char myChar, int maxrow, int maxcolumn)
;MatrizdeLed.c,288 :: 		Clear_Matrix();
	CALL       _Clear_Matrix+0
;MatrizdeLed.c,291 :: 		Start_Byte = (myChar - 97) * 6;     // 97 represents the letter "a" in ASCII code.
	MOVLW      97
	SUBWF      FARG_Write_Little_Char_myChar+0, 0
	MOVWF      R0+0
	MOVLW      6
	MOVWF      R4+0
	CALL       _Mul_8X8_U+0
	MOVF       R0+0, 0
	MOVWF      Write_Little_Char_Start_Byte_L0+0
;MatrizdeLed.c,295 :: 		if(maxrow==0 && maxcolumn==0) lc=0;
	MOVLW      0
	XORWF      FARG_Write_Little_Char_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Little_Char269
	MOVLW      0
	XORWF      FARG_Write_Little_Char_maxrow+0, 0
L__Write_Little_Char269:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Little_Char59
	MOVLW      0
	XORWF      FARG_Write_Little_Char_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Little_Char270
	MOVLW      0
	XORWF      FARG_Write_Little_Char_maxcolumn+0, 0
L__Write_Little_Char270:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Little_Char59
L__Write_Little_Char221:
	CLRF       Write_Little_Char_lc_L0+0
	CLRF       Write_Little_Char_lc_L0+1
L_Write_Little_Char59:
;MatrizdeLed.c,296 :: 		if(maxrow==0 && maxcolumn==1) lc=1;
	MOVLW      0
	XORWF      FARG_Write_Little_Char_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Little_Char271
	MOVLW      0
	XORWF      FARG_Write_Little_Char_maxrow+0, 0
L__Write_Little_Char271:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Little_Char62
	MOVLW      0
	XORWF      FARG_Write_Little_Char_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Little_Char272
	MOVLW      1
	XORWF      FARG_Write_Little_Char_maxcolumn+0, 0
L__Write_Little_Char272:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Little_Char62
L__Write_Little_Char220:
	MOVLW      1
	MOVWF      Write_Little_Char_lc_L0+0
	MOVLW      0
	MOVWF      Write_Little_Char_lc_L0+1
L_Write_Little_Char62:
;MatrizdeLed.c,297 :: 		if(maxrow==1 && maxcolumn==0) lc=10;
	MOVLW      0
	XORWF      FARG_Write_Little_Char_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Little_Char273
	MOVLW      1
	XORWF      FARG_Write_Little_Char_maxrow+0, 0
L__Write_Little_Char273:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Little_Char65
	MOVLW      0
	XORWF      FARG_Write_Little_Char_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Little_Char274
	MOVLW      0
	XORWF      FARG_Write_Little_Char_maxcolumn+0, 0
L__Write_Little_Char274:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Little_Char65
L__Write_Little_Char219:
	MOVLW      10
	MOVWF      Write_Little_Char_lc_L0+0
	MOVLW      0
	MOVWF      Write_Little_Char_lc_L0+1
L_Write_Little_Char65:
;MatrizdeLed.c,298 :: 		if(maxrow==1 && maxcolumn==1) lc=11;
	MOVLW      0
	XORWF      FARG_Write_Little_Char_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Little_Char275
	MOVLW      1
	XORWF      FARG_Write_Little_Char_maxrow+0, 0
L__Write_Little_Char275:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Little_Char68
	MOVLW      0
	XORWF      FARG_Write_Little_Char_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Little_Char276
	MOVLW      1
	XORWF      FARG_Write_Little_Char_maxcolumn+0, 0
L__Write_Little_Char276:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Little_Char68
L__Write_Little_Char218:
	MOVLW      11
	MOVWF      Write_Little_Char_lc_L0+0
	MOVLW      0
	MOVWF      Write_Little_Char_lc_L0+1
L_Write_Little_Char68:
;MatrizdeLed.c,300 :: 		switch(lc){
	GOTO       L_Write_Little_Char69
;MatrizdeLed.c,301 :: 		case 0:
L_Write_Little_Char71:
;MatrizdeLed.c,302 :: 		for(Column=2;Column<8;Column++)
	MOVLW      2
	MOVWF      Write_Little_Char_Column_L0+0
L_Write_Little_Char72:
	MOVLW      8
	SUBWF      Write_Little_Char_Column_L0+0, 0
	BTFSC      STATUS+0, 0
	GOTO       L_Write_Little_Char73
;MatrizdeLed.c,304 :: 		Write_Byte(Column, alphabet_littlecase[Start_Byte++],0,0);
	MOVF       Write_Little_Char_Column_L0+0, 0
	MOVWF      FARG_Write_Byte_myColumn+0
	MOVF       Write_Little_Char_Start_Byte_L0+0, 0
	ADDLW      _alphabet_littlecase+0
	MOVWF      R0+0
	MOVLW      hi_addr(_alphabet_littlecase+0)
	BTFSC      STATUS+0, 0
	ADDLW      1
	MOVWF      R0+1
	MOVF       R0+0, 0
	MOVWF      ___DoICPAddr+0
	MOVF       R0+1, 0
	MOVWF      ___DoICPAddr+1
	CALL       _____DoICP+0
	MOVWF      FARG_Write_Byte_myValue+0
	CLRF       FARG_Write_Byte_maxrow+0
	CLRF       FARG_Write_Byte_maxrow+1
	CLRF       FARG_Write_Byte_maxcolumn+0
	CLRF       FARG_Write_Byte_maxcolumn+1
	CALL       _Write_Byte+0
	INCF       Write_Little_Char_Start_Byte_L0+0, 1
;MatrizdeLed.c,302 :: 		for(Column=2;Column<8;Column++)
	INCF       Write_Little_Char_Column_L0+0, 1
;MatrizdeLed.c,305 :: 		} break;
	GOTO       L_Write_Little_Char72
L_Write_Little_Char73:
	GOTO       L_Write_Little_Char70
;MatrizdeLed.c,306 :: 		case 1:
L_Write_Little_Char75:
;MatrizdeLed.c,308 :: 		for(Column=2;Column<8;Column++)
	MOVLW      2
	MOVWF      Write_Little_Char_Column_L0+0
L_Write_Little_Char76:
	MOVLW      8
	SUBWF      Write_Little_Char_Column_L0+0, 0
	BTFSC      STATUS+0, 0
	GOTO       L_Write_Little_Char77
;MatrizdeLed.c,310 :: 		Write_Byte(Column, alphabet_littlecase[Start_Byte++],0,1);
	MOVF       Write_Little_Char_Column_L0+0, 0
	MOVWF      FARG_Write_Byte_myColumn+0
	MOVF       Write_Little_Char_Start_Byte_L0+0, 0
	ADDLW      _alphabet_littlecase+0
	MOVWF      R0+0
	MOVLW      hi_addr(_alphabet_littlecase+0)
	BTFSC      STATUS+0, 0
	ADDLW      1
	MOVWF      R0+1
	MOVF       R0+0, 0
	MOVWF      ___DoICPAddr+0
	MOVF       R0+1, 0
	MOVWF      ___DoICPAddr+1
	CALL       _____DoICP+0
	MOVWF      FARG_Write_Byte_myValue+0
	CLRF       FARG_Write_Byte_maxrow+0
	CLRF       FARG_Write_Byte_maxrow+1
	MOVLW      1
	MOVWF      FARG_Write_Byte_maxcolumn+0
	MOVLW      0
	MOVWF      FARG_Write_Byte_maxcolumn+1
	CALL       _Write_Byte+0
	INCF       Write_Little_Char_Start_Byte_L0+0, 1
;MatrizdeLed.c,308 :: 		for(Column=2;Column<8;Column++)
	INCF       Write_Little_Char_Column_L0+0, 1
;MatrizdeLed.c,311 :: 		} break;
	GOTO       L_Write_Little_Char76
L_Write_Little_Char77:
	GOTO       L_Write_Little_Char70
;MatrizdeLed.c,313 :: 		}
L_Write_Little_Char69:
	MOVLW      0
	XORWF      Write_Little_Char_lc_L0+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Little_Char277
	MOVLW      0
	XORWF      Write_Little_Char_lc_L0+0, 0
L__Write_Little_Char277:
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Little_Char71
	MOVLW      0
	XORWF      Write_Little_Char_lc_L0+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Little_Char278
	MOVLW      1
	XORWF      Write_Little_Char_lc_L0+0, 0
L__Write_Little_Char278:
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Little_Char75
L_Write_Little_Char70:
;MatrizdeLed.c,316 :: 		}
L_end_Write_Little_Char:
	RETURN
; end of _Write_Little_Char

_Write_Num:

;MatrizdeLed.c,318 :: 		void Write_Num(int myNum,int maxrow,int maxcolumn)
;MatrizdeLed.c,327 :: 		Clear_Matrix();
	CALL       _Clear_Matrix+0
;MatrizdeLed.c,330 :: 		Start_Byte = (myNum) * 6;     // 65 represents the letter "A" in ASCII code.
	MOVF       FARG_Write_Num_myNum+0, 0
	MOVWF      R0+0
	MOVLW      6
	MOVWF      R4+0
	CALL       _Mul_8X8_U+0
	MOVF       R0+0, 0
	MOVWF      Write_Num_Start_Byte_L0+0
;MatrizdeLed.c,334 :: 		if(maxrow==0 && maxcolumn==0) lc=0;
	MOVLW      0
	XORWF      FARG_Write_Num_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Num280
	MOVLW      0
	XORWF      FARG_Write_Num_maxrow+0, 0
L__Write_Num280:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Num81
	MOVLW      0
	XORWF      FARG_Write_Num_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Num281
	MOVLW      0
	XORWF      FARG_Write_Num_maxcolumn+0, 0
L__Write_Num281:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Num81
L__Write_Num225:
	CLRF       Write_Num_lc_L0+0
	CLRF       Write_Num_lc_L0+1
L_Write_Num81:
;MatrizdeLed.c,335 :: 		if(maxrow==0 && maxcolumn==1) lc=1;
	MOVLW      0
	XORWF      FARG_Write_Num_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Num282
	MOVLW      0
	XORWF      FARG_Write_Num_maxrow+0, 0
L__Write_Num282:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Num84
	MOVLW      0
	XORWF      FARG_Write_Num_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Num283
	MOVLW      1
	XORWF      FARG_Write_Num_maxcolumn+0, 0
L__Write_Num283:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Num84
L__Write_Num224:
	MOVLW      1
	MOVWF      Write_Num_lc_L0+0
	MOVLW      0
	MOVWF      Write_Num_lc_L0+1
L_Write_Num84:
;MatrizdeLed.c,336 :: 		if(maxrow==1 && maxcolumn==0) lc=10;
	MOVLW      0
	XORWF      FARG_Write_Num_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Num284
	MOVLW      1
	XORWF      FARG_Write_Num_maxrow+0, 0
L__Write_Num284:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Num87
	MOVLW      0
	XORWF      FARG_Write_Num_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Num285
	MOVLW      0
	XORWF      FARG_Write_Num_maxcolumn+0, 0
L__Write_Num285:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Num87
L__Write_Num223:
	MOVLW      10
	MOVWF      Write_Num_lc_L0+0
	MOVLW      0
	MOVWF      Write_Num_lc_L0+1
L_Write_Num87:
;MatrizdeLed.c,337 :: 		if(maxrow==1 && maxcolumn==1) lc=11;
	MOVLW      0
	XORWF      FARG_Write_Num_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Num286
	MOVLW      1
	XORWF      FARG_Write_Num_maxrow+0, 0
L__Write_Num286:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Num90
	MOVLW      0
	XORWF      FARG_Write_Num_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Num287
	MOVLW      1
	XORWF      FARG_Write_Num_maxcolumn+0, 0
L__Write_Num287:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Num90
L__Write_Num222:
	MOVLW      11
	MOVWF      Write_Num_lc_L0+0
	MOVLW      0
	MOVWF      Write_Num_lc_L0+1
L_Write_Num90:
;MatrizdeLed.c,340 :: 		switch(lc){
	GOTO       L_Write_Num91
;MatrizdeLed.c,341 :: 		case 0:
L_Write_Num93:
;MatrizdeLed.c,342 :: 		for(Column=2;Column<8;Column++)
	MOVLW      2
	MOVWF      Write_Num_Column_L0+0
L_Write_Num94:
	MOVLW      8
	SUBWF      Write_Num_Column_L0+0, 0
	BTFSC      STATUS+0, 0
	GOTO       L_Write_Num95
;MatrizdeLed.c,344 :: 		Write_Byte(Column, Nums[Start_Byte++],0,0);
	MOVF       Write_Num_Column_L0+0, 0
	MOVWF      FARG_Write_Byte_myColumn+0
	MOVF       Write_Num_Start_Byte_L0+0, 0
	ADDLW      _Nums+0
	MOVWF      R0+0
	MOVLW      hi_addr(_Nums+0)
	BTFSC      STATUS+0, 0
	ADDLW      1
	MOVWF      R0+1
	MOVF       R0+0, 0
	MOVWF      ___DoICPAddr+0
	MOVF       R0+1, 0
	MOVWF      ___DoICPAddr+1
	CALL       _____DoICP+0
	MOVWF      FARG_Write_Byte_myValue+0
	CLRF       FARG_Write_Byte_maxrow+0
	CLRF       FARG_Write_Byte_maxrow+1
	CLRF       FARG_Write_Byte_maxcolumn+0
	CLRF       FARG_Write_Byte_maxcolumn+1
	CALL       _Write_Byte+0
	INCF       Write_Num_Start_Byte_L0+0, 1
;MatrizdeLed.c,342 :: 		for(Column=2;Column<8;Column++)
	INCF       Write_Num_Column_L0+0, 1
;MatrizdeLed.c,345 :: 		}  break;
	GOTO       L_Write_Num94
L_Write_Num95:
	GOTO       L_Write_Num92
;MatrizdeLed.c,346 :: 		case 1:
L_Write_Num97:
;MatrizdeLed.c,347 :: 		for(Column=2;Column<8;Column++)
	MOVLW      2
	MOVWF      Write_Num_Column_L0+0
L_Write_Num98:
	MOVLW      8
	SUBWF      Write_Num_Column_L0+0, 0
	BTFSC      STATUS+0, 0
	GOTO       L_Write_Num99
;MatrizdeLed.c,349 :: 		Write_Byte(Column, Nums[Start_Byte++],0,1);
	MOVF       Write_Num_Column_L0+0, 0
	MOVWF      FARG_Write_Byte_myColumn+0
	MOVF       Write_Num_Start_Byte_L0+0, 0
	ADDLW      _Nums+0
	MOVWF      R0+0
	MOVLW      hi_addr(_Nums+0)
	BTFSC      STATUS+0, 0
	ADDLW      1
	MOVWF      R0+1
	MOVF       R0+0, 0
	MOVWF      ___DoICPAddr+0
	MOVF       R0+1, 0
	MOVWF      ___DoICPAddr+1
	CALL       _____DoICP+0
	MOVWF      FARG_Write_Byte_myValue+0
	CLRF       FARG_Write_Byte_maxrow+0
	CLRF       FARG_Write_Byte_maxrow+1
	MOVLW      1
	MOVWF      FARG_Write_Byte_maxcolumn+0
	MOVLW      0
	MOVWF      FARG_Write_Byte_maxcolumn+1
	CALL       _Write_Byte+0
	INCF       Write_Num_Start_Byte_L0+0, 1
;MatrizdeLed.c,347 :: 		for(Column=2;Column<8;Column++)
	INCF       Write_Num_Column_L0+0, 1
;MatrizdeLed.c,350 :: 		}break;
	GOTO       L_Write_Num98
L_Write_Num99:
	GOTO       L_Write_Num92
;MatrizdeLed.c,353 :: 		}
L_Write_Num91:
	MOVLW      0
	XORWF      Write_Num_lc_L0+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Num288
	MOVLW      0
	XORWF      Write_Num_lc_L0+0, 0
L__Write_Num288:
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Num93
	MOVLW      0
	XORWF      Write_Num_lc_L0+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Num289
	MOVLW      1
	XORWF      Write_Num_lc_L0+0, 0
L__Write_Num289:
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Num97
L_Write_Num92:
;MatrizdeLed.c,354 :: 		}
L_end_Write_Num:
	RETURN
; end of _Write_Num

_Write_Symbol:

;MatrizdeLed.c,358 :: 		void Write_Symbol(char mysymbols,int maxrow, int maxcolumn)
;MatrizdeLed.c,367 :: 		Clear_Matrix();
	CALL       _Clear_Matrix+0
;MatrizdeLed.c,370 :: 		Start_Byte1 = (mysymbols-0) * 6 ;
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	MOVWF      R0+0
	MOVLW      6
	MOVWF      R4+0
	CALL       _Mul_8X8_U+0
	MOVF       R0+0, 0
	MOVWF      Write_Symbol_Start_Byte1_L0+0
;MatrizdeLed.c,372 :: 		switch(mysymbols){
	GOTO       L_Write_Symbol101
;MatrizdeLed.c,373 :: 		case '(': Start_Byte1=0;break;
L_Write_Symbol103:
	CLRF       Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,374 :: 		case ')':Start_Byte1=6;break;
L_Write_Symbol104:
	MOVLW      6
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,375 :: 		case '[': Start_Byte1=12;break;
L_Write_Symbol105:
	MOVLW      12
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,376 :: 		case ']':Start_Byte1=18;break;
L_Write_Symbol106:
	MOVLW      18
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,377 :: 		case '{': Start_Byte1=24;break;
L_Write_Symbol107:
	MOVLW      24
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,378 :: 		case '}':Start_Byte1=30;break;
L_Write_Symbol108:
	MOVLW      30
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,379 :: 		case '<': Start_Byte1=36;break;
L_Write_Symbol109:
	MOVLW      36
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,380 :: 		case '>':Start_Byte1=42;break;
L_Write_Symbol110:
	MOVLW      42
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,381 :: 		case '/': Start_Byte1=48;break;
L_Write_Symbol111:
	MOVLW      48
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,382 :: 		case '\ ':Start_Byte1=54;break;
L_Write_Symbol112:
	MOVLW      54
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,383 :: 		case ' ':Start_Byte1=6*10;break;
L_Write_Symbol113:
	MOVLW      60
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,384 :: 		case '!':Start_Byte1=6*11;break;
L_Write_Symbol114:
	MOVLW      66
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,385 :: 		case '?':Start_Byte1=6*12;break;
L_Write_Symbol115:
	MOVLW      72
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,386 :: 		case '*':Start_Byte1=6*13;break;
L_Write_Symbol116:
	MOVLW      78
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,387 :: 		case '#':Start_Byte1=6*14;break;
L_Write_Symbol117:
	MOVLW      84
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,388 :: 		case '$':Start_Byte1=6*15;break;
L_Write_Symbol118:
	MOVLW      90
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,389 :: 		case '&':Start_Byte1=6*16;break;
L_Write_Symbol119:
	MOVLW      96
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,390 :: 		case '%':Start_Byte1=6*17;break;
L_Write_Symbol120:
	MOVLW      102
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,391 :: 		case 'p':Start_Byte1=6*18;break;
L_Write_Symbol121:
	MOVLW      108
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,392 :: 		case ';':Start_Byte1=6*19;break;
L_Write_Symbol122:
	MOVLW      114
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,393 :: 		case '+':Start_Byte1=6*20;break;
L_Write_Symbol123:
	MOVLW      120
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,394 :: 		case '-':Start_Byte1=6*21;break;
L_Write_Symbol124:
	MOVLW      126
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,395 :: 		case 'h':Start_Byte1=6*22;break;
L_Write_Symbol125:
	MOVLW      132
	MOVWF      Write_Symbol_Start_Byte1_L0+0
	GOTO       L_Write_Symbol102
;MatrizdeLed.c,396 :: 		}
L_Write_Symbol101:
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      40
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol103
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      41
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol104
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      91
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol105
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      93
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol106
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      123
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol107
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      125
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol108
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      60
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol109
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      62
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol110
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      47
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol111
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      0
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol112
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      32
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol113
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      33
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol114
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      63
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol115
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      42
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol116
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      35
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol117
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      36
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol118
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      38
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol119
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      37
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol120
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      112
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol121
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      59
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol122
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      43
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol123
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      45
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol124
	MOVF       FARG_Write_Symbol_mysymbols+0, 0
	XORLW      104
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol125
L_Write_Symbol102:
;MatrizdeLed.c,398 :: 		if(maxrow==0 && maxcolumn==0) lc=0;
	MOVLW      0
	XORWF      FARG_Write_Symbol_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Symbol291
	MOVLW      0
	XORWF      FARG_Write_Symbol_maxrow+0, 0
L__Write_Symbol291:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Symbol128
	MOVLW      0
	XORWF      FARG_Write_Symbol_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Symbol292
	MOVLW      0
	XORWF      FARG_Write_Symbol_maxcolumn+0, 0
L__Write_Symbol292:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Symbol128
L__Write_Symbol229:
	CLRF       Write_Symbol_lc_L0+0
	CLRF       Write_Symbol_lc_L0+1
L_Write_Symbol128:
;MatrizdeLed.c,399 :: 		if(maxrow==0 && maxcolumn==1) lc=1;
	MOVLW      0
	XORWF      FARG_Write_Symbol_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Symbol293
	MOVLW      0
	XORWF      FARG_Write_Symbol_maxrow+0, 0
L__Write_Symbol293:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Symbol131
	MOVLW      0
	XORWF      FARG_Write_Symbol_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Symbol294
	MOVLW      1
	XORWF      FARG_Write_Symbol_maxcolumn+0, 0
L__Write_Symbol294:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Symbol131
L__Write_Symbol228:
	MOVLW      1
	MOVWF      Write_Symbol_lc_L0+0
	MOVLW      0
	MOVWF      Write_Symbol_lc_L0+1
L_Write_Symbol131:
;MatrizdeLed.c,400 :: 		if(maxrow==1 && maxcolumn==0) lc=10;
	MOVLW      0
	XORWF      FARG_Write_Symbol_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Symbol295
	MOVLW      1
	XORWF      FARG_Write_Symbol_maxrow+0, 0
L__Write_Symbol295:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Symbol134
	MOVLW      0
	XORWF      FARG_Write_Symbol_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Symbol296
	MOVLW      0
	XORWF      FARG_Write_Symbol_maxcolumn+0, 0
L__Write_Symbol296:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Symbol134
L__Write_Symbol227:
	MOVLW      10
	MOVWF      Write_Symbol_lc_L0+0
	MOVLW      0
	MOVWF      Write_Symbol_lc_L0+1
L_Write_Symbol134:
;MatrizdeLed.c,401 :: 		if(maxrow==1 && maxcolumn==1) lc=11;
	MOVLW      0
	XORWF      FARG_Write_Symbol_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Symbol297
	MOVLW      1
	XORWF      FARG_Write_Symbol_maxrow+0, 0
L__Write_Symbol297:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Symbol137
	MOVLW      0
	XORWF      FARG_Write_Symbol_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Symbol298
	MOVLW      1
	XORWF      FARG_Write_Symbol_maxcolumn+0, 0
L__Write_Symbol298:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_Symbol137
L__Write_Symbol226:
	MOVLW      11
	MOVWF      Write_Symbol_lc_L0+0
	MOVLW      0
	MOVWF      Write_Symbol_lc_L0+1
L_Write_Symbol137:
;MatrizdeLed.c,403 :: 		switch(lc){
	GOTO       L_Write_Symbol138
;MatrizdeLed.c,404 :: 		case 0:
L_Write_Symbol140:
;MatrizdeLed.c,405 :: 		for(Column1=2;Column1<8;Column1++)
	MOVLW      2
	MOVWF      Write_Symbol_Column1_L0+0
L_Write_Symbol141:
	MOVLW      8
	SUBWF      Write_Symbol_Column1_L0+0, 0
	BTFSC      STATUS+0, 0
	GOTO       L_Write_Symbol142
;MatrizdeLed.c,407 :: 		Write_Byte(Column1, Symbols[Start_Byte1++],0,0);
	MOVF       Write_Symbol_Column1_L0+0, 0
	MOVWF      FARG_Write_Byte_myColumn+0
	MOVF       Write_Symbol_Start_Byte1_L0+0, 0
	ADDLW      _Symbols+0
	MOVWF      R0+0
	MOVLW      hi_addr(_Symbols+0)
	BTFSC      STATUS+0, 0
	ADDLW      1
	MOVWF      R0+1
	MOVF       R0+0, 0
	MOVWF      ___DoICPAddr+0
	MOVF       R0+1, 0
	MOVWF      ___DoICPAddr+1
	CALL       _____DoICP+0
	MOVWF      FARG_Write_Byte_myValue+0
	CLRF       FARG_Write_Byte_maxrow+0
	CLRF       FARG_Write_Byte_maxrow+1
	CLRF       FARG_Write_Byte_maxcolumn+0
	CLRF       FARG_Write_Byte_maxcolumn+1
	CALL       _Write_Byte+0
	INCF       Write_Symbol_Start_Byte1_L0+0, 1
;MatrizdeLed.c,405 :: 		for(Column1=2;Column1<8;Column1++)
	INCF       Write_Symbol_Column1_L0+0, 1
;MatrizdeLed.c,408 :: 		}
	GOTO       L_Write_Symbol141
L_Write_Symbol142:
;MatrizdeLed.c,410 :: 		case 1:
L_Write_Symbol144:
;MatrizdeLed.c,411 :: 		for(Column1=2;Column1<8;Column1++)
	MOVLW      2
	MOVWF      Write_Symbol_Column1_L0+0
L_Write_Symbol145:
	MOVLW      8
	SUBWF      Write_Symbol_Column1_L0+0, 0
	BTFSC      STATUS+0, 0
	GOTO       L_Write_Symbol146
;MatrizdeLed.c,413 :: 		Write_Byte(Column1, Symbols[Start_Byte1++],0,1);
	MOVF       Write_Symbol_Column1_L0+0, 0
	MOVWF      FARG_Write_Byte_myColumn+0
	MOVF       Write_Symbol_Start_Byte1_L0+0, 0
	ADDLW      _Symbols+0
	MOVWF      R0+0
	MOVLW      hi_addr(_Symbols+0)
	BTFSC      STATUS+0, 0
	ADDLW      1
	MOVWF      R0+1
	MOVF       R0+0, 0
	MOVWF      ___DoICPAddr+0
	MOVF       R0+1, 0
	MOVWF      ___DoICPAddr+1
	CALL       _____DoICP+0
	MOVWF      FARG_Write_Byte_myValue+0
	CLRF       FARG_Write_Byte_maxrow+0
	CLRF       FARG_Write_Byte_maxrow+1
	MOVLW      1
	MOVWF      FARG_Write_Byte_maxcolumn+0
	MOVLW      0
	MOVWF      FARG_Write_Byte_maxcolumn+1
	CALL       _Write_Byte+0
	INCF       Write_Symbol_Start_Byte1_L0+0, 1
;MatrizdeLed.c,411 :: 		for(Column1=2;Column1<8;Column1++)
	INCF       Write_Symbol_Column1_L0+0, 1
;MatrizdeLed.c,414 :: 		}
	GOTO       L_Write_Symbol145
L_Write_Symbol146:
;MatrizdeLed.c,416 :: 		}
	GOTO       L_Write_Symbol139
L_Write_Symbol138:
	MOVLW      0
	XORWF      Write_Symbol_lc_L0+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Symbol299
	MOVLW      0
	XORWF      Write_Symbol_lc_L0+0, 0
L__Write_Symbol299:
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol140
	MOVLW      0
	XORWF      Write_Symbol_lc_L0+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_Symbol300
	MOVLW      1
	XORWF      Write_Symbol_lc_L0+0, 0
L__Write_Symbol300:
	BTFSC      STATUS+0, 2
	GOTO       L_Write_Symbol144
L_Write_Symbol139:
;MatrizdeLed.c,420 :: 		}
L_end_Write_Symbol:
	RETURN
; end of _Write_Symbol

_Write_acento:

;MatrizdeLed.c,422 :: 		void Write_acento(char myacento,int maxrow, int maxcolumn){
;MatrizdeLed.c,426 :: 		Clear_Matrix();
	CALL       _Clear_Matrix+0
;MatrizdeLed.c,430 :: 		if(maxrow==0 && maxcolumn==0) lc=0;
	MOVLW      0
	XORWF      FARG_Write_acento_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_acento302
	MOVLW      0
	XORWF      FARG_Write_acento_maxrow+0, 0
L__Write_acento302:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_acento150
	MOVLW      0
	XORWF      FARG_Write_acento_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_acento303
	MOVLW      0
	XORWF      FARG_Write_acento_maxcolumn+0, 0
L__Write_acento303:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_acento150
L__Write_acento233:
	CLRF       Write_acento_lc_L0+0
	CLRF       Write_acento_lc_L0+1
L_Write_acento150:
;MatrizdeLed.c,431 :: 		if(maxrow==0 && maxcolumn==1) lc=1;
	MOVLW      0
	XORWF      FARG_Write_acento_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_acento304
	MOVLW      0
	XORWF      FARG_Write_acento_maxrow+0, 0
L__Write_acento304:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_acento153
	MOVLW      0
	XORWF      FARG_Write_acento_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_acento305
	MOVLW      1
	XORWF      FARG_Write_acento_maxcolumn+0, 0
L__Write_acento305:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_acento153
L__Write_acento232:
	MOVLW      1
	MOVWF      Write_acento_lc_L0+0
	MOVLW      0
	MOVWF      Write_acento_lc_L0+1
L_Write_acento153:
;MatrizdeLed.c,432 :: 		if(maxrow==1 && maxcolumn==0) lc=10;
	MOVLW      0
	XORWF      FARG_Write_acento_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_acento306
	MOVLW      1
	XORWF      FARG_Write_acento_maxrow+0, 0
L__Write_acento306:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_acento156
	MOVLW      0
	XORWF      FARG_Write_acento_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_acento307
	MOVLW      0
	XORWF      FARG_Write_acento_maxcolumn+0, 0
L__Write_acento307:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_acento156
L__Write_acento231:
	MOVLW      10
	MOVWF      Write_acento_lc_L0+0
	MOVLW      0
	MOVWF      Write_acento_lc_L0+1
L_Write_acento156:
;MatrizdeLed.c,433 :: 		if(maxrow==1 && maxcolumn==1) lc=11;
	MOVLW      0
	XORWF      FARG_Write_acento_maxrow+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_acento308
	MOVLW      1
	XORWF      FARG_Write_acento_maxrow+0, 0
L__Write_acento308:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_acento159
	MOVLW      0
	XORWF      FARG_Write_acento_maxcolumn+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_acento309
	MOVLW      1
	XORWF      FARG_Write_acento_maxcolumn+0, 0
L__Write_acento309:
	BTFSS      STATUS+0, 2
	GOTO       L_Write_acento159
L__Write_acento230:
	MOVLW      11
	MOVWF      Write_acento_lc_L0+0
	MOVLW      0
	MOVWF      Write_acento_lc_L0+1
L_Write_acento159:
;MatrizdeLed.c,435 :: 		switch(myacento) {
	GOTO       L_Write_acento160
;MatrizdeLed.c,436 :: 		case 'á': Start_Byte1=0;break;
L_Write_acento162:
	CLRF       Write_acento_Start_Byte1_L0+0
	GOTO       L_Write_acento161
;MatrizdeLed.c,437 :: 		case 'â':Start_Byte1=6;break;
L_Write_acento163:
	MOVLW      6
	MOVWF      Write_acento_Start_Byte1_L0+0
	GOTO       L_Write_acento161
;MatrizdeLed.c,438 :: 		case 'ã': Start_Byte1=12;break;
L_Write_acento164:
	MOVLW      12
	MOVWF      Write_acento_Start_Byte1_L0+0
	GOTO       L_Write_acento161
;MatrizdeLed.c,439 :: 		case 'é':Start_Byte1=18;break;
L_Write_acento165:
	MOVLW      18
	MOVWF      Write_acento_Start_Byte1_L0+0
	GOTO       L_Write_acento161
;MatrizdeLed.c,440 :: 		case 'ê': Start_Byte1=24;break;
L_Write_acento166:
	MOVLW      24
	MOVWF      Write_acento_Start_Byte1_L0+0
	GOTO       L_Write_acento161
;MatrizdeLed.c,441 :: 		case 'í':Start_Byte1=30;break;
L_Write_acento167:
	MOVLW      30
	MOVWF      Write_acento_Start_Byte1_L0+0
	GOTO       L_Write_acento161
;MatrizdeLed.c,442 :: 		case 'ó': Start_Byte1=36;break;
L_Write_acento168:
	MOVLW      36
	MOVWF      Write_acento_Start_Byte1_L0+0
	GOTO       L_Write_acento161
;MatrizdeLed.c,443 :: 		case 'ô':Start_Byte1=42;break;
L_Write_acento169:
	MOVLW      42
	MOVWF      Write_acento_Start_Byte1_L0+0
	GOTO       L_Write_acento161
;MatrizdeLed.c,444 :: 		case 'õ': Start_Byte1=48;break;
L_Write_acento170:
	MOVLW      48
	MOVWF      Write_acento_Start_Byte1_L0+0
	GOTO       L_Write_acento161
;MatrizdeLed.c,445 :: 		case 'ú':Start_Byte1=54;break;
L_Write_acento171:
	MOVLW      54
	MOVWF      Write_acento_Start_Byte1_L0+0
	GOTO       L_Write_acento161
;MatrizdeLed.c,446 :: 		}
L_Write_acento160:
	MOVF       FARG_Write_acento_myacento+0, 0
	XORLW      225
	BTFSC      STATUS+0, 2
	GOTO       L_Write_acento162
	MOVF       FARG_Write_acento_myacento+0, 0
	XORLW      226
	BTFSC      STATUS+0, 2
	GOTO       L_Write_acento163
	MOVF       FARG_Write_acento_myacento+0, 0
	XORLW      227
	BTFSC      STATUS+0, 2
	GOTO       L_Write_acento164
	MOVF       FARG_Write_acento_myacento+0, 0
	XORLW      233
	BTFSC      STATUS+0, 2
	GOTO       L_Write_acento165
	MOVF       FARG_Write_acento_myacento+0, 0
	XORLW      234
	BTFSC      STATUS+0, 2
	GOTO       L_Write_acento166
	MOVF       FARG_Write_acento_myacento+0, 0
	XORLW      237
	BTFSC      STATUS+0, 2
	GOTO       L_Write_acento167
	MOVF       FARG_Write_acento_myacento+0, 0
	XORLW      243
	BTFSC      STATUS+0, 2
	GOTO       L_Write_acento168
	MOVF       FARG_Write_acento_myacento+0, 0
	XORLW      244
	BTFSC      STATUS+0, 2
	GOTO       L_Write_acento169
	MOVF       FARG_Write_acento_myacento+0, 0
	XORLW      245
	BTFSC      STATUS+0, 2
	GOTO       L_Write_acento170
	MOVF       FARG_Write_acento_myacento+0, 0
	XORLW      250
	BTFSC      STATUS+0, 2
	GOTO       L_Write_acento171
L_Write_acento161:
;MatrizdeLed.c,448 :: 		switch(lc){
	GOTO       L_Write_acento172
;MatrizdeLed.c,449 :: 		case 0:
L_Write_acento174:
;MatrizdeLed.c,451 :: 		for(Column1=2;Column1<8;Column1++)
	MOVLW      2
	MOVWF      Write_acento_Column1_L0+0
L_Write_acento175:
	MOVLW      8
	SUBWF      Write_acento_Column1_L0+0, 0
	BTFSC      STATUS+0, 0
	GOTO       L_Write_acento176
;MatrizdeLed.c,453 :: 		Write_Byte(Column1, acentuacao[Start_Byte1++],0,0);
	MOVF       Write_acento_Column1_L0+0, 0
	MOVWF      FARG_Write_Byte_myColumn+0
	MOVF       Write_acento_Start_Byte1_L0+0, 0
	ADDLW      _acentuacao+0
	MOVWF      R0+0
	MOVLW      hi_addr(_acentuacao+0)
	BTFSC      STATUS+0, 0
	ADDLW      1
	MOVWF      R0+1
	MOVF       R0+0, 0
	MOVWF      ___DoICPAddr+0
	MOVF       R0+1, 0
	MOVWF      ___DoICPAddr+1
	CALL       _____DoICP+0
	MOVWF      FARG_Write_Byte_myValue+0
	CLRF       FARG_Write_Byte_maxrow+0
	CLRF       FARG_Write_Byte_maxrow+1
	CLRF       FARG_Write_Byte_maxcolumn+0
	CLRF       FARG_Write_Byte_maxcolumn+1
	CALL       _Write_Byte+0
	INCF       Write_acento_Start_Byte1_L0+0, 1
;MatrizdeLed.c,451 :: 		for(Column1=2;Column1<8;Column1++)
	INCF       Write_acento_Column1_L0+0, 1
;MatrizdeLed.c,454 :: 		} break;
	GOTO       L_Write_acento175
L_Write_acento176:
	GOTO       L_Write_acento173
;MatrizdeLed.c,456 :: 		case 1:
L_Write_acento178:
;MatrizdeLed.c,457 :: 		for(Column1=2;Column1<8;Column1++)
	MOVLW      2
	MOVWF      Write_acento_Column1_L0+0
L_Write_acento179:
	MOVLW      8
	SUBWF      Write_acento_Column1_L0+0, 0
	BTFSC      STATUS+0, 0
	GOTO       L_Write_acento180
;MatrizdeLed.c,459 :: 		Write_Byte(Column1, acentuacao[Start_Byte1++],0,1);
	MOVF       Write_acento_Column1_L0+0, 0
	MOVWF      FARG_Write_Byte_myColumn+0
	MOVF       Write_acento_Start_Byte1_L0+0, 0
	ADDLW      _acentuacao+0
	MOVWF      R0+0
	MOVLW      hi_addr(_acentuacao+0)
	BTFSC      STATUS+0, 0
	ADDLW      1
	MOVWF      R0+1
	MOVF       R0+0, 0
	MOVWF      ___DoICPAddr+0
	MOVF       R0+1, 0
	MOVWF      ___DoICPAddr+1
	CALL       _____DoICP+0
	MOVWF      FARG_Write_Byte_myValue+0
	CLRF       FARG_Write_Byte_maxrow+0
	CLRF       FARG_Write_Byte_maxrow+1
	MOVLW      1
	MOVWF      FARG_Write_Byte_maxcolumn+0
	MOVLW      0
	MOVWF      FARG_Write_Byte_maxcolumn+1
	CALL       _Write_Byte+0
	INCF       Write_acento_Start_Byte1_L0+0, 1
;MatrizdeLed.c,457 :: 		for(Column1=2;Column1<8;Column1++)
	INCF       Write_acento_Column1_L0+0, 1
;MatrizdeLed.c,460 :: 		} break;
	GOTO       L_Write_acento179
L_Write_acento180:
	GOTO       L_Write_acento173
;MatrizdeLed.c,461 :: 		}
L_Write_acento172:
	MOVLW      0
	XORWF      Write_acento_lc_L0+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_acento310
	MOVLW      0
	XORWF      Write_acento_lc_L0+0, 0
L__Write_acento310:
	BTFSC      STATUS+0, 2
	GOTO       L_Write_acento174
	MOVLW      0
	XORWF      Write_acento_lc_L0+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Write_acento311
	MOVLW      1
	XORWF      Write_acento_lc_L0+0, 0
L__Write_acento311:
	BTFSC      STATUS+0, 2
	GOTO       L_Write_acento178
L_Write_acento173:
;MatrizdeLed.c,463 :: 		}
L_end_Write_acento:
	RETURN
; end of _Write_acento

_Char_scroll_left:

;MatrizdeLed.c,465 :: 		void Char_scroll_left(char myChar,int row,int begin_column,int end_column,int begin_max,int end_max){
;MatrizdeLed.c,467 :: 		unsigned short i,j,StartByte,n,m=0,c;
;MatrizdeLed.c,471 :: 		for(i=0;i<6;i++){
	CLRF       Char_scroll_left_i_L0+0
L_Char_scroll_left182:
	MOVLW      6
	SUBWF      Char_scroll_left_i_L0+0, 0
	BTFSC      STATUS+0, 0
	GOTO       L_Char_scroll_left183
	INCF       Char_scroll_left_i_L0+0, 1
;MatrizdeLed.c,473 :: 		}
	GOTO       L_Char_scroll_left182
L_Char_scroll_left183:
;MatrizdeLed.c,474 :: 		for(i=0;i<8;i++){
	CLRF       Char_scroll_left_i_L0+0
L_Char_scroll_left185:
	MOVLW      8
	SUBWF      Char_scroll_left_i_L0+0, 0
	BTFSC      STATUS+0, 0
	GOTO       L_Char_scroll_left186
	INCF       Char_scroll_left_i_L0+0, 1
;MatrizdeLed.c,476 :: 		}
	GOTO       L_Char_scroll_left185
L_Char_scroll_left186:
;MatrizdeLed.c,479 :: 		if(end_max!=begin_max) {c=0; }
	MOVF       FARG_Char_scroll_left_end_max+1, 0
	XORWF      FARG_Char_scroll_left_begin_max+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Char_scroll_left313
	MOVF       FARG_Char_scroll_left_begin_max+0, 0
	XORWF      FARG_Char_scroll_left_end_max+0, 0
L__Char_scroll_left313:
	BTFSC      STATUS+0, 2
	GOTO       L_Char_scroll_left188
	CLRF       Char_scroll_left_c_L0+0
L_Char_scroll_left188:
;MatrizdeLed.c,480 :: 		if(end_max==begin_max) {c=1; }
	MOVF       FARG_Char_scroll_left_end_max+1, 0
	XORWF      FARG_Char_scroll_left_begin_max+1, 0
	BTFSS      STATUS+0, 2
	GOTO       L__Char_scroll_left314
	MOVF       FARG_Char_scroll_left_begin_max+0, 0
	XORWF      FARG_Char_scroll_left_end_max+0, 0
L__Char_scroll_left314:
	BTFSS      STATUS+0, 2
	GOTO       L_Char_scroll_left189
	MOVLW      1
	MOVWF      Char_scroll_left_c_L0+0
L_Char_scroll_left189:
;MatrizdeLed.c,481 :: 		switch(c){
	GOTO       L_Char_scroll_left190
;MatrizdeLed.c,483 :: 		case 1:
L_Char_scroll_left192:
;MatrizdeLed.c,484 :: 		m= 7*(end_max-begin_max);n= (begin_column-end_column);
	MOVF       FARG_Char_scroll_left_end_column+0, 0
	SUBWF      FARG_Char_scroll_left_begin_column+0, 0
	MOVWF      Char_scroll_left_n_L0+0
;MatrizdeLed.c,485 :: 		for(j=0;j<0;j++){
	CLRF       Char_scroll_left_j_L0+0
L_Char_scroll_left193:
	MOVLW      0
	SUBWF      Char_scroll_left_j_L0+0, 0
	BTFSC      STATUS+0, 0
	GOTO       L_Char_scroll_left194
;MatrizdeLed.c,486 :: 		for(i=0;i<n;i++){
	CLRF       Char_scroll_left_i_L0+0
L_Char_scroll_left196:
	MOVF       Char_scroll_left_n_L0+0, 0
	SUBWF      Char_scroll_left_i_L0+0, 0
	BTFSC      STATUS+0, 0
	GOTO       L_Char_scroll_left197
;MatrizdeLed.c,487 :: 		Write_Byte(begin_column-i,Display_Byte[j],row,begin_max);
	MOVF       Char_scroll_left_i_L0+0, 0
	SUBWF      FARG_Char_scroll_left_begin_column+0, 0
	MOVWF      FARG_Write_Byte_myColumn+0
	MOVF       Char_scroll_left_j_L0+0, 0
	ADDLW      Char_scroll_left_Display_Byte_L0+0
	MOVWF      FSR
	MOVF       INDF+0, 0
	MOVWF      FARG_Write_Byte_myValue+0
	MOVF       FARG_Char_scroll_left_row+0, 0
	MOVWF      FARG_Write_Byte_maxrow+0
	MOVF       FARG_Char_scroll_left_row+1, 0
	MOVWF      FARG_Write_Byte_maxrow+1
	MOVF       FARG_Char_scroll_left_begin_max+0, 0
	MOVWF      FARG_Write_Byte_maxcolumn+0
	MOVF       FARG_Char_scroll_left_begin_max+1, 0
	MOVWF      FARG_Write_Byte_maxcolumn+1
	CALL       _Write_Byte+0
;MatrizdeLed.c,486 :: 		for(i=0;i<n;i++){
	INCF       Char_scroll_left_i_L0+0, 1
;MatrizdeLed.c,488 :: 		}
	GOTO       L_Char_scroll_left196
L_Char_scroll_left197:
;MatrizdeLed.c,489 :: 		Delay_ms(50);
	MOVLW      130
	MOVWF      R12+0
	MOVLW      221
	MOVWF      R13+0
L_Char_scroll_left199:
	DECFSZ     R13+0, 1
	GOTO       L_Char_scroll_left199
	DECFSZ     R12+0, 1
	GOTO       L_Char_scroll_left199
	NOP
	NOP
;MatrizdeLed.c,490 :: 		Clear_Matrix();
	CALL       _Clear_Matrix+0
;MatrizdeLed.c,492 :: 		Delay_ms(50);
	MOVLW      130
	MOVWF      R12+0
	MOVLW      221
	MOVWF      R13+0
L_Char_scroll_left200:
	DECFSZ     R13+0, 1
	GOTO       L_Char_scroll_left200
	DECFSZ     R12+0, 1
	GOTO       L_Char_scroll_left200
	NOP
	NOP
;MatrizdeLed.c,485 :: 		for(j=0;j<0;j++){
	INCF       Char_scroll_left_j_L0+0, 1
;MatrizdeLed.c,494 :: 		} break;
	GOTO       L_Char_scroll_left193
L_Char_scroll_left194:
	GOTO       L_Char_scroll_left191
;MatrizdeLed.c,495 :: 		case 0:
L_Char_scroll_left201:
;MatrizdeLed.c,496 :: 		n= (begin_column-end_column);
	MOVF       FARG_Char_scroll_left_end_column+0, 0
	SUBWF      FARG_Char_scroll_left_begin_column+0, 0
	MOVWF      Char_scroll_left_n_L0+0
;MatrizdeLed.c,497 :: 		break;
	GOTO       L_Char_scroll_left191
;MatrizdeLed.c,499 :: 		}
L_Char_scroll_left190:
	MOVF       Char_scroll_left_c_L0+0, 0
	XORLW      1
	BTFSC      STATUS+0, 2
	GOTO       L_Char_scroll_left192
	MOVF       Char_scroll_left_c_L0+0, 0
	XORLW      0
	BTFSC      STATUS+0, 2
	GOTO       L_Char_scroll_left201
L_Char_scroll_left191:
;MatrizdeLed.c,500 :: 		}
L_end_Char_scroll_left:
	RETURN
; end of _Char_scroll_left

_led_string:

;MatrizdeLed.c,503 :: 		void led_string(const char *s,int row,int begin_column,int end_column,int begin_max,int end_max)
;MatrizdeLed.c,505 :: 		while(*s) Char_scroll_left(*s++,row,begin_column,end_column,begin_max,end_max);
L_led_string202:
	MOVF       FARG_led_string_s+0, 0
	MOVWF      ___DoICPAddr+0
	MOVF       FARG_led_string_s+1, 0
	MOVWF      ___DoICPAddr+1
	CALL       _____DoICP+0
	MOVWF      R0+0
	MOVF       R0+0, 0
	BTFSC      STATUS+0, 2
	GOTO       L_led_string203
	MOVF       FARG_led_string_s+0, 0
	MOVWF      ___DoICPAddr+0
	MOVF       FARG_led_string_s+1, 0
	MOVWF      ___DoICPAddr+1
	CALL       _____DoICP+0
	MOVWF      FARG_Char_scroll_left_myChar+0
	MOVF       FARG_led_string_row+0, 0
	MOVWF      FARG_Char_scroll_left_row+0
	MOVF       FARG_led_string_row+1, 0
	MOVWF      FARG_Char_scroll_left_row+1
	MOVF       FARG_led_string_begin_column+0, 0
	MOVWF      FARG_Char_scroll_left_begin_column+0
	MOVF       FARG_led_string_begin_column+1, 0
	MOVWF      FARG_Char_scroll_left_begin_column+1
	MOVF       FARG_led_string_end_column+0, 0
	MOVWF      FARG_Char_scroll_left_end_column+0
	MOVF       FARG_led_string_end_column+1, 0
	MOVWF      FARG_Char_scroll_left_end_column+1
	MOVF       FARG_led_string_begin_max+0, 0
	MOVWF      FARG_Char_scroll_left_begin_max+0
	MOVF       FARG_led_string_begin_max+1, 0
	MOVWF      FARG_Char_scroll_left_begin_max+1
	MOVF       FARG_led_string_end_max+0, 0
	MOVWF      FARG_Char_scroll_left_end_max+0
	MOVF       FARG_led_string_end_max+1, 0
	MOVWF      FARG_Char_scroll_left_end_max+1
	CALL       _Char_scroll_left+0
	INCF       FARG_led_string_s+0, 1
	BTFSC      STATUS+0, 2
	INCF       FARG_led_string_s+1, 1
	GOTO       L_led_string202
L_led_string203:
;MatrizdeLed.c,506 :: 		}
L_end_led_string:
	RETURN
; end of _led_string

_main:

;MatrizdeLed.c,514 :: 		void main()
;MatrizdeLed.c,516 :: 		TRISA.RA0 = 1;
	BSF        TRISA+0, 0
;MatrizdeLed.c,520 :: 		Chip_Select_Direction = 0;    // Set RC0 pin as output.
	BCF        TRISC0_bit+0, BitPos(TRISC0_bit+0)
;MatrizdeLed.c,521 :: 		SPI1_init();                  // Initialize SPI1 module.
	CALL       _SPI1_Init+0
;MatrizdeLed.c,523 :: 		max7219_init(0,0);              // initialize  max7219.
	CLRF       FARG_max7219_init_maxrow+0
	CLRF       FARG_max7219_init_maxrow+1
	CLRF       FARG_max7219_init_maxcolumn+0
	CLRF       FARG_max7219_init_maxcolumn+1
	CALL       _max7219_init+0
;MatrizdeLed.c,524 :: 		max7219_init(0,1);
	CLRF       FARG_max7219_init_maxrow+0
	CLRF       FARG_max7219_init_maxrow+1
	MOVLW      1
	MOVWF      FARG_max7219_init_maxcolumn+0
	MOVLW      0
	MOVWF      FARG_max7219_init_maxcolumn+1
	CALL       _max7219_init+0
;MatrizdeLed.c,526 :: 		Clear_Matrix();
	CALL       _Clear_Matrix+0
;MatrizdeLed.c,528 :: 		while(1)                            // infinite loop.
L_main204:
;MatrizdeLed.c,531 :: 		Char_scroll_left('A',0,8,0,0,0);
	MOVLW      65
	MOVWF      FARG_Char_scroll_left_myChar+0
	CLRF       FARG_Char_scroll_left_row+0
	CLRF       FARG_Char_scroll_left_row+1
	MOVLW      8
	MOVWF      FARG_Char_scroll_left_begin_column+0
	MOVLW      0
	MOVWF      FARG_Char_scroll_left_begin_column+1
	CLRF       FARG_Char_scroll_left_end_column+0
	CLRF       FARG_Char_scroll_left_end_column+1
	CLRF       FARG_Char_scroll_left_begin_max+0
	CLRF       FARG_Char_scroll_left_begin_max+1
	CLRF       FARG_Char_scroll_left_end_max+0
	CLRF       FARG_Char_scroll_left_end_max+1
	CALL       _Char_scroll_left+0
;MatrizdeLed.c,561 :: 		}
	GOTO       L_main204
;MatrizdeLed.c,562 :: 		}
L_end_main:
	GOTO       $+0
; end of _main
