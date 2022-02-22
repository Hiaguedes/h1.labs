
_main:

;MyProject.c,2 :: 		void main() {
;MyProject.c,4 :: 		TRISD.RD0= 0x00;
	BCF         TRISD+0, 0 
;MyProject.c,5 :: 		PORTD.RD0= 1;
	BSF         PORTD+0, 0 
;MyProject.c,6 :: 		CMCON=0X07;
	MOVLW       7
	MOVWF       CMCON+0 
;MyProject.c,7 :: 		while(1){
L_main0:
;MyProject.c,8 :: 		PORTD.RD0 = 0;
	BCF         PORTD+0, 0 
;MyProject.c,9 :: 		delay_ms(100);
	MOVLW       2
	MOVWF       R11, 0
	MOVLW       4
	MOVWF       R12, 0
	MOVLW       186
	MOVWF       R13, 0
L_main2:
	DECFSZ      R13, 1, 1
	BRA         L_main2
	DECFSZ      R12, 1, 1
	BRA         L_main2
	DECFSZ      R11, 1, 1
	BRA         L_main2
	NOP
;MyProject.c,10 :: 		PORTD.RD0 = 1;
	BSF         PORTD+0, 0 
;MyProject.c,11 :: 		delay_ms(100);
	MOVLW       2
	MOVWF       R11, 0
	MOVLW       4
	MOVWF       R12, 0
	MOVLW       186
	MOVWF       R13, 0
L_main3:
	DECFSZ      R13, 1, 1
	BRA         L_main3
	DECFSZ      R12, 1, 1
	BRA         L_main3
	DECFSZ      R11, 1, 1
	BRA         L_main3
	NOP
;MyProject.c,12 :: 		}
	GOTO        L_main0
;MyProject.c,13 :: 		}
L_end_main:
	GOTO        $+0
; end of _main
