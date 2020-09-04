
google.charts.load('current', {'packages':['corechart']});

const desenharPizza = () => {

const tabela = new google.visualization.DataTable();
tabela.addColumn('string','Categoria');
tabela.addColumn('number','Valores');

tabela.addRows(
    [
        ['Educação',2000],
        ['Transporte',500],
        ['Lazer',230],
        ['Saúde',50],
        ['Cartão de Crédito',920],
        ['Alimentação',310]
    ]
);

const options = {
    'title': 'Gastos do Mês',
    'height': 350,
    'width': 450,
    'pieHole': 0.4
};

const grafico = new google.visualization.PieChart(document.querySelector('.grafico-pizza'));
grafico.draw(tabela,options);

};

google.charts.setOnLoadCallback(desenharPizza);
