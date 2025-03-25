import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../components/Home.vue')
  },
  {
    path: '/lista',
    component: () => import('../components/Lista.vue')
  },
  {
    path: '/any/:any',
    component: () => import('../components/Detalle_Año.vue'),
    props: true,
  },
  {
    path: '/centro/:tipus_de_centres/:any',
    component: () => import('../components/Detalle_Centro.vue'),
    props: true,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 
