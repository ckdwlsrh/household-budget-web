<template>
  <GoogleChart1 :income="incomeList" :expense="expenseList" />
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
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import GoogleChart1 from '@/components/google/GoogleChart1.vue'

const incomeList = ref([])
const expenseList = ref([])

const requestAPI = async () => {
  try {
    const response = await axios.get('http://localhost:3000/budgetBook')
    const budgetData = response.data

    incomeList.value = budgetData.filter((item) => item.transactionType === 'income')
    expenseList.value = budgetData.filter((item) => item.transactionType === 'expense')
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
</style>
