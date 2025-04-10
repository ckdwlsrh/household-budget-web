<template>
  <div class="container mt-4">
    <div class="card p-4 mb-4">
      <h3>필터</h3>
      <div class="filter-controls">
        <select v-model="budgetStore.selectedType">
          <option value="">전체 유형</option>
          <option v-for="type in budgetStore.typeOptions" :key="type" :value="type">
            {{ type }}
          </option>
        </select>

        <select v-model="budgetStore.selectedCategory">
          <option value="">전체 카테고리</option>
          <option v-for="cat in budgetStore.categoryOptions" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>

        <select v-model="budgetStore.selectedYear">
          <option value="">전체(년)</option>
          <option v-for="year in budgetStore.availableYear" :key="year" :value="year">
            {{ year }}
          </option>
        </select>

        <select v-model="budgetStore.selectedMonth">
          <option value="">전체(월)</option>
          <option v-for="mon in budgetStore.availableMonths" :key="mon" :value="mon">
            {{ mon }}
          </option>
        </select>

        <input type="date" v-model="budgetStore.selectedDate" />
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
            v-for="item in budgetStore.paginatedList"
            :key="item.id"
            :transactions="item"
            @handlrDetail="handlrDetail"
            class="pointer"
          ></BudgetListItem>
        </tbody>
      </table>

      <!-- 잔액 금액 -->
      <div class="total-box mt-4">
        <strong>
          <span v-if="!budgetStore.selectedType"
            >총 잔액: {{ (budgetStore.totalAmount || 0).toLocaleString() }} 원</span
          >
          <span v-else-if="budgetStore.selectedType === 'income'"
            >총 수입: {{ (budgetStore.totalAmount || 0).toLocaleString() }} 원</span
          >
          <span v-else-if="budgetStore.selectedType === 'expense'"
            >총 지출: {{ (budgetStore.totalAmount || 0).toLocaleString() }} 원</span
          >
        </strong>
      </div>

      <!-- 페이지네이션 UI -->
      <div class="pagination mt-4 d-flex justify-content-center">
        <button
          class="left-icon"
          @click="budgetStore.goToPage(budgetStore.currentPage - 1)"
          :disabled="budgetStore.currentPage === 1"
        >
          이전
        </button>

        <button
          v-for="page in budgetStore.totalPages"
          :key="page"
          :class="{ active: page === budgetStore.currentPage }"
          @click="budgetStore.goToPage(page)"
        >
          {{ page }}
        </button>

        <button
          @click="budgetStore.goToPage(budgetStore.currentPage + 1)"
          :disabled="budgetStore.currentPage === budgetStore.totalPages"
        >
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import BudgetListItem from '@/components/budgetItem/BudgetListItem.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useBudgetStore } from '@/stores/budget'
const budgetStore = useBudgetStore()

const router = useRouter()

// 상세 페이지 핸들러 메소드
const handlrDetail = (itemId) => {
  router.push(`/budgetDetail/${itemId}`)
}

// Mounted 관련
onMounted(() => {
  budgetStore.fetchTransactions()
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

.pointer {
  cursor: pointer;
}
</style>
