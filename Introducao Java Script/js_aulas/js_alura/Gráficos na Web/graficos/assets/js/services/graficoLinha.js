const divLinha = document.querySelector('.grafico-linha');

export const desenharLinha = () => {
    const tabela = new google.visualization.DataTable();
    tabela.addColumn('string','Meses');
    tabela.addColumn('number','Gastos');
    tabela.addRows([
        ['jan',800],
        ['fev',200],
        ['mar',1500],
        ['abr',600],
        ['mai',150],
        ['jun',120],
        ['jul',942],
        ['ago',360],
        ['set',666],
        ['out',1000],
        ['nov',520],
        ['dez',720],
]);

const options = {
    title: 'Gastos Por Mês',
    width: 850,
    height: 300,
    vAxis: {
            format: 'currency',
            gridlines: {count:4, color: 'transparent'},
            viewWindow: {min: 0, max:1700}
        },
    curveType: 'function',
    legend: 'none'
};

const grafico = new google.visualization.LineChart(divLinha);
grafico.draw(tabela, options);
}