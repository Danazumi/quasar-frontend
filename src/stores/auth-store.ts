// src/stores/auth-store.ts
import { defineStore } from 'pinia'
import { api } from '../boot/axios'

interface AuthState {
  token: string | null;
  user: any | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null, // Start with null, we'll validate on init
    user: null
  }),

  getters: {
    isAuthenticated(): boolean {
      return !!this.token
    }
  },

  actions: {
    // Initialize and validate token
    init() {
      this.validateToken()
    },
    
    validateToken() {
      const storedToken = localStorage.getItem('token')
      
      if (storedToken) {
        try {
          // Check if token is valid (not expired)
          // You could do a more thorough validation here, like
          // checking token expiry if you're using JWT
          this.token = storedToken
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
        } catch (error) {
          // Invalid token, clear it
          this.clearAuth()
        }
      } else {
        this.clearAuth()
      }
    },
    
    clearAuth() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    },

    async login(email: string, password: string) {
      try {
        const response = await api.post('/auth/login', {
          email,
          password
        })
        
        const token = response.data.token
        if (!token) {
          throw new Error('No token received')
        }
        
        this.token = token
        localStorage.setItem('token', token)

        // Set the token in axios headers immediately
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        return response.data
      } catch (error: any) {
        this.clearAuth()
        throw new Error(error.response?.data?.message || 'Login failed')
      }
    },

    async signup(email: string, password: string, phoneNumber: string) {
      try {
        const response = await api.post('/auth/signup', {
          email,
          password,
          phoneNumber
        })
        
        return response.data

        // const loginResponse = await this.login(email, password)
        // return loginResponse

      } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Signup failed')
      }
    },

    logout() {
      this.clearAuth()
    }
  }
})

