// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    snackbar: { value: false, text: ''}
  }),

  actions: {
    mutate(prop, value) {
      this[prop] = value
    },
    
  },

})
