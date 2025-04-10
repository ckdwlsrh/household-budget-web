<template>
  <div class="container mt-4">
    <div class="card p-4 mb-4">
      <div class="h5 fw-bold mb-3">필터</div>
      <div class="row g-2">
        <div class="col-md-2">
          <select class="form-select" v-model="budgetStore.selectedType">
            <option value="">전체 유형</option>
            <option v-for="type in budgetStore.typeOptions" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="col-md-2">
          <select class="form-select" v-model="budgetStore.selectedCategory">
            <option value="">전체 카테고리</option>
            <option v-for="cat in budgetStore.categoryOptions" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>
        <div class="col-md-2">
          <select class="form-select" v-model="budgetStore.selectedYear">
            <option value="">전체(년)</option>
            <option v-for="year in budgetStore.availableYear" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <div class="col-md-2">
          <select class="form-select" v-model="budgetStore.selectedMonth">
            <option value="">전체(월)</option>
            <option v-for="mon in budgetStore.availableMonths" :key="mon" :value="mon">
              {{ mon }}
            </option>
          </select>
        </div>
        <div class="col-md-2">
          <input
            type="date"
            class="form-control"
            v-model="budgetStore.selectedDate"
            :max="new Date().toISOString().split('T')[0]"
          />
        </div>
        <div class="col-md-2">
          <button class="btn btn-outline-danger w-100" @click="resetFilter" title="필터 초기화">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- 거래 내역 부분 -->
    <div class="card">
      <div class="card-header text-center p-4 h2">거래 내역</div>
      <div class="card-body">
        <div v-if="budgetStore.paginatedList.length === 0" class="text-center h5 p-3">
          거래 내역이 없습니다.
        </div>
        <table v-else class="table table-hover align-middle text-center">
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
      </div>

      <!-- 잔액 금액 -->
      <div class="card-footer p-4">
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
    </div>
    <!-- 페이지네이션 UI -->
    <!-- 페이지가 10이상 넘어가는경우 ..? -->
    <ul class="pagination mt-4 justify-content-center">
      <li class="page-item" :class="{ disabled: budgetStore.currentPage === 1 }">
        <button class="page-link" @click="budgetStore.goToPage(budgetStore.currentPage - 1)">
          이전
        </button>
      </li>
      <li
        v-for="page in pageNumbers"
        :key="page"
        class="page-item"
        :class="{ active: page === budgetStore.currentPage }"
      >
        <button class="page-link" @click="budgetStore.goToPage(page)">{{ page }}</button>
      </li>

      <li
        class="page-item"
        :class="{ disabled: budgetStore.currentPage === budgetStore.totalPages }"
      >
        <button class="page-link" @click="budgetStore.goToPage(budgetStore.currentPage + 1)">
          다음
        </button>
      </li>
    </ul>
  </div>

  <button class="btn btn-primary rounded-circle shadow btn-floating" @click="openModal">+</button>

  <AddBudgetDetail :showModal="showModal" :userId="userId" @close="showModal = false" />
</template>

<script setup>
import BudgetListItem from '@/components/budgetItem/BudgetListItem.vue'
import { useRouter } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import { useBudgetStore } from '@/stores/budget'
import { useUserStore } from '@/stores/userStore'
import AddBudgetDetail from '@/components/modal/AddBudgetDetail.vue'
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

//날짜 관련 검증
const today = new Date().toISOString().split('T')[0]
watch(
  () => budgetStore.selectedDate,
  (val) => {
    if (today < val) {
      alert('오늘 이후 날짜는 선택할 수 없습니다.')
      budgetStore.selectedDate = today
    }
  },
)

// 리셋필터
const resetFilter = () => {
  budgetStore.selectedCategory = ''
  budgetStore.selectedDate = ''
  budgetStore.selectedMonth = ''
  budgetStore.selectedType = ''
  budgetStore.selectedYear = ''
}
//페이지네이션 슬라이딩 윈도우 방식
const pagesToShow = 10
const halfOfPages = Math.floor(pagesToShow / 2)

const pageNumbers = computed(() => {
  let start = budgetStore.currentPage - halfOfPages
  let end = budgetStore.currentPage + halfOfPages - 1
  if (start < 1) {
    start = 1
    end = pagesToShow
  }
  if (end > budgetStore.totalPages) {
    end = budgetStore.totalPages
    start = Math.max(1, end - pagesToShow + 1)
  }

  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

//add detail page
const userStore = useUserStore()
const showModal = ref(false)
const userId = ref(null)
const openModal = () => {
  userStore.getLoggedUser()
  userId.value = userStore.loggedUser.id
  showModal.value = true
}
</script>

<style scoped>
ul {
  list-style: none;
}

.btn-floating {
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  width: 3.5rem;
  height: 3.5rem;
  font-size: 1.5rem;
  z-index: 999;
}

.pointer {
  cursor: pointer;
}
</style>
