<template>
    <q-page class="q-pa-md">
      <div class="text-h5 q-mb-md">Shopping Cart</div>
      <div v-if="cartStore.items.length === 0" class="text-center q-pa-lg">
        Your cart is empty
      </div>
      <div v-else>
        <q-list bordered separator>
          <q-item v-for="item in cartStore.items" :key="item.id">
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
              <q-item-label caption>Quantity: {{ item.quantity }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              ${{ (item.price * item.quantity).toFixed(2) }}
            </q-item-section>
            <q-item-section side>
              <q-btn flat color="negative" icon="delete" @click="cartStore.removeItem(item.id)" />
            </q-item-section>
          </q-item>
        </q-list>
        <div class="text-right q-mt-md">
          <div class="text-h6">Total: ${{ cartStore.totalPrice.toFixed(2) }}</div>
        </div>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { useCartStore } from 'src/stores/cart';
  
  const cartStore = useCartStore();
  </script>