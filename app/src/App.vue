<template>
  <v-app>
    <v-main>
      <router-view />
      <v-snackbar v-model="store.snackbar.value">
        {{ store.snackbar.text }}
        <template v-slot:actions>
        <v-btn

          variant="text"
          @click="close"
        >
          Close
        </v-btn>
      </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script setup>
import { useAppStore } from './stores/app';

  const store = useAppStore()

  const close = () => {
    store.mutate('snackbar', { value: false, text: ''})
  }
</script>