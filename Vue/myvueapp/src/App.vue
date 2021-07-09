<template>
  <div style="display: flex;  flex-direction: column; align-items: center;">
    <h1>{{ msg }}</h1>
    <span>{{ author }}</span>
    <button v-on:click="ChangeMsg">Clique</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    let dataSource = {
        msg: 'Hello World!',
        author: 'Hiago Riba Guedes'
    }

    return {...dataSource};
  }
}
</script>

<style>
</style>
