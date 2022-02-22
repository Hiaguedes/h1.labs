
_interrupt:
	MOVWF      R15+0
	SWAPF      STATUS+0, 0
	CLRF       STATUS+0
	MOVWF      ___saveSTATUS+0
	MOVF       PCLATH+0, 0
	MOVWF      ___savePCLATH+0
	CLRF       PCLATH+0

;vAula100_source_file.c,52 :: 		void interrupt()
;vAula100_source_file.c,54 :: 		if(TMR0IF_bit)                            //Houve o estouro do TMR0?
	BTFSS      TMR0IF_bit+0, BitPos(TMR0IF_bit+0)
	GOTO       L_interrupt0
;vAula100_source_file.c,56 :: 		TMR0IF_bit = 0x00;                     //Sim, limpa a flag
	BCF        TMR0IF_bit+0, BitPos(TMR0IF_bit+0)
;vAula100_source_file.c,59 :: 		if(!dig_mil && control == 1)           //Dígito dos milhares desligado?
	BTFSC      RB3_bit+0, BitPos(RB3_bit+0)
	GOTO       L_interrupt3
	MOVF       _control+0, 0
	XORLW      1
	BTFSS      STATUS+0, 2
	GOTO       L_interrupt3
L__interrupt25:
;vAula100_source_file.c,61 :: 		control = 0x02;                     //Sim, control recebe o valor 2
	MOVLW      2
	MOVWF      _control+0
;vAula100_source_file.c,62 :: 		dig_uni = 0x00;                     //Apaga dígito das unidades
	BCF        RB0_bit+0, BitPos(RB0_bit+0)
;vAula100_source_file.c,63 :: 		dig_dez = 0x00;                     //Apaga dígito das dezenas
	BCF        RB1_bit+0, BitPos(RB1_bit+0)
;vAula100_source_file.c,64 :: 		dig_cen = 0x00;                     //Apaga dígito das centenas
	BCF        RB2_bit+0, BitPos(RB2_bit+0)
;vAula100_source_file.c,65 :: 		PORTC   = 0x00;                     //Desliga PORTC
	CLRF       PORTC+0
;vAula100_source_file.c,66 :: 		mil = (m_amps/1000);               //Calcula o dígito do milhar
	MOVLW      232
	MOVWF      R4+0
	MOVLW      3
	MOVWF      R4+1
	CLRF       R4+2
	CLRF       R4+3
	MOVF       _m_amps+0, 0
	MOVWF      R0+0
	MOVF       _m_amps+1, 0
	MOVWF      R0+1
	MOVF       _m_amps+2, 0
	MOVWF      R0+2
	MOVF       _m_amps+3, 0
	MOVWF      R0+3
	CALL       _Div_32x32_S+0
	MOVF       R0+0, 0
	MOVWF      _mil+0
	MOVF       R0+1, 0
	MOVWF      _mil+1
;vAula100_source_file.c,67 :: 		dig_mil = 0x01;                     //Ativa dígito dos milhares
	BSF        RB3_bit+0, BitPos(RB3_bit+0)
;vAula100_source_file.c,68 :: 		PORTC   = display(mil);             //Escreve o valor no display dos milhares
	MOVF       R0+0, 0
	MOVWF      FARG_display_num+0
	MOVF       R0+1, 0
	MOVWF      FARG_display_num+1
	CALL       _display+0
	MOVF       R0+0, 0
	MOVWF      PORTC+0
;vAula100_source_file.c,70 :: 		} //end if dig_mil
	GOTO       L_interrupt4
L_interrupt3:
;vAula100_source_file.c,72 :: 		else if(!dig_cen && control == 2)      //Dígito das centenas desligado?
	BTFSC      RB2_bit+0, BitPos(RB2_bit+0)
	GOTO       L_interrupt7
	MOVF       _control+0, 0
	XORLW      2
	BTFSS      STATUS+0, 2
	GOTO       L_interrupt7
L__interrupt24:
;vAula100_source_file.c,74 :: 		control = 0x03;                    //Sim, control recebe o valor 3
	MOVLW      3
	MOVWF      _control+0
;vAula100_source_file.c,75 :: 		dig_uni = 0x00;                    //Apaga o dígito das unidades
	BCF        RB0_bit+0, BitPos(RB0_bit+0)
;vAula100_source_file.c,76 :: 		dig_dez = 0x00;                    //Apaga o dígito das dezenas
	BCF        RB1_bit+0, BitPos(RB1_bit+0)
;vAula100_source_file.c,77 :: 		dig_mil = 0x00;                    //Apaga o dígito dos milhares
	BCF        RB3_bit+0, BitPos(RB3_bit+0)
;vAula100_source_file.c,78 :: 		PORTC   = 0x00;                    //Desliga PORTC
	CLRF       PORTC+0
;vAula100_source_file.c,79 :: 		cen = (m_amps%1000)/100;          //Calcula o dígito das centenas
	MOVLW      232
	MOVWF      R4+0
	MOVLW      3
	MOVWF      R4+1
	CLRF       R4+2
	CLRF       R4+3
	MOVF       _m_amps+0, 0
	MOVWF      R0+0
	MOVF       _m_amps+1, 0
	MOVWF      R0+1
	MOVF       _m_amps+2, 0
	MOVWF      R0+2
	MOVF       _m_amps+3, 0
	MOVWF      R0+3
	CALL       _Div_32x32_S+0
	MOVF       R8+0, 0
	MOVWF      R0+0
	MOVF       R8+1, 0
	MOVWF      R0+1
	MOVF       R8+2, 0
	MOVWF      R0+2
	MOVF       R8+3, 0
	MOVWF      R0+3
	MOVLW      100
	MOVWF      R4+0
	CLRF       R4+1
	CLRF       R4+2
	CLRF       R4+3
	CALL       _Div_32x32_S+0
	MOVF       R0+0, 0
	MOVWF      _cen+0
	MOVF       R0+1, 0
	MOVWF      _cen+1
;vAula100_source_file.c,80 :: 		dig_cen = 0x01;                    //Ativa dígito das centenas
	BSF        RB2_bit+0, BitPos(RB2_bit+0)
;vAula100_source_file.c,81 :: 		PORTC   = display(cen);            //Escreve o valor no display das centenas
	MOVF       R0+0, 0
	MOVWF      FARG_display_num+0
	MOVF       R0+1, 0
	MOVWF      FARG_display_num+1
	CALL       _display+0
	MOVF       R0+0, 0
	MOVWF      PORTC+0
;vAula100_source_file.c,83 :: 		} //end if dig_cen
	GOTO       L_interrupt8
L_interrupt7:
;vAula100_source_file.c,85 :: 		else if(!dig_dez && control == 3)      //Dígito das dezenas desligado?
	BTFSC      RB1_bit+0, BitPos(RB1_bit+0)
	GOTO       L_interrupt11
	MOVF       _control+0, 0
	XORLW      3
	BTFSS      STATUS+0, 2
	GOTO       L_interrupt11
L__interrupt23:
;vAula100_source_file.c,87 :: 		control = 0x04;                    //Sim, control recebe o valor 4
	MOVLW      4
	MOVWF      _control+0
;vAula100_source_file.c,88 :: 		dig_uni = 0x00;                    //Apaga o dígito das unidades
	BCF        RB0_bit+0, BitPos(RB0_bit+0)
;vAula100_source_file.c,89 :: 		dig_cen = 0x00;                    //Apaga o dígito das centenas
	BCF        RB2_bit+0, BitPos(RB2_bit+0)
;vAula100_source_file.c,90 :: 		dig_mil = 0x00;                    //Apaga o dígito dos milhares
	BCF        RB3_bit+0, BitPos(RB3_bit+0)
;vAula100_source_file.c,91 :: 		PORTC   = 0x00;                    //Desliga PORTC
	CLRF       PORTC+0
;vAula100_source_file.c,92 :: 		dez = (m_amps%100)/10;            //Calcula o dígito das dezenas
	MOVLW      100
	MOVWF      R4+0
	CLRF       R4+1
	CLRF       R4+2
	CLRF       R4+3
	MOVF       _m_amps+0, 0
	MOVWF      R0+0
	MOVF       _m_amps+1, 0
	MOVWF      R0+1
	MOVF       _m_amps+2, 0
	MOVWF      R0+2
	MOVF       _m_amps+3, 0
	MOVWF      R0+3
	CALL       _Div_32x32_S+0
	MOVF       R8+0, 0
	MOVWF      R0+0
	MOVF       R8+1, 0
	MOVWF      R0+1
	MOVF       R8+2, 0
	MOVWF      R0+2
	MOVF       R8+3, 0
	MOVWF      R0+3
	MOVLW      10
	MOVWF      R4+0
	CLRF       R4+1
	CLRF       R4+2
	CLRF       R4+3
	CALL       _Div_32x32_S+0
	MOVF       R0+0, 0
	MOVWF      _dez+0
	MOVF       R0+1, 0
	MOVWF      _dez+1
;vAula100_source_file.c,93 :: 		dig_dez = 0x01;                    //Ativa dígito das dezenas
	BSF        RB1_bit+0, BitPos(RB1_bit+0)
;vAula100_source_file.c,94 :: 		PORTC   = display(dez);            //Escreve o valor no display das dezenas
	MOVF       R0+0, 0
	MOVWF      FARG_display_num+0
	MOVF       R0+1, 0
	MOVWF      FARG_display_num+1
	CALL       _display+0
	MOVF       R0+0, 0
	MOVWF      PORTC+0
;vAula100_source_file.c,96 :: 		} //end if dig_dez
	GOTO       L_interrupt12
L_interrupt11:
;vAula100_source_file.c,98 :: 		else if(!dig_uni && control == 4)      //Dígito das unidades desligado?
	BTFSC      RB0_bit+0, BitPos(RB0_bit+0)
	GOTO       L_interrupt15
	MOVF       _control+0, 0
	XORLW      4
	BTFSS      STATUS+0, 2
	GOTO       L_interrupt15
L__interrupt22:
;vAula100_source_file.c,100 :: 		control = 0x01;                    //Sim, control recebe o valor 1 (para encerrar a lógica)
	MOVLW      1
	MOVWF      _control+0
;vAula100_source_file.c,101 :: 		dig_dez = 0x00;                    //Apaga o dígito das dezenas
	BCF        RB1_bit+0, BitPos(RB1_bit+0)
;vAula100_source_file.c,102 :: 		dig_cen = 0x00;                    //Apaga o dígito das centenas
	BCF        RB2_bit+0, BitPos(RB2_bit+0)
;vAula100_source_file.c,103 :: 		dig_mil = 0x00;                    //Apaga o dígito dos milhares
	BCF        RB3_bit+0, BitPos(RB3_bit+0)
;vAula100_source_file.c,104 :: 		PORTC   = 0x00;                    //Desliga PORTC
	CLRF       PORTC+0
;vAula100_source_file.c,105 :: 		uni = m_amps%10;                  //Calcula o dígito das unidades
	MOVLW      10
	MOVWF      R4+0
	CLRF       R4+1
	CLRF       R4+2
	CLRF       R4+3
	MOVF       _m_amps+0, 0
	MOVWF      R0+0
	MOVF       _m_amps+1, 0
	MOVWF      R0+1
	MOVF       _m_amps+2, 0
	MOVWF      R0+2
	MOVF       _m_amps+3, 0
	MOVWF      R0+3
	CALL       _Div_32x32_S+0
	MOVF       R8+0, 0
	MOVWF      R0+0
	MOVF       R8+1, 0
	MOVWF      R0+1
	MOVF       R8+2, 0
	MOVWF      R0+2
	MOVF       R8+3, 0
	MOVWF      R0+3
	MOVF       R0+0, 0
	MOVWF      _uni+0
	MOVF       R0+1, 0
	MOVWF      _uni+1
;vAula100_source_file.c,106 :: 		dig_uni = 0x01;                    //Ativa dígito das unidades
	BSF        RB0_bit+0, BitPos(RB0_bit+0)
;vAula100_source_file.c,107 :: 		PORTC   = display(uni);            //Escreve o valor no display das unidades
	MOVF       R0+0, 0
	MOVWF      FARG_display_num+0
	MOVF       R0+1, 0
	MOVWF      FARG_display_num+1
	CALL       _display+0
	MOVF       R0+0, 0
	MOVWF      PORTC+0
;vAula100_source_file.c,108 :: 		}    //end if dig_uni
L_interrupt15:
L_interrupt12:
L_interrupt8:
L_interrupt4:
;vAula100_source_file.c,110 :: 		} //end if (teste de estouro)
L_interrupt0:
;vAula100_source_file.c,112 :: 		} //end interrupt
L_end_interrupt:
L__interrupt27:
	MOVF       ___savePCLATH+0, 0
	MOVWF      PCLATH+0
	SWAPF      ___saveSTATUS+0, 0
	MOVWF      STATUS+0
	SWAPF      R15+0, 1
	SWAPF      R15+0, 0
	RETFIE
; end of _interrupt

_main:

;vAula100_source_file.c,116 :: 		void main()
;vAula100_source_file.c,118 :: 		ADCON0     = 0x01;                        //Aciona o módulo conversor AD, Canal AN0
	MOVLW      1
	MOVWF      ADCON0+0
;vAula100_source_file.c,119 :: 		ADCON1     = 0x0E;                        //Entrada AN0 como analógica
	MOVLW      14
	MOVWF      ADCON1+0
;vAula100_source_file.c,120 :: 		CMCON      = 0x07;                        //Desabilita comparadores
	MOVLW      7
	MOVWF      CMCON+0
;vAula100_source_file.c,121 :: 		INTCON     = 0xA0;                        //Interrupção global, habilita interrupção do Timer0
	MOVLW      160
	MOVWF      INTCON+0
;vAula100_source_file.c,122 :: 		OPTION_REG = 0x83;                        //Timer0 incrementa pelo ciclo de máquina
	MOVLW      131
	MOVWF      OPTION_REG+0
;vAula100_source_file.c,124 :: 		TRISB      = 0xF0;                        //Configura TRISB<7:4> como entrada, TRISB<3:0> como saída
	MOVLW      240
	MOVWF      TRISB+0
;vAula100_source_file.c,125 :: 		TRISC      = 0x00;                        //Configura todo PORTC como saída
	CLRF       TRISC+0
;vAula100_source_file.c,126 :: 		PORTB      = 0xF0;                        //Inicializa PORTB (dígitos desligados)
	MOVLW      240
	MOVWF      PORTB+0
;vAula100_source_file.c,127 :: 		PORTC      = 0x00;                        //Inicializa PORTC (segmentos desligados), RBC em nível alto
	CLRF       PORTC+0
;vAula100_source_file.c,130 :: 		while(1)
L_main16:
;vAula100_source_file.c,133 :: 		volts();                                //Chama a função para cálculo da tensão em Volts
	CALL       _volts+0
;vAula100_source_file.c,134 :: 		delay_ms(200);                          //taxa de atualização
	MOVLW      3
	MOVWF      R11+0
	MOVLW      8
	MOVWF      R12+0
	MOVLW      119
	MOVWF      R13+0
L_main18:
	DECFSZ     R13+0, 1
	GOTO       L_main18
	DECFSZ     R12+0, 1
	GOTO       L_main18
	DECFSZ     R11+0, 1
	GOTO       L_main18
;vAula100_source_file.c,136 :: 		} //end while
	GOTO       L_main16
;vAula100_source_file.c,138 :: 		} //end main
L_end_main:
	GOTO       $+0
; end of _main

_display:

;vAula100_source_file.c,146 :: 		int display(int num)
;vAula100_source_file.c,160 :: 		0x67};                 //BCD nove   '9'
	MOVLW      63
	MOVWF      display_SEGMENTO_L0+0
	MOVLW      0
	MOVWF      display_SEGMENTO_L0+1
	MOVLW      6
	MOVWF      display_SEGMENTO_L0+2
	MOVLW      0
	MOVWF      display_SEGMENTO_L0+3
	MOVLW      91
	MOVWF      display_SEGMENTO_L0+4
	MOVLW      0
	MOVWF      display_SEGMENTO_L0+5
	MOVLW      79
	MOVWF      display_SEGMENTO_L0+6
	MOVLW      0
	MOVWF      display_SEGMENTO_L0+7
	MOVLW      102
	MOVWF      display_SEGMENTO_L0+8
	MOVLW      0
	MOVWF      display_SEGMENTO_L0+9
	MOVLW      109
	MOVWF      display_SEGMENTO_L0+10
	MOVLW      0
	MOVWF      display_SEGMENTO_L0+11
	MOVLW      125
	MOVWF      display_SEGMENTO_L0+12
	MOVLW      0
	MOVWF      display_SEGMENTO_L0+13
	MOVLW      7
	MOVWF      display_SEGMENTO_L0+14
	MOVLW      0
	MOVWF      display_SEGMENTO_L0+15
	MOVLW      127
	MOVWF      display_SEGMENTO_L0+16
	MOVLW      0
	MOVWF      display_SEGMENTO_L0+17
	MOVLW      103
	MOVWF      display_SEGMENTO_L0+18
	MOVLW      0
	MOVWF      display_SEGMENTO_L0+19
;vAula100_source_file.c,162 :: 		cathode = SEGMENTO[num];                   //para retornar o cathode
	MOVF       FARG_display_num+0, 0
	MOVWF      R0+0
	MOVF       FARG_display_num+1, 0
	MOVWF      R0+1
	RLF        R0+0, 1
	RLF        R0+1, 1
	BCF        R0+0, 0
	MOVF       R0+0, 0
	ADDLW      display_SEGMENTO_L0+0
	MOVWF      FSR
;vAula100_source_file.c,164 :: 		return(cathode);                           //retorna o número BCD
	MOVF       INDF+0, 0
	MOVWF      R0+0
	INCF       FSR, 1
	MOVF       INDF+0, 0
	MOVWF      R0+1
;vAula100_source_file.c,166 :: 		} //end display
L_end_display:
	RETURN
; end of _display

_display_dp:

;vAula100_source_file.c,168 :: 		int display_dp(int num)                        //Adiciona o ponto decimal
;vAula100_source_file.c,182 :: 		0xE7};                 //BCD nove   '9.'
	MOVLW      191
	MOVWF      display_dp_SEGMENTO_L0+0
	MOVLW      0
	MOVWF      display_dp_SEGMENTO_L0+1
	MOVLW      134
	MOVWF      display_dp_SEGMENTO_L0+2
	MOVLW      0
	MOVWF      display_dp_SEGMENTO_L0+3
	MOVLW      219
	MOVWF      display_dp_SEGMENTO_L0+4
	MOVLW      0
	MOVWF      display_dp_SEGMENTO_L0+5
	MOVLW      207
	MOVWF      display_dp_SEGMENTO_L0+6
	MOVLW      0
	MOVWF      display_dp_SEGMENTO_L0+7
	MOVLW      230
	MOVWF      display_dp_SEGMENTO_L0+8
	MOVLW      0
	MOVWF      display_dp_SEGMENTO_L0+9
	MOVLW      237
	MOVWF      display_dp_SEGMENTO_L0+10
	MOVLW      0
	MOVWF      display_dp_SEGMENTO_L0+11
	MOVLW      253
	MOVWF      display_dp_SEGMENTO_L0+12
	MOVLW      0
	MOVWF      display_dp_SEGMENTO_L0+13
	MOVLW      135
	MOVWF      display_dp_SEGMENTO_L0+14
	MOVLW      0
	MOVWF      display_dp_SEGMENTO_L0+15
	MOVLW      255
	MOVWF      display_dp_SEGMENTO_L0+16
	MOVLW      0
	MOVWF      display_dp_SEGMENTO_L0+17
	MOVLW      231
	MOVWF      display_dp_SEGMENTO_L0+18
	MOVLW      0
	MOVWF      display_dp_SEGMENTO_L0+19
;vAula100_source_file.c,184 :: 		cathode = SEGMENTO[num];                   //para retornar o cathode
	MOVF       FARG_display_dp_num+0, 0
	MOVWF      R0+0
	MOVF       FARG_display_dp_num+1, 0
	MOVWF      R0+1
	RLF        R0+0, 1
	RLF        R0+1, 1
	BCF        R0+0, 0
	MOVF       R0+0, 0
	ADDLW      display_dp_SEGMENTO_L0+0
	MOVWF      FSR
;vAula100_source_file.c,186 :: 		return(cathode);                           //retorna o número BCD
	MOVF       INDF+0, 0
	MOVWF      R0+0
	INCF       FSR, 1
	MOVF       INDF+0, 0
	MOVWF      R0+1
;vAula100_source_file.c,188 :: 		} //end display
L_end_display_dp:
	RETURN
; end of _display_dp

_volts:

;vAula100_source_file.c,190 :: 		void volts()                                   //Função para cálculo da tensão em Volts
;vAula100_source_file.c,192 :: 		store_old=store;
	MOVF       _store+0, 0
	MOVWF      _store_old+0
	MOVF       _store+1, 0
	MOVWF      _store_old+1
	MOVF       _store+2, 0
	MOVWF      _store_old+2
	MOVF       _store+3, 0
	MOVWF      _store_old+3
;vAula100_source_file.c,193 :: 		store = average_volt();                   //Recebe o valor médio da tensão retornado pela função average_volts()
	CALL       _average_volt+0
	MOVF       R0+0, 0
	MOVWF      _store+0
	MOVF       R0+1, 0
	MOVWF      _store+1
	MOVF       R0+2, 0
	MOVWF      _store+2
	MOVF       R0+3, 0
	MOVWF      _store+3
;vAula100_source_file.c,194 :: 		t_Volts = (store*183 )/37;               //Converte o valor para Volts
	MOVLW      183
	MOVWF      R4+0
	CLRF       R4+1
	CLRF       R4+2
	CLRF       R4+3
	CALL       _Mul_32x32_U+0
	MOVLW      37
	MOVWF      R4+0
	CLRF       R4+1
	CLRF       R4+2
	CLRF       R4+3
	CALL       _Div_32x32_S+0
	MOVF       R0+0, 0
	MOVWF      _t_Volts+0
	MOVF       R0+1, 0
	MOVWF      _t_Volts+1
	MOVF       R0+2, 0
	MOVWF      _t_Volts+2
	MOVF       R0+3, 0
	MOVWF      _t_Volts+3
;vAula100_source_file.c,195 :: 		t_Volts = t_Volts*1000;
	MOVLW      232
	MOVWF      R4+0
	MOVLW      3
	MOVWF      R4+1
	CLRF       R4+2
	CLRF       R4+3
	CALL       _Mul_32x32_U+0
	MOVF       R0+0, 0
	MOVWF      _t_Volts+0
	MOVF       R0+1, 0
	MOVWF      _t_Volts+1
	MOVF       R0+2, 0
	MOVWF      _t_Volts+2
	MOVF       R0+3, 0
	MOVWF      _t_Volts+3
;vAula100_source_file.c,196 :: 		m_amps = t_Volts/shunt;
	MOVLW      16
	MOVWF      R4+0
	MOVLW      39
	MOVWF      R4+1
	CLRF       R4+2
	CLRF       R4+3
	CALL       _Div_32x32_S+0
	MOVF       R0+0, 0
	MOVWF      _m_amps+0
	MOVF       R0+1, 0
	MOVWF      _m_amps+1
	MOVF       R0+2, 0
	MOVWF      _m_amps+2
	MOVF       R0+3, 0
	MOVWF      _m_amps+3
;vAula100_source_file.c,199 :: 		} //end celsius
L_end_volts:
	RETURN
; end of _volts

_average_volt:

;vAula100_source_file.c,201 :: 		long average_volt()                            //Função que calcula a média de 100 leituras de tensão
;vAula100_source_file.c,204 :: 		long volt_store = 0;                      //Variável local para armazenar o valor da tensão
	CLRF       average_volt_volt_store_L0+0
	CLRF       average_volt_volt_store_L0+1
	CLRF       average_volt_volt_store_L0+2
	CLRF       average_volt_volt_store_L0+3
;vAula100_source_file.c,206 :: 		for(i=0; i<100; i++)                      //Somatório de 100 leituras
	CLRF       average_volt_i_L0+0
L_average_volt19:
	MOVLW      100
	SUBWF      average_volt_i_L0+0, 0
	BTFSC      STATUS+0, 0
	GOTO       L_average_volt20
;vAula100_source_file.c,208 :: 		volt_store += ADC_Read(0);       //temp_store = temp_store + ADC_Read(0) (faz o somatório das 100 iterações)
	CLRF       FARG_ADC_Read_channel+0
	CALL       _ADC_Read+0
	MOVLW      0
	MOVWF      R0+2
	MOVWF      R0+3
	MOVF       average_volt_volt_store_L0+0, 0
	ADDWF      R0+0, 1
	MOVF       average_volt_volt_store_L0+1, 0
	BTFSC      STATUS+0, 0
	INCFSZ     average_volt_volt_store_L0+1, 0
	ADDWF      R0+1, 1
	MOVF       average_volt_volt_store_L0+2, 0
	BTFSC      STATUS+0, 0
	INCFSZ     average_volt_volt_store_L0+2, 0
	ADDWF      R0+2, 1
	MOVF       average_volt_volt_store_L0+3, 0
	BTFSC      STATUS+0, 0
	INCFSZ     average_volt_volt_store_L0+3, 0
	ADDWF      R0+3, 1
	MOVF       R0+0, 0
	MOVWF      average_volt_volt_store_L0+0
	MOVF       R0+1, 0
	MOVWF      average_volt_volt_store_L0+1
	MOVF       R0+2, 0
	MOVWF      average_volt_volt_store_L0+2
	MOVF       R0+3, 0
	MOVWF      average_volt_volt_store_L0+3
;vAula100_source_file.c,206 :: 		for(i=0; i<100; i++)                      //Somatório de 100 leituras
	INCF       average_volt_i_L0+0, 1
;vAula100_source_file.c,209 :: 		}
	GOTO       L_average_volt19
L_average_volt20:
;vAula100_source_file.c,211 :: 		return(volt_store/100);                   //retorna a média das iterações
	MOVLW      100
	MOVWF      R4+0
	CLRF       R4+1
	CLRF       R4+2
	CLRF       R4+3
	MOVF       average_volt_volt_store_L0+0, 0
	MOVWF      R0+0
	MOVF       average_volt_volt_store_L0+1, 0
	MOVWF      R0+1
	MOVF       average_volt_volt_store_L0+2, 0
	MOVWF      R0+2
	MOVF       average_volt_volt_store_L0+3, 0
	MOVWF      R0+3
	CALL       _Div_32x32_S+0
;vAula100_source_file.c,213 :: 		} //end average_temp
L_end_average_volt:
	RETURN
; end of _average_volt
