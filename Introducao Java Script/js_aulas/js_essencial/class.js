var text = String('Prototype!');   //= var text='Prototype!';
console.log(text.__proto__.split);//= console.log(String.Prototype.split);
console.log(text.__proto__.split === String.prototype.split);
console.log(text.constructor === String); // __proto__ -> prototype -> constructor

function Animal(name) {
    this.name = name;
}

const p = new Animal('Vaca');
console.log(p);

console.log(p instanceof  Animal);
console.log(Animal instanceof Function);


class Ser_Vivo {
    constructor(patas,classe) {
        this.patas = patas; 
        this.classe = classe;
    }

}

class Quadrupede extends Ser_Vivo {
    constructor(som) {
        super(4, 'Mamifero');
        this.som = som;
        
    }

}

class Cachorro extends Quadrupede {
    constructor(tamanho,pelo,morde) {
        super('Au! Au!');
        this.tamanho = tamanho;
        this.pelo = pelo;
        this.morde = morde;
    }
    getPatas() {
        return this.patas;
    }

}
console.log();
console.log('------------------------------------------');
console.log();
const pug = new Cachorro('pequeno', 'curto', false);
const pitbull = new Cachorro('medio','curto',true);
console.log(pug.som);
console.log(pug.classe);
console.log(pitbull.morde);
console.log(pitbull.getPatas());
console.log(pitbull.patas)
