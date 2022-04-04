import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/icon/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import {
  codemirror
} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(codemirror)
// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false
// 事件总线，用于组件之前通信
Vue.prototype.$EventBus = new Vue()
// 实例化vue
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
