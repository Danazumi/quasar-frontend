import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  getters: {
    totalItems: (state) => state.items.length,
    totalPrice: (state) => 
      state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  actions: {
    addItem(item) {
      const existingItem = this.items.find((i) => i.id === item.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({ ...item, quantity: 1 })
      }
    },

    removeItem(itemId) {
      const index = this.items.findIndex((item) => item.id === itemId)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    }
  }
})

// Enable hot module replacement for cart store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
