<template>
  <div style="display: flex;  flex-direction: column; align-items: center;">
    <h1>{{ msg }}</h1>
    <span>{{ author }}</span>
    <button v-on:click="increase">Clique</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {

    return {
        msg: 'Hello World!',
        author: 'Hiago Riba Guedes'
    };
  },
  methods: {

    increase() {
      this.msg += '!';
    }
  }
}
</script>

<style>
</style>
