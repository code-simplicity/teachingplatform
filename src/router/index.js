import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/Home.vue'
import Welcome from 'components/Welcome.vue'

/* 排序 */
import BubbleSort from 'components/Sort/BubbleSort.vue'
import InsertSort from 'components/Sort/InsertSort.vue'
import SelectSort from 'components/Sort/SelectSort.vue'
import ShellSort from 'components/Sort/ShellSort.vue'
import MergeSort from 'components/Sort/MergeSort.vue'
import QuickSort from 'components/Sort/QuickSort.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    redirect: '/welcome',
    component: Home,
    children: [
      { path: '/bubbleSort', component: BubbleSort },
      { path: '/welcome', component: Welcome },
      { path: '/insertSort', component: InsertSort },
      { path: '/selectSort', component: SelectSort },
      { path: '/shellSort', component: ShellSort },
      { path: '/quickSort', component: QuickSort },
      { path: '/mergeSort', component: MergeSort }

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
