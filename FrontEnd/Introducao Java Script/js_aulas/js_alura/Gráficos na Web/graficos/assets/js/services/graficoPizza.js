
const divPizza = document.querySelector('.grafico-pizza');

export const desenharPizza = () => {


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
    'height': 400,
    'width': 1000,
    is3D: true,
    legend: 'labeled',
    pieSliceText: 'value',
    //colors: ['grey','red','violet','green','orange','yellow']
    slices: {
        0:{},
        1:{color:'grey'},
        2:{color:'#a6a6a6'},
        3:{color: 'grey'},
        4:{color: 'orange', offset:0.4},
        5:{color:'#a6a6a6'}
    }
};

const grafico = new google.visualization.PieChart(divPizza);
grafico.draw(tabela,options);

};