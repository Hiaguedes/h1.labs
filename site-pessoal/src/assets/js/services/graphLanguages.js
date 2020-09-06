const divGraficoLanguages = document.querySelector('.languages__graph');
google.charts.load('current', {'packages':['corechart'],'language':'pt-br'});

const desenharGrafico = () => {
    const tabela = new google.visualization.arrayToDataTable(
    [
    ['Habilidade','Percentual',{role: 'annotation'},{role:'style'}],
    ['Reading',	100,'100%', '#f8a028'],
    ['Writing',	90,'90%', '#f8a028'],
    ['Listening',85,'85%', '#f8a028'],
    ['Speaking',75,'75%', '#f8a028']
    ]);

const options = {
    height:400,
    width: 900,
    vAxis: {
                gridlines:{color:'transparent'},
                minValue:0,
                textPosition:'none'
            },

    hAxis: {
        textPosition:'in',
        title: 'English',
        gridlines:{color:'transparent'},

        bar: {
                groupWidth: '95%'
        },

        textStyle:{
                fontSize: 18
        },

        titleTextStyle: {
                color: 'white',
                fontSize: 20
        }
    },
    annotations: {
                alwaysOutside: false,
                textStyle:{
                    fontSize: 20
            }
    },
    legend: 'none',
    backgroundColor: { fill:'transparent' },
    tooltip : {
        trigger: 'none'
      }
}

const grafico = new google.visualization.ColumnChart(divGraficoLanguages);
grafico.draw(tabela,options);

}

google.charts.setOnLoadCallback(desenharGrafico);