module XOR(output wire S,
input wire A,B
    
);

assign S=(A  && !B) || (B && !A);

endmodule /*

Tabela Verdade

            A   |   B   |  S
            -------------------
            0   |   0   |  0
            0   |   1   |  1
            1   |   0   |  1
            1   |   1   |  0

Porta XOR