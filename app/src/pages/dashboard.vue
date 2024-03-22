<template>
  <AppHeader @incomeCreated="incomeCreated" /> 
  <v-container>
    <v-row>
      <v-col cols="6">
      <v-sheet color="red" class="px-3 py-1 rounded text-center">
        <v-icon size="x-large" class="mb-1">mdi-seed</v-icon>
        <div>ZF. Beras</div>
        <div class="text-h6">1000 <span class="text-caption">kg</span></div>
      </v-sheet>        
      </v-col>
      <v-col cols="6">
        <v-sheet color="red" class="px-3 py-1 rounded text-center">
        <v-icon size="x-large" class="mb-1">mdi-cash</v-icon>
        <div>ZF. Uang</div>
        <div class="text-h6"><span class="text-caption">Rp.</span> 55<span style="" class="text-caption">.000</span></div>
      </v-sheet>        
      </v-col>
    </v-row>
    

    <v-row v-for="income in incomes" class="bg-grey-lighten-2 my-1" :key="income.key">
      <v-col cols="4"><div class="text-truncate">{{ income.name }}</div></v-col>
      <v-col colsc="au/to" class="text-right">
         {{ formatAmount(income).amount }}
      </v-col>
      <v-col>
        {{ formatAmount(income).category }}
      </v-col>
      <v-col cols="auto"><v-icon  class="text-error" @click="deleteItem(income)">mdi-delete-outline</v-icon></v-col>
    </v-row>    
  </v-container>

  <IncomeForm ref="refIncomeForm" @incomeCreated="incomeCreated" />
  <ConfirmDelete ref="refConfirmDelete" @confirmed="confirmed"/>

</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import {useAppStore} from '../stores/app'
const axios = inject('axios')


const store = useAppStore()
const incomes = ref([])
const income = ref({})
const refIncomeForm = ref(null)
const refConfirmDelete = ref(null)

const getIncomes = () => {
  axios.get('/v1/incomes').then( (res) =>{
    incomes.value = res.data.results
  }).catch((err)=>{
    console.log('err.response.data')
  })
}

const incomeCreated = () => {
  getIncomes()
}

const formatAmount = (val) => {
  if(val.category == 'zfRice'){
    return { category: 'ZF', icon: 'seed-outline', amount: val.rice.toString().replace('.',',') + ' kg' }
  } else 
  if(val.category == 'zfMoney'){
    return { category: 'ZF', icon: 'cash-100', amount: moneyFormat(val.money) }
  } else 
  if(val.category == 'zMaal'){
    return { category: 'ZM', icon: 'cash', amount: moneyFormat(val.money) }
  } else
  if(val.category == 'infaqMoney'){
    return { category: 'IN', icon: 'cash', amount: ( val.money / 1000 ).toLocaleString('id-ID', {maximumFractionDigits:2}) + ' rb' }
  } else
  if(val.category == 'infaqRice'){
    return { category: 'IN', icon: 'cash', amount: ( val.money / 1000 ).toLocaleString('id-ID', {maximumFractionDigits:2}) + ' rb' }
  }
  if(val.category == 'fidyah'){
    return { category: 'FD', icon: 'cash', amount: moneyFormat(val.money) }
  }
}

const moneyFormat = (val) => {
  if(val > 1000000) {
    console.log('hooh')
    return ( val / 1000000 ).toLocaleString('id-ID', {maximumFractionDigits:2}) + ' jt'
  } else
  if(val > 1000 && val < 1000000) {
    return ( val / 1000 ).toLocaleString('id-ID', {maximumFractionDigits:2}) + ' rb'
  } else 
  return val
}

onMounted(()=>{
  getIncomes()
})



const deleteItem = (val) => {
  income.value = val
  refConfirmDelete.value.openDialog()
}
const confirmed = () => {
  axios.delete(`/v1/incomes/${income.value.id}`).then((res)=>{
    income.value= {}
    refConfirmDelete.value.closeDialog()
    getIncomes()
  }).catch(()=>{})
}



</script>
