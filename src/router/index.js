import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainView from '@/views/MainView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   
    {
      path: '/',
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
  },
  {
      path: '/:pathMatch(.*)*',
      redirect: () => {
        const id = localStorage.getItem('id')
        const isAuth = !!id
        return isAuth ? '/main' : '/'
      }
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

router.beforeEach((to, from, next) => {
 
  
  const id = localStorage.getItem('id')
  const isAuth = !!id  // true si hay sesión

  // 🔹 Si el usuario va al login y ya está autenticado → lo mandamos al main
  if (to.path === '/' && isAuth) {
    next('/main')
    return
  }

  // 🔹 Si el usuario va a cualquier otra ruta y no está autenticado → lo mandamos al login
  if (to.path !== '/' && !isAuth) {
    next('/')
    return
  }

  // 🔹 Caso normal, permitir navegación
  next()
})

export default router
