
class NavController{
    constructor() {
        this._itens = document.querySelectorAll('[data-item]');//seleciona todos os itens da lista de navegação
        this._itensX=[];//coordenadas iniciais x
        this._indexAtual=1;//variável para saber qual a posição atual do menu
        this._itensActive =[this._indexAtual];//index do elemento ativo anteriormente e do atual
        this._secoes = new SectionView();
        this._secoes.writeTitle(this._indexAtual);
    }

    _changeAttr(obj){
    
        const classAttr = obj.getAttribute('class');
        const dataAttr = obj.getAttribute('data-item');
        
        obj.classList.remove(classAttr);
        obj.setAttribute('data-item','');
        obj.setAttribute('data-item',classAttr);
        obj.classList.add(dataAttr);
       }

    update(event){
    const windowWidth=window.innerWidth;
    this._rect =new NavView(windowWidth);

    const item = event.target;

    this._itens.forEach((item,index) =>{
        if(item === event.target){
            this._indexAtual=index;
        }
    });
 
    
    if(this._indexAtual === this._itensActive[0]) return;//se elemento está ativo, não faz nada
    
    
    this._changeAttr(this._itens[this._itensActive[0]]);//apago atributo do botão que estava ativo
     
    windowWidth>=500 ? 
    this._rect.createRectX(item.getBoundingClientRect().width,item.getBoundingClientRect().height,this._itensActive[0],this._indexAtual,20) :
    this._rect.createRectY(item.getBoundingClientRect().width,item.getBoundingClientRect().height,this._itensActive[0],this._indexAtual,20);

    this._secoes.removeTitle(this._itensActive[0]);
    setTimeout(() =>{
        this._secoes.changeSectionView(this._itensActive[0], this._indexAtual);
        this._secoes.removeTitle(this._indexAtual);
        this._secoes.writeTitle(this._indexAtual);


        this._itensActive.push(this._indexAtual);
        this._changeAttr(item);//acendo atributo de botão que vai ser acesso
        this._rect.delRect(document.querySelector('.caixa'));//depois do tempo percorrido deleto caixa animada
        this._itensActive.shift();//tiro index do botão que estava ativo antes
    },150);//acendo o elemento clicado depois de x ms
}
}
let navCTRL =new NavController();