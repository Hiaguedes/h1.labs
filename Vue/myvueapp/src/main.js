import Vue from 'vue'
import App from './App.vue'

import styled from 'vue-styled-components'

export const Title = styled.h1`
  color: red;
`

new Vue({
  el: '#app',
  render: h => h(App),
})
