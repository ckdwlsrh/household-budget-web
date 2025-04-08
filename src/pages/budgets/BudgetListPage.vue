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
            v-for="item in paginatedList"
            :key="item.id"
            :transactions="item"
            @handlrDetail="handlrDetail"
          ></BudgetListItem>
        </tbody>
      </table>

      <!-- 합산 금액 -->
      <div class="total-box mt-4">
        <strong>총 합계:</strong> {{ totalAmount.toLocaleString() }} 원
      </div>

      <!-- 페이지네이션 UI -->
      <div class="pagination mt-4">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">이전</button>

        <button
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>

        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import BudgetListItem from '@/components/budgetItem/BudgetListItem.vue'
import { useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { getBudgetBook } from '@/api/budgetBook/budgetBookService'

//--------------------원본 리스트----------------------//
const transactions = ref([])
const fetchTransactions = async () => {
  try {
    const result = await getBudgetBook()
    transactions.value = result
  } catch (e) {
    console.error('[ERROR]', e)
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
      ? item.createdDate &&
        typeof item.createdDate === 'string' &&
        item.createdDate.slice(0, 10) === selectedDate.value
      : true
    return matchType && matchCategory && matchDate
  })
})

// 필터별 합산 금액
const totalAmount = computed(() => {
  return filteredList.value.reduce((sum, item) => sum + item.amount, 0)
})

//--------------------페이지네이션-----------------------//
const currentPage = ref(1)
const itemsPerPage = 5
const totalPages = computed(() => {
  return Math.ceil(filteredList.value.length / itemsPerPage)
})
const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredList.value.slice(start, end)
})
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

//----------------상세 페이지 관련----------------------//

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

.pagination button {
  margin: 0 4px;
  padding: 6px 12px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}

.pagination button.active {
  background: #007bff;
  color: white;
  font-weight: bold;
}
</style>
