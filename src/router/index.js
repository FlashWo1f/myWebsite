import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: () => import('@/views/home/Home.vue') },
    { path: '/light', component: () => import('@/views/light/Light.vue') },
    { path: '/order', component: () => import('@/views/order/order.vue') },
    { path: '/timer', component: () => import('@/views/timer/timer.vue') },
    { path: '/todo', component: () => import('@/views/todolist/index.vue') },
    { path: '/count', component: () => import('@/views/count/Count.vue') },
    { path: '/workcard', component: () => import('@/views/workcard/WorkCard.vue') },
    { 
      path: '/echarts', 
      component: () => import('@/views/echarts/index.vue'),
      redirect: '/echarts/my-weight',
      children: [
        { 
          path: 'my-weight', 
          component: () => import('@/views/echarts/my-weight.vue'),
        },
      ],
    },
  ]
});

export default router
