const divGraficoLanguages = document.querySelector('.languages__graph');
google.charts.load('current', {'packages':['corechart'],'language':'pt-br'});

const desenharGrafico = () => {

    const fetchFunc = async () => {
            const response = await fetch('https://gist.githubusercontent.com/Hiaguedes/e89daa3ef9caa703066860ff43f51a11/raw/3d0a3dc6b711405ccc34b059ccb77f76c01ba3d0/languages.json');            
            return response.text();
            };

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

fetchFunc().then(json => grafico.draw(
    new google.visualization.DataTable(json)
    ,options));


}

google.charts.setOnLoadCallback(desenharGrafico);