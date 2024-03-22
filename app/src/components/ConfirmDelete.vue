<template>
  <v-dialog
    v-model="dialog"
    scrollable 
    persistent :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-text class="text-center">
        <v-icon color="warning" size="100">mdi-alert-circle</v-icon>
        <div class="text-h5">Apakah anda yakin ?</div>
        <div class="">Data akan dihapus permanen.</div>
      </v-card-text>
      <v-card-actions>
          <v-btn flat small color="primary" @click="closeDialog">Batal</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat small color="primary" @click="$emit('confirmed')">Hapus</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';



const dialog = ref(false)

const openDialog = () => {
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
}


defineExpose({ openDialog, closeDialog })
</script>