//funcoes sao objetos


function num_aleatório(min,max) {

    if(min>max){
a=min;
min=max;
max=a;
    }

    return Math.random()*(max-min)+min;
    };

console.log(num_aleatório());

function fn() {

    return console.log('Hello!');
}
fn();


function getId() {
    return this.Id;
}
function getName() {
    return this.nome;
}

function getProfissao() {
    return this.Profissao;
}

function getStatus() {
    return this.Status;
}
function getIdade() {
    return this.idade;
}




var pessoa= {
    Id: 1,
    nome: 'Lorem Ipsum',
    idade: 54,
    Profissao: 'Mecanico',
    Status: true,
    getId,
    getName,
    getIdade,
    getProfissao,
    getStatus
};

//console.log(pessoa.nome);


console.log(pessoa.getName()); 
console.log(pessoa.getStatus());

//-----------------------------------------------------------------------------------
//Arrays
console.log('');
console.log('-----------------------------------------------------------------------------------------------------');
console.log('');

const genders = {
    cis_homem: Symbol('Homem Cis'),
    cis_mulher: Symbol('Mulher Cis'),
    gay: Symbol('Gay'),
    assexuado: Symbol('Assexuado'),
    bissexual: Symbol('Bissexual'),
    Outros: Symbol('Outros')
};

const pessoa1 = [
    {
    nome: 'Junior' ,
    idade: 32,
    genero: genders.cis_homem

}, {
    nome: 'Rogeria' ,
    idade: 44,
    genero: genders.gay
}, {
    nome: 'Ana' ,
    idade: 17,
    genero: genders.bissexual
    }
];
console.log('Todo o vetor cadastrado: ', pessoa1);
console.log('Pessoas Cadastradas na Lista: ', pessoa1.length);
console.log('Funcao para verificar se é um vetor ou nao: ', Array.isArray(pessoa1));
pessoa1.forEach(pessoa1 => { console.log('Nome das Pessoas no Vetor: ', pessoa1.nome) }); //metodo de fazer sem ter que declarar funcao
var homens_cis=pessoa1.filter(pessoa1 => pessoa1.genero == genders.cis_homem  );
console.log('Retorna somente os que tem determinada atribuicao: ', homens_cis);

const idade_total = pessoa1.reduce((idade, pessoa) => {   
    idade += pessoa.idade;
    return idade;
}, 0); 

console.log('Retorna somatória total de um atributo de um determinado vetor: ',idade_total);

const soma_idade_par = pessoa1
    .filter(person => person.idade %2 ===0)
    .reduce((idade, person) => {
    idade += person.idade;
    return idade;
    }, 0);
console.log('Retorna somatória de uma atributo filtrado: ', soma_idade_par);
console.log();
var vetor = [1, 2, 3, 4, 5, 6];
  vetor.forEach(item => {
    if (item % 2 == 0) {
        console.log('Par');
    
    }else {  console.log('Impar'); }
  });

