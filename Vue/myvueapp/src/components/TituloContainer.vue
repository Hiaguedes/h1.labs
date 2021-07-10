<template>
    <h1 class="titulo">{{titulo}}</h1>
</template>
<script>
 export default {
     props: ['titulo']
 }
</script>
<style scoped>
    .titulo {
        color: red;
        margin: 1rem 0;
    }
</style>