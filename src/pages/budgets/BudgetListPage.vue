<template>
  <div class="container mt-4">
    <div class="card p-4 mb-4">
      <h3>필터</h3>
      <div class="filter-controls">
        <select v-model="selectedType">
          <option value="">전체 유형</option>
          <option v-for="type in typeOptions" :key="type" :value="type">
            {{ type }}
          </option>
        </select>

        <select v-model="selectedCategory">
          <option value="">전체 카테고리</option>
          <option v-for="cat in categoryOptions" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>

        <input type="date" v-model="selectedDate" />
      </div>
    </div>

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
            v-for="item in filteredList"
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
import { onMounted, ref, computed } from 'vue'
import BudgetListItem from '@/components/budgetItem/BudgetListItem.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

//--------------------원본 리스트----------------------//
const transactions = ref([])
const fetchTransactions = async () => {
  try {
    const response = await axios.get('api/budgetBook')
    transactions.value = response.data
  } catch (e) {
    console.log('[ERROR]', e)
  }
}

//------------------필터 리스트 관련---------------------//

// 필터 조건
const selectedType = ref('')
const selectedCategory = ref('')
const selectedDate = ref('')

// 필터 조건 추출
const categoryOptions = computed(() => {
  const set = new Set(transactions.value.map((t) => t.category))
  return Array.from(set)
})

const typeOptions = computed(() => {
  const set = new Set(transactions.value.map((t) => t.transactionType))
  return Array.from(set)
})

// 필터링된 목록
const filteredList = computed(() => {
  return transactions.value.filter((item) => {
    const matchType = selectedType.value ? item.transactionType === selectedType.value : true
    const matchCategory = selectedCategory.value ? item.category === selectedCategory.value : true
    const matchDate = selectedDate.value
      ? item.date && typeof item.date === 'string' && item.date.slice(0, 10) === selectedDate.value
      : true

    // 로그
    console.log('item.date:', item.date)
    console.log('parsed date:', new Date(item.date).toISOString().slice(0, 10))
    console.log('selectedDate:', selectedDate.value)

    return matchType && matchCategory && matchDate
  })
})

//-------------------------------------------//
// 상세 페이지 관련
const router = useRouter()
const handlrDetail = (itemId) => {
  router.push(`/budgetDetail/${itemId}`)
}

//-------------------------------------------//
// Mounted 관련
onMounted(() => {
  fetchTransactions()
})
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
