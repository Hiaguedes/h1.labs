`timescale 1ns / 1ns

module porta_XOR(input  A,B,
output  S);

assign S=A|B;

endmodule /*

Tabela Verdade

            A   |   B   |  S
            -------------------
            0   |   0   |  0
            0   |   1   |  1
            1   |   0   |  1
            1   |   1   |  0
    assign S=(A  & ~B) | (~A & B);        
            

Porta XOR*/