import {createRouter, createWebHashHistory, type RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
