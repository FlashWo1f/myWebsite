import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: () => import('@/views/home/Home.vue') },
    { path: '/order', component: () => import('@/views/order/order.vue') },
    { path: '/timer', component: () => import('@/views/timer/timer.vue') },
    { path: '/todo', component: () => import('@/views/todolist/index.vue') },
  ]
});

export default router
