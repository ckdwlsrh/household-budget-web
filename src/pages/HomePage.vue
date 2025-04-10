<template>
  <div class="header-wrapper">
    <div class="header-content">
      <div class="center-buttons">
        <div class="year-controls">
          <button class="btn btn-sm" @click="previousYear">
            <i class="fas fa-angle-left"></i>
          </button>
          <h5 class="m-0">{{ year }}년</h5>
          <button class="btn btn-sm" @click="nextYear">
            <i class="fas fa-angle-right"></i>
          </button>
        </div>
        <div class="month-controls">
          <button class="btn btn-primary btn-sm" @click="previousMonth">
            <i class="fas fa-arrow-left"></i>
          </button>
          <h2 class="m-0">{{ month }}월</h2>
          <button class="btn btn-primary btn-sm" @click="nextMonth">
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
      <div class="balance-display">
        <h3 class="text-success fw-bold d-flex justify-content-end align-items-center gap-2 m-0">
          <i class="bi bi-cash-coin"></i>
          총 잔액: {{ balance.toLocaleString() }}원
        </h3>
      </div>
    </div>
  </div>

  <div class="card-container">
    <div class="chart">
      <div class="card">
        <div class="card-body">
          <GoogleChart1 :income="incomeList" :expense="expenseList" />
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <GoogleChart2 :income="incomeList" :expense="expenseList" />
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h5 style="font-weight: bold; margin: 0 0 20px 0">
          총수익:
          <span class="badge bg-success fs-6">{{ incomeTotal.toLocaleString() }}원</span>
        </h5>
        <table class="table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>카테고리</th>
              <th>금액</th>
              <th>메모</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in incomeList" :key="item.id">
              <td>{{ item.updatedDate }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.amount }}</td>
              <td>{{ item.memo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 지출 -->
    <div class="card">
      <div class="card-body">
        <h5 style="font-weight: bold; margin: 0 0 20px 0">
          총 지출:
          <span class="badge bg-danger fs-6">{{ expenseTotal.toLocaleString() }}원</span>
        </h5>
        <table class="table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>카테고리</th>
              <th>금액</th>
              <th>메모</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in expenseList" :key="item.id">
              <td>{{ item.updatedDate }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.amount }}</td>
              <td>{{ item.memo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- 플로팅 추가 버튼 -->
  <button class="btn btn-primary rounded-circle shadow btn-floating" @click="openModal">+</button>

  <AddBudgetDetail :showModal="showModal" :userId="userId" @close="showModal = false" />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useHomePageStore } from '@/stores/homePageStore'
import { useUserStore } from '@/stores/userStore'
import GoogleChart1 from '@/components/google/GoogleChart1.vue'
import GoogleChart2 from '@/components/google/GoogleChart2.vue'
import AddBudgetDetail from '@/components/modal/AddBudgetDetail.vue'

const hpStore = useHomePageStore()
const { month, year, incomeList, expenseList, incomeTotal, expenseTotal, balance } =
  storeToRefs(hpStore)
const { previousMonth, nextMonth, previousYear, nextYear, fetchBudgetData } = hpStore

watch([month, year], () => {
  fetchBudgetData()
})

onMounted(() => {
  fetchBudgetData()
})

// Modal
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
.header-wrapper {
  margin-top: 15px;
  width: 100%;
}

.header-content {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 1400px;
  margin: 0 auto;
  height: 120px;
}

.center-buttons {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.year-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}
.month-controls {
  display: flex;
  align-items: center;
  gap: 30px;
}

.balance-display {
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-right: 100px;
}

.card-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 0px;
}

.card {
  width: 700px;
  min-height: 300px;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart {
  width: 1400px;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  gap: 20px;
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
</style>
