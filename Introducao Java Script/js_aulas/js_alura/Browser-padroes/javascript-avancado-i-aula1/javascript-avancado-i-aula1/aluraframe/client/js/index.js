var campos=[ //cria um vetor de campos
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
]

document.querySelector('.form').addEventListener('submit',function(event){//a cada clique no botão dentro do form
    var tr=document.createElement('tr');//cria uma tr (linha de tabela)
    event.preventDefault();//não recarregue a página

    campos.forEach(function(campo){// e a cada elemento dentro do campo
        var td=document.createElement('td');//crie uma coluna nova
        td.textContent=campo.value;//adicione o conteudo nessa coluna
        tr.appendChild(td);// e coloque dentro da tr
    });

    var tdVol=document.createElement('td');// o volume calculamos separadamente
    tdVol.textContent=campos[1].value*campos[2].value;//de forma que seu conteudo seja igual a multiplicaçao dos dois primeiros
    tr.appendChild(tdVol);//coloque dentro da tr

    document.querySelector('table tbody').appendChild(tr);//pega a tr e coloque dentro da tabela

    campos[0].value='';//coloque os campos com seus valores default
    campos[1].value='1';
    campos[2].value='';

    campos[0].focus();//coloque o foco no primeiro campo

});