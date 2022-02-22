<template>
    <nav>
      <ul style="display: flex; justify-content: space-between; width: 30vw">
        <li style="list-style: none;" v-for="rota in rotas">
            <router-link :to="rota.path ? rota.path : '/'">{{ rota.titulo }}</router-link>
        </li>
      </ul>
    </nav>
</template>
<script>
    import { routes as rotas } from '../routes'
    export default {
        data() {
            return {
                rotas
            }
        }

    }
</script>