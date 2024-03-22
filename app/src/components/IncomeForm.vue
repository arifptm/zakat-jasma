<template>
  <v-dialog v-model="dialog" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">
    <v-card>        
      <div class="pl-4 pr-3 pt-3 pb-2 d-flex align-center justify-space-between">
        <div class="text-h6">Pembayaran baru</div>
        <v-icon class="" @click="closeDialog">mdi-close</v-icon>
      </div>

      <v-card-text>


        
        <v-chip-group column mandatory class="mb-4" v-model="income.category">
          <v-chip value="zfRice">ZF. Beras</v-chip>
          <v-chip value="zfMoney">ZF. Uang</v-chip>
          <v-chip value="zMaal">Z. Maal</v-chip>
          <v-chip value="fidyah">Fidyah</v-chip>
          <v-chip value="infaqRice">Infaq Beras</v-chip>
          <v-chip value="infaqMoney">Infaq Uang</v-chip>
        </v-chip-group>
        <v-text-field label="Nama" v-model="income.name"></v-text-field>

        <v-row no-gutters>
          <v-col cols="5" v-if="['zfRice', 'zfMoney'].includes(income.category)">
            <v-text-field class="mr-1"
              label="Jml. jiwa"
              v-model.number="income.member"
              @update:modelValue="countZakat"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-if="['zfRice', 'infaqRice'].includes(income.category)" label="Berat (Kg)" v-model.number="income.rice"></v-text-field>
            <v-text-field v-if="['zfMoney', 'zMaal', 'fidyah', 'infaqMoney'].includes(income.category)"
              label="Rupiah" v-model.number="income.money"></v-text-field>            
          </v-col>
        </v-row>


      </v-card-text>
      <v-card-actions>
        <div class="ml-auto">
          <v-btn color="success" variant="outlined" @click="saveIncome">Simpan</v-btn>
        </div>
      </v-card-actions>
    </v-card>

  </v-dialog>

  

</template>

<script setup>
import { ref,inject } from 'vue';
import { useAppStore } from '@/stores/app';

const axios = inject('axios')
const store = useAppStore()
const sb = ref({ value: false, text: ''})
const dialog = ref(false)

const emit = defineEmits(['created'])

const openDialog = () => {
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  income.value = { category: 'zfRice' }
}
const income = ref({ category: 'zfRice' })

const saveIncome = () => {
  axios.post('/v1/incomes', income.value).then(()=>{
    emit('created')
  }).catch((err)=>{
    store.mutate('snackbar', { value: true, text: err.response.data.message })
    // sb.value = { value: true, text: err.response.data.message }
  })
}

const countZakat = (val) => {
  
  if(income.value.category == 'zfRice'){
    return income.value.rice = val * 2.5
  } else 
  if(income.value.category == 'zfMoney'){
    return income.value.money = val * 25000
  } else return 0
}

defineExpose({ openDialog, closeDialog })

</script>