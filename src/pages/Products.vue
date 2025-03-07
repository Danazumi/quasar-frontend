<template>
  <q-page class="q-pa-md">
    <!-- User info header -->
    <div class="user-info q-mb-md">
      <div class="text-h6">Welcome, {{ userEmail }}</div>
      <div class="text-subtitle1">You have placed {{ orderCount }} orders</div>
    </div>

    <div class="row q-col-gutter-md">
      <div v-for="product in products" :key="product.id" class="col-12 col-sm-6 col-md-4">
        <q-card>
          <q-img :src="product.image" style="height: 200px" />
          <q-card-section>
            <div class="text-h6">{{ product.name }}</div>
            <div class="text-subtitle2">${{ product.price }}</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat color="primary" label="Order" @click="placeOrder(product)" />
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
import { ref, onMounted } from 'vue';
import { useCartStore } from '../stores/cart-store';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth-store';
import { api } from '../boot/axios';
import { Notify } from 'quasar';

const cartStore = useCartStore();
const router = useRouter();
const authStore = useAuthStore();

const userEmail = ref('');
const orderCount = ref(0);

// Update products to use the local images from your src/images folder
const products = ref([
  {
    id: 1,
    name: 'NB 550',
    price: 99.99,
    image: '/images/NB_550.png', // Adjust the file path and name as needed
  },
  {
    id: 2,
    name: 'NB 990v4',
    price: 149.99,
    image: '/images/NB_990V4.jpg', // Adjust the file path and name as needed
  },
  {
    id: 3,
    name: 'Reebok Premier',
    price: 199.99,
    image: '/images/reebok_premier.jpg', // Adjust the file path and name as needed
  },
]);

const handleLogout = () => {
  authStore.logout();
  router.push({ name: 'signin' });
};

// Get user info and order count on page load
onMounted(async () => {
  try {
    // Get user info from auth store or backend
    const userResponse = await api.get('/auth/profile');
    userEmail.value = userResponse.data.email;
    
    // Get order count from backend
    const orderResponse = await api.get('/orders/count');
    orderCount.value = orderResponse.data.count;
  } catch (error) {
    console.error('Error loading user data:', error);
  }
});

const placeOrder = async (product) => {
  try {
    // Send order to backend
    await api.post('/orders', {
      productId: product.id,
      productName: product.name,
      price: product.price
    });
    
    // Increment order count
    orderCount.value++;
    
    // Show success notification
    Notify.create({
      type: 'positive',
      message: `Order for "${product.name}" has been placed!`,
      position: 'top'
    });
  } catch (error) {
    console.error('Error placing order:', error);
    Notify.create({
      type: 'negative',
      message: 'Failed to place order. Please try again.',
      position: 'top'
    });
  }
};
</script>