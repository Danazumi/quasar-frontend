<template>

<q-layout view="lHh Lpr lFf">
<q-page-container>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md shadow-2 my_card" bordered>
      <q-card-section class="text-center">
        <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
        <div class="text-grey-8">Sign in below to access your account</div>
      </q-card-section>
      <q-card-section>
        <q-input dense outlined v-model="email" label="Email Address"></q-input>
        <q-input dense outlined class="q-mt-md" v-model="password" type="password" label="Password"></q-input>
      </q-card-section>
      <q-card-section>
        <q-btn style="
  border-radius: 8px;" color="dark" rounded size="md" label="Sign in" no-caps class="full-width" @click = "handleLogin" :loading = "loading"></q-btn>
      </q-card-section>
      <q-card-section class="text-center q-pt-none">
        <div class="text-grey-8">Don't have an account yet?
          <router-link to="/settings" class="text-dark text-weight-bold" style="text-decoration: none">Sign
            up.</router-link></div>
      </q-card-section>

    </q-card>
  </q-page>
</q-page-container>
</q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth-store'
import { Notify } from 'quasar'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref<string>('')
const password = ref<string>('')
const loading = ref<boolean>(false)

// Validation rules
const emailError = computed(() => {
  if (!email.value) return 'Email is required'
  if (!isValidEmail(email.value)) return 'Invalid email format'
  return ''
})

const passwordError = computed(() => {
  if (!password.value) return 'Password is required'
  if (password.value.length < 6) return 'Password must be at least 6 characters'
  return ''
})

// Email validation helper
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const handleLogin = async () => {
  // Check validation before proceeding
  if (emailError.value || passwordError.value) {
    Notify.create({
      type: 'negative',
      message: emailError.value || passwordError.value
    })
    return
  }

  try {
    loading.value = true
    const response = await authStore.login(email.value, password.value)
    console.log('Login successful. Token:', response?.token)
    
    // Get redirect path from query params or default to products page
    const redirectPath = (route.query.redirect as string) || '/products'
    router.push(redirectPath)

    Notify.create({
      type: 'positive',
      message: 'SignedIn successfully!'
    })
  } catch (error: any) {
    Notify.create({
      type: 'negative',
      message: error.message || 'Failed to SignIn. Please try again.'
    })
    console.error('Login failed:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.my_card {
  width: 100%;
  max-width: 400px;
}
</style>


