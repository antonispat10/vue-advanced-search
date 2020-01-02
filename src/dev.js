import Vue from 'vue'
import demo from './demo'

Vue.config.productionTip = false

new Vue({
  render: h => h(demo),
}).$mount('#app')
