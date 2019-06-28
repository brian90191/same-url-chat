import Vue from 'vue'
import AppComponent from './App/App.vue'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuetify from 'vuetify'
import { firestorePlugin } from 'vuefire'

Vue.use(Vuetify)

Vue.component('app-component', AppComponent)

Vue.use(firestorePlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: createElement => {
    return createElement(AppComponent)
  }
})
