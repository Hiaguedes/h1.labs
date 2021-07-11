<template>
  <div style="display: flex;  flex-direction: column; align-items: center;">
  <nav-component />
   <titulo :titulo="msg"/>
    <span>{{ author }}</span>
    <button @click="increase">Clique</button>

    <input 
      style="margin: 1rem 0; width: 70%; height: 1.5rem; border-radius: 0.5rem; border: 1px solid rgba(0,0,0,0.3)" 
      :value="filter" 
      v-on:input="filter = $event.target.value" 
      placeholder="Digite algo ..." />

  <ul>
    <li class="list-item" v-for="item of filterArray" :key="item">
      <p>{{ item }}</p>
      <button @click="remove(item)">X</button>
    </li>
  </ul>

  <transition name="fade">
    <div>
      <p v-show="visivel">oi</p>
      <button @click="visivel = !visivel">Outro butão para ser clicado</button>
    </div>
  </transition>
  </div>
</template>

<script>
  import ProjectComponents from '../components/commons'
  // import { routes as rotas } from '../routes'
export default {
  name: 'app',
  data () {

    return {
        msg: 'Hello World!',
        author: 'Hiago Riba Guedes',
        filter: '',
        dados: ['Músicas', 'Séries', 'Animes', 'Filmes', 'Jogos', 'Esportes'],
        visivel: false,
        // rotas
    };
  },
  methods: {

    increase() {
      this.msg += '!';
    },
    remove(item) {
      console.log(item)
      this.dados = this.dados.filter(dado => dado !== item)
    }
  },
    ...ProjectComponents,
  computed: {
    filterArray() {
      if(this.filter){
        let exp = new RegExp(this.filter, 'i')
        return this.dados.filter(item => exp.test(item));
      } else {
       return this.dados;
      }
    }
  }
}
</script>

<style>

  .list-item {
    list-style: none;
    display: flex;
    justify-content: space-between;
    width: 10rem;
  }


</style>
