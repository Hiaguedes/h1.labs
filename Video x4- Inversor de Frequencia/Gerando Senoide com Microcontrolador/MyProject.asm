
_interrupt:
	MOVWF      R15+0
	SWAPF      STATUS+0, 0
	CLRF       STATUS+0
	MOVWF      ___saveSTATUS+0
	MOVF       PCLATH+0, 0
	MOVWF      ___savePCLATH+0
	CLRF       PCLATH+0

;MyProject.c,6 :: 		void interrupt(){
;MyProject.c,7 :: 		if(TMR0IF_bit){
	BTFSS      TMR0IF_bit+0, BitPos(TMR0IF_bit+0)
	GOTO       L_interrupt0
;MyProject.c,9 :: 		TMR0IF_bit = 0x00;
	BCF        TMR0IF_bit+0, BitPos(TMR0IF_bit+0)
;MyProject.c,10 :: 		senoide();
	CALL       _senoide+0
;MyProject.c,11 :: 		}
L_interrupt0:
;MyProject.c,12 :: 		}
L_end_interrupt:
L__interrupt5:
	MOVF       ___savePCLATH+0, 0
	MOVWF      PCLATH+0
	SWAPF      ___saveSTATUS+0, 0
	MOVWF      STATUS+0
	SWAPF      R15+0, 1
	SWAPF      R15+0, 0
	RETFIE
; end of _interrupt

_main:

;MyProject.c,14 :: 		void main() {
;MyProject.c,16 :: 		CMCON  = 0x07; // Disable Comparator
	MOVLW      7
	MOVWF      CMCON+0
;MyProject.c,17 :: 		ADCON0 = 0x00; // Disable ADC
	CLRF       ADCON0+0
;MyProject.c,18 :: 		ANSEL  = 0x00; // All ports in digital
	CLRF       ANSEL+0
;MyProject.c,19 :: 		TRISIO = 0x00; // All pins in OUT
	CLRF       TRISIO+0
;MyProject.c,21 :: 		OPTION_REG  = 0b10000000;  // Configuration 1000 0101
	MOVLW      128
	MOVWF      OPTION_REG+0
;MyProject.c,24 :: 		TMR0        = 100;   // 100Hz or 9,984ms ~ 10ms (10ms x 100 = 1000ms)
	MOVLW      100
	MOVWF      TMR0+0
;MyProject.c,25 :: 		INTCON      = 0xA0;  //
	MOVLW      160
	MOVWF      INTCON+0
;MyProject.c,28 :: 		}
L_end_main:
	GOTO       $+0
; end of _main

_senoide:

;MyProject.c,32 :: 		void senoide(){
;MyProject.c,34 :: 		for(i=-180;i<=180;i++){
	MOVLW      76
	MOVWF      _i+0
	MOVLW      255
	MOVWF      _i+1
L_senoide1:
	MOVLW      128
	MOVWF      R0+0
	MOVLW      128
	XORWF      _i+1, 0
	SUBWF      R0+0, 0
	BTFSS      STATUS+0, 2
	GOTO       L__senoide8
	MOVF       _i+0, 0
	SUBLW      180
L__senoide8:
	BTFSS      STATUS+0, 0
	GOTO       L_senoide2
;MyProject.c,37 :: 		saida=  sinE3(i*3.1415/180.0)*(255.0/2.0);
	MOVF       _i+0, 0
	MOVWF      R0+0
	MOVF       _i+1, 0
	MOVWF      R0+1
	CALL       _int2double+0
	MOVLW      86
	MOVWF      R4+0
	MOVLW      14
	MOVWF      R4+1
	MOVLW      73
	MOVWF      R4+2
	MOVLW      128
	MOVWF      R4+3
	CALL       _Mul_32x32_FP+0
	MOVLW      0
	MOVWF      R4+0
	MOVLW      0
	MOVWF      R4+1
	MOVLW      52
	MOVWF      R4+2
	MOVLW      134
	MOVWF      R4+3
	CALL       _Div_32x32_FP+0
	CALL       _double2word+0
	MOVF       R0+0, 0
	MOVWF      FARG_sinE3_angle_deg+0
	MOVF       R0+1, 0
	MOVWF      FARG_sinE3_angle_deg+1
	CALL       _sinE3+0
	CALL       _int2double+0
	MOVLW      0
	MOVWF      R4+0
	MOVLW      0
	MOVWF      R4+1
	MOVLW      127
	MOVWF      R4+2
	MOVLW      133
	MOVWF      R4+3
	CALL       _Mul_32x32_FP+0
	CALL       _double2byte+0
	BTFSC      R0+0, 0
	GOTO       L__senoide9
	BCF        GPIO+0, 0
	GOTO       L__senoide10
L__senoide9:
	BSF        GPIO+0, 0
L__senoide10:
;MyProject.c,34 :: 		for(i=-180;i<=180;i++){
	INCF       _i+0, 1
	BTFSC      STATUS+0, 2
	INCF       _i+1, 1
;MyProject.c,38 :: 		}
	GOTO       L_senoide1
L_senoide2:
;MyProject.c,39 :: 		}
L_end_senoide:
	RETURN
; end of _senoide
