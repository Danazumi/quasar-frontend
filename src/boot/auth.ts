// src/boot/auth.ts
import { boot } from 'quasar/wrappers'
import { useAuthStore } from '../stores/auth-store'

export default boot(({ store }) => {
  const authStore = useAuthStore()
  authStore.init()
})