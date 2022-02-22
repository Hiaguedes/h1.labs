/*
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
            </tr>
        </thead>
        
        <tbody>
        </tbody>
        
        <tfoot>
        </tfoot>
    </table>

A intenção é criar toda a tabela no js e não deixar ela nop html
*/ 

class NegociacaoView extends View{

    constructor(elemento){
        super(elemento);
    }

    _template(model){//modelo aqui é a lista de negociaçÕes
        // a cada vez que a função é chamada ela atualiza a tabela no elemento onde é chamada e para atualizar essa tabela montamos ela aqui com template String
        return `
        <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR [R$]</th>
                <th>VOLUME</th>
            </tr>
        </thead>
        
        <tbody>
            ${model.negociacoes.map((neg)=>{
                return `
                <tr>
                    <td>${DateHelper.dataParaTexto(neg.data)}</td>
                    <td>${neg.quantidade}</td>
                    <td>${neg.valor}</td>
                    <td>${neg.volume}</td>
                </tr>
                `
            }).join('')}
        </tbody>
        <tfoot>
        <td colspan=3></td>
        <td>${
            model.negociacoes.reduce((total,n)=>{
                return total+n.volume
        },0)
        }</td>
        </tfoot>
    </table>`;
    }


}
/* 
Uma outra forma de totalizar o volume seria com:

            (function(){
                let total=0;
                model.negociacoes.forEach(i => total+=i.volume)
                return total;
            })()
*/