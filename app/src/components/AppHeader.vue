<template>
  <v-app-bar>
    <v-app-bar-title>Zakat Al Maruf</v-app-bar-title>
    <v-btn icon="mdi-plus" variant="outlined" size="small" @click="openAddIncome"></v-btn>
    <v-btn icon="mdi-minus" variant="outlined" size="small"></v-btn>
    <v-btn icon="mdi-login"></v-btn>
  </v-app-bar>

  <IncomeForm ref="refIncomeForm" @created="created" />

</template>

<script setup>
import { ref } from "vue";
// import { useAppStore } from "../stores";

// const store = useAppStore()

const emit = defineEmits(['incomeCreated'])

const refIncomeForm = ref(null)

const openAddIncome = () => {
  refIncomeForm.value.openDialog()
}

const created = () => {
  emit('incomeCreated')
  refIncomeForm.value.closeDialog()
}

</script>