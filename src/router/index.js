import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainView from '@/views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: LoginView
    },

     {
    path: '/main',
    component: MainView,
    children: [  
      {path: '',redirect: 'dashboard'},   
      { path: '/Dashboard', component: () => import('../modules/Dashboard/Views/DashboardView.vue') },
      { path: '/Clientes', component: () => import('../modules/Clientes/Views/ClientesView.vue') },     
      { path: '/Productos', component: () => import('../modules/Productos/Views/ProductosView.vue') },
      { path: '/ConsumidorFinal', component: () => import('../modules/FacturaConsumidorFinal/Views/FacturaConsumidorFinalSinClienteView.vue') },
      { path: '/ConsumidorFinal2', component: () => import('../modules/FacturaConsumidorFinal/Views/FacturaConsumidorFinalView.vue') },
      { path: '/CreditoFiscal', component: () => import('../modules/FacturaCreditoFiscal/Views/FacturaCreditoFiscalView.vue') }
    ]
  }

  // {
  //   path: '/Main',
  //   name: 'MainView',
  //   component: MainView
  // },
  //   {
  //      path: '/Clientes',
  //      name: 'Clientes',   
  //      component: () => import('../modules/Clientes/Views/ClientesView.vue'),
  //    }
  ],
})

export default router
