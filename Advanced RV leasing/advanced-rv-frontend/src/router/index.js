import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import RVDetail from '../pages/RVDetail.vue'
import LeaseInfo from '../pages/LeaseInfo.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/rv/:id', component: RVDetail },
  { path: '/lease', component: LeaseInfo }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


