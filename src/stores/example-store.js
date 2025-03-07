import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0
  }),

  getters: {
    doubleCount: (state) => state.counter * 2
  },

  actions: {
    increment() {
      this.counter++
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
}


// My old Products.vue file
{/* <template>
    <q-page class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div v-for="product in products" :key="product.id" class="col-12 col-sm-6 col-md-4">
          <q-card>
            <q-img :src="product.image" style="height: 200px" />
            <q-card-section>
              <div class="text-h6">{{ product.name }}</div>
              <div class="text-subtitle2">${{ product.price }}</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat color="primary" label="Add to Cart" @click="addToCart(product)" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <!-- Logout-btn -->
      <q-btn
      color="negative"
      label="Logout"
      @click="handleLogout"
      class="q-mt-md"
    />
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useCartStore } from '../stores/cart-store';
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/auth-store' 
  
  const cartStore = useCartStore();
  const router = useRouter()
  const authStore = useAuthStore()

  const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'signin' })
}
  
  const products = ref([
    {
      id: 1,
      name: 'Product 1',
      price: 99.99,
      image: '/api/placeholder/300/200',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 149.99,
      image: '/api/placeholder/300/200',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 199.99,
      image: '/api/placeholder/300/200',
    },
  ]);
  
  const addToCart = (product) => {
    cartStore.addItem(product);
  };
  </script> */}
