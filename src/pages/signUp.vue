<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Sign Up</div>
            <div class="text-grey-8">Sign Up below to create your account</div>
          </q-card-section>
          <q-card-section>
            <q-input 
              dense 
              outlined 
              v-model="email" 
              label="Email Address" 
              :rules="[val => !!val || 'Email is required', val => isValidEmail(val) || 'Invalid email format']"
            ></q-input>
            
            <q-input 
              dense 
              outlined 
              class="q-mt-md" 
              v-model="phoneNumber" 
              label="Phone Number"
              :rules="[val => !!val || 'Phone number is required']"
              hint="Format: +1XXXXXXXXXX"
            ></q-input>
            
            <q-input 
              dense 
              outlined 
              class="q-mt-md" 
              v-model="password" 
              type="password" 
              label="Password"
              :rules="[val => !!val || 'Password is required', val => val.length >= 6 || 'Password must be at least 6 characters']"
            ></q-input>
          </q-card-section>
          <q-card-section>
            <q-btn 
              style="border-radius: 8px;" 
              color="dark" 
              rounded 
              size="md" 
              label="Sign up" 
              no-caps 
              class="full-width" 
              @click="handleSignup" 
              :loading="loading"
            ></q-btn>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">Already have an account?
              <router-link to="/" class="text-dark text-weight-bold" style="text-decoration: none">Sign in.</router-link>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth-store'
import { Notify } from 'quasar'

const router = useRouter()
const authStore = useAuthStore()

// Define reactive variables with proper types
const email = ref<string>('')
const password = ref<string>('')
const phoneNumber = ref<string>('')  // Added phone number
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

const phoneNumberError = computed(() => {  // Added phone number validation
  if (!phoneNumber.value) return 'Phone number is required'
  return ''
})

// Email validation helper
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const handleSignup = async () => {
  // Check validation before proceeding
  if (emailError.value || passwordError.value || phoneNumberError.value) {
    Notify.create({
      type: 'negative',
      message: emailError.value || passwordError.value || phoneNumberError.value
    })
    return
  }

  try {
    loading.value = true
    const response = await authStore.signup(email.value, password.value, phoneNumber.value)
    console.log('Signup response:', response) // This will show the token
    
    Notify.create({
      type: 'positive',
      message: 'Account created successfully!'
    })
    
    router.push('/products')
  } catch (error: any) {
    Notify.create({
      type: 'negative',
      message: error.message || 'Signup failed. Please try again.'
    })
    console.error('Signup failed:', error)
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

