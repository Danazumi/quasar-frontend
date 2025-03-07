import { RouteRecordRaw } from 'vue-router'
import { authGuard } from './auth-guard'

const routes  : RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        name: 'signin',  // Add name to the signin route
        component: () => import('pages/signIn.vue') 
      },
      { 
        path: 'settings', 
        name: 'signup',
        component: () => import('pages/signUp.vue') 
      },
      { 
        path: 'products', 
        name: 'products',  // Add name to the products route
        component: () => import('pages/Products.vue'),
        beforeEnter: authGuard
      },
      { 
        path: 'cart',
        name: 'cart', 
        component: () => import('pages/Cart.vue'),
        beforeEnter: authGuard  // Also protect cart route if needed
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
