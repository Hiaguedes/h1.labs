const divJson = document.querySelector('.grafico-json');

export const desenharJson = () => {
    const dadosJson = $.ajax({
        url: 'assets/dados.json',
        dataType: 'json',
        async: false
    }).responseText;


    const tabela = new google.visualization.DataTable(dadosJson);

    const options = {
        title: 'Usuários e Poupanças',
        height: '500',
        width: '1500',
        legend: 'none',
        hAxis: {
            gridlines: {color: 'transparent'},
            textPosition: 'none'
        },
        annotations: {alwaysOutside: true}
    }

    tabela.sort({column:1, desc:true})

    const grafico = new google.visualization.BarChart(divJson);
    grafico.draw(tabela, options);

}