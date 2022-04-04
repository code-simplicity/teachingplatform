import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/icon/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(codemirror)
Vue.config.productionTip = false
// 事件中心对象
Vue.prototype.$EventBus = new Vue()
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
