import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '../stores/auth-store'

export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore()

  //force token validation on each navigation
  authStore.validateToken()

  console.log('Auth Guard Check:', {
    isAuthenticated: authStore.isAuthenticated,
    token: localStorage.getItem('token'),
    to: to.path
  })

  if (!authStore.isAuthenticated) {
    console.log('Not authenticated, redirecting to signin')
    next({
      name: 'signin',
      query: { redirect: to.fullPath }
    })
  } else {
    console.log('Authenticated, proceeding to route')
    next()
  }
}


