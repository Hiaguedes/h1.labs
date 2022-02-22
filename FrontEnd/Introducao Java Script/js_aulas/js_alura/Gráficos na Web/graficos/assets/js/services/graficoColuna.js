const divColuna = document.querySelector('.grafico-coluna');

export const desenharColuna = () => {
    const tabela = new google.visualization.DataTable();
    tabela.addColumn('string','Mês');
    tabela.addColumn('number','Entrada');
    tabela.addColumn('number','Saída');
    tabela.addRows([
    ['jan',	2500,	1000],
    ['fev',	2000,	500],
    ['mar',	3000,	1300],
    ['abr',	1500,	1700],
    ['mai',	5000,	2250],
    ['jun',	3567,	3000],
    ['jul',	3452,	1468],
    ['ago',	1833,	5250],
    ['set',	3803,	5500],
    ['out',	1800,	1000],
    ['nov',	3569,	1500],
    ['dez',	3000,	1740]
]);

const options = {
    title: 'Entradas e saídas da conta',
    width: 1000,
    heigth:400,
    vAxis: {
                gridlines:{color:'transparent'},
                format: 'currency',
                title: 'Valores'
            },
    hAxis:{
        title: 'Mês'
    }
}

const grafico = new google.visualization.ColumnChart(divColuna);
grafico.draw(tabela,options);

}