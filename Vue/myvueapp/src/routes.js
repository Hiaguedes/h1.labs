import Home from './pages/home.vue'
import OutraPagina from './pages/outra-pagina.vue'

export const routes = [
    {path: '/', component: Home, titulo: 'Home'},
    {path: '/outra-pagina', component: OutraPagina, titulo: 'Outra Página'},
];