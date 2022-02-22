
_interrupt:
	MOVWF      R15+0
	SWAPF      STATUS+0, 0
	CLRF       STATUS+0
	MOVWF      ___saveSTATUS+0
	MOVF       PCLATH+0, 0
	MOVWF      ___savePCLATH+0
	CLRF       PCLATH+0

;MyProject.c,4 :: 		void interrupt(){
;MyProject.c,5 :: 		if(TMR0IF_bit){
	BTFSS      TMR0IF_bit+0, BitPos(TMR0IF_bit+0)
	GOTO       L_interrupt0
;MyProject.c,7 :: 		TMR0IF_bit = 0x00;
	BCF        TMR0IF_bit+0, BitPos(TMR0IF_bit+0)
;MyProject.c,9 :: 		for(i=-180;i<=180;i++){
	MOVLW      76
	MOVWF      _i+0
	MOVLW      255
	MOVWF      _i+1
L_interrupt1:
	MOVLW      128
	MOVWF      R0+0
	MOVLW      128
	XORWF      _i+1, 0
	SUBWF      R0+0, 0
	BTFSS      STATUS+0, 2
	GOTO       L__interrupt6
	MOVF       _i+0, 0
	SUBLW      180
L__interrupt6:
	BTFSS      STATUS+0, 0
	GOTO       L_interrupt2
;MyProject.c,10 :: 		saida= 127+ sinE3(i*0.0174)*(127.5);
	MOVF       _i+0, 0
	MOVWF      R0+0
	MOVF       _i+1, 0
	MOVWF      R0+1
	CALL       _int2double+0
	MOVLW      114
	MOVWF      R4+0
	MOVLW      138
	MOVWF      R4+1
	MOVLW      14
	MOVWF      R4+2
	MOVLW      121
	MOVWF      R4+3
	CALL       _Mul_32x32_FP+0
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
	MOVLW      0
	MOVWF      R4+0
	MOVLW      0
	MOVWF      R4+1
	MOVLW      126
	MOVWF      R4+2
	MOVLW      133
	MOVWF      R4+3
	CALL       _Add_32x32_FP+0
	CALL       _double2byte+0
	BTFSC      R0+0, 0
	GOTO       L__interrupt7
	BCF        GPIO+0, 0
	GOTO       L__interrupt8
L__interrupt7:
	BSF        GPIO+0, 0
L__interrupt8:
;MyProject.c,9 :: 		for(i=-180;i<=180;i++){
	INCF       _i+0, 1
	BTFSC      STATUS+0, 2
	INCF       _i+1, 1
;MyProject.c,11 :: 		}
	GOTO       L_interrupt1
L_interrupt2:
;MyProject.c,12 :: 		}
L_interrupt0:
;MyProject.c,13 :: 		}
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

;MyProject.c,15 :: 		void main() {
;MyProject.c,17 :: 		CMCON  = 0x07; // Disable Comparator
	MOVLW      7
	MOVWF      CMCON+0
;MyProject.c,18 :: 		ADCON0 = 0x00; // Disable ADC
	CLRF       ADCON0+0
;MyProject.c,19 :: 		ANSEL  = 0x00; // All ports in digital
	CLRF       ANSEL+0
;MyProject.c,20 :: 		TRISIO = 0x00; // All pins in OUT
	CLRF       TRISIO+0
;MyProject.c,22 :: 		OPTION_REG  = 0b10000000;  // Configuration 1000 0101
	MOVLW      128
	MOVWF      OPTION_REG+0
;MyProject.c,25 :: 		TMR0        = 100;   // 100Hz or 9,984ms ~ 10ms (10ms x 100 = 1000ms)
	MOVLW      100
	MOVWF      TMR0+0
;MyProject.c,26 :: 		INTCON      = 0xA0;  //
	MOVLW      160
	MOVWF      INTCON+0
;MyProject.c,29 :: 		}
L_end_main:
	GOTO       $+0
; end of _main
