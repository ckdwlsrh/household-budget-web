<template>
  <div class="d-flex justify-content-center align-items-center gap-2">
    <button class="btn btn-primary" @click="previousMonth">이전 달</button>
    <h2>{{ month }}월</h2>
    <button class="btn btn-primary" @click="nextMonth">다음 달</button>
  </div>
  <div class="chart">
    <GoogleChart1 :income="incomeList" :expense="expenseList" />
    <GoogleChart2 :income="incomeList" :expense="expenseList" />
  </div>
  <div class="card-container">
    <div class="card">
      <div class="card-body">
        <!-- 수익 테이블 -->
        <div>
          <h4>총수익: {{ incomeListTotal }}</h4>
        </div>
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

    <div class="card">
      <div class="card-body">
        <!-- 지출 테이블 -->
        <div>
          <h4>총지출: {{ expenseTotal }}</h4>
        </div>
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

  <div class="summary">
    <h2>총 잔액: {{ balance }}</h2>
  </div>

  <button class="btn btn-primary rounded-circle shadow btn-floating" @click="openModal">+</button>

  <AddBudgetDetail :showModal="showModal" :userId="userId" @close="showModal = false" />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import GoogleChart1 from '@/components/google/GoogleChart1.vue'
import GoogleChart2 from '@/components/google/GoogleChart2.vue'
import AddBudgetDetail from '../components/modal/AddBudgetDetail.vue'
import { useUserStore } from '@/stores/userStore'

const incomeList = ref([])
const expenseList = ref([])
const month = ref(new Date().getMonth() + 1)

function previousMonth() {
  if (month.value > 1) {
    month.value -= 1
  }
}

function nextMonth() {
  if (month.value < 12) {
    month.value += 1
  }
}
watch(month, () => {
  requestAPI()
})

const requestAPI = async () => {
  try {
    const response = await axios.get('http://localhost:3000/budgetBook')
    const budgetData = response.data

    incomeList.value = budgetData.filter(
      (item) =>
        item.transactionType === 'income' &&
        parseInt(item.updatedDate.slice(5, 7), 10) === month.value,
    )
    expenseList.value = budgetData.filter(
      (item) =>
        item.transactionType === 'expense' &&
        parseInt(item.updatedDate.slice(5, 7), 10) === month.value,
    )
    console.log(month)
  } catch (error) {
    console.error('API 요청 오류:', error)
  }
}
requestAPI()

const incomeListTotal = computed(() => {
  return incomeList.value.reduce((sum, item) => sum + Number(item.amount), 0)
})

const expenseTotal = computed(() => {
  return expenseList.value.reduce((sum, item) => sum + Number(item.amount), 0)
})

const balance = computed(() => incomeListTotal.value - expenseTotal.value)

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
.card-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.card {
  width: 700px;
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

.summary {
  text-align: center;
  margin-top: 30px;
}

.btn-floating {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 3.5rem;
  height: 3.5rem;
  font-size: 1.5rem;
  z-index: 999;
}
.chart {
  width: 1400px;
  display: flex;
  margin: 0 auto;
  justify-content: center;
}
</style>
