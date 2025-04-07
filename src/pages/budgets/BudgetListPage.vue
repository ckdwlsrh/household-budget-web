<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header"><h2>거래 내역</h2></div>
      <table>
        <thead>
          <tr>
            <th>거래 유형</th>
            <th>카테고리</th>
            <th>금액</th>
            <th>날짜</th>
            <th>메모</th>
            <th>수정한 날짜</th>
          </tr>
        </thead>
        <tbody>
          <BudgetListItem
            v-for="item in transactions"
            :key="item.id"
            :transactions="item"
            @handlrDetail="handlrDetail"
          ></BudgetListItem>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import BudgetListItem from '@/components/budgetItem/BudgetListItem.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const transactions = ref([])
const fetchTransactions = async () => {
  try {
    const response = await axios.get('api/budgetBook')
    transactions.value = response.data
  } catch (e) {
    console.log('[ERROR]', e)
  }
}

const router = useRouter()
const handlrDetail = (itemId) => {
  router.push(`/budgetDetail/${itemId}`)
}

onMounted(() => {
  fetchTransactions()
})
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
