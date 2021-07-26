# Performance no react anotações da aula no experts club

React.Lazy pra importar e React.Suspense para renderizar - criam uma renderização assícrona de componentes, transformando ela em chunks menores, pode-se usar um fallback para simular um loading daquele chunk específico

Bom para dividir rotas da nossa aplicação e com isso acelerar o bundle de uma parte principal do código. Sua utilização pode ser vista no arquivo App.js

memo -> se eu tenho um componente cuja as props não mudem eu não preciso renderizar ele novamente, muito util caso ele seja usado em muitos elementos

you might not need moment js -> site bom pra ver hahaha <https://dockyard.com/blog/2020/02/14/you-probably-don-t-need-moment-js-anymore>

web worker -> uma opcao boa é o workerize, ele serve pra deixar assincrono funcoes que lidam com grandes dados (como exportar um csv) criando um container ao redor dela. Ele usa uma outra theared para realizar um processo hiper mega pesado e que requereria a thearead que o borwser utiliza por padrão
