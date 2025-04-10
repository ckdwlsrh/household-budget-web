import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useHomePageStore = defineStore('homePage', () => {
  const month = ref(new Date().getMonth() + 1)
  const year = ref(new Date().getFullYear())
  const incomeList = ref([])
  const expenseList = ref([])

  const incomeTotal = computed(() =>
    incomeList.value.reduce((sum, item) => sum + Number(item.amount), 0),
  )
  const expenseTotal = computed(() =>
    expenseList.value.reduce((sum, item) => sum + Number(item.amount), 0),
  )
  const balance = computed(() => incomeTotal.value - expenseTotal.value)

  const fetchBudgetData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/budgetBook')
      const data = res.data

      incomeList.value = data.filter(
        (item) =>
          item.transactionType === 'income' &&
          parseInt(item.updatedDate.slice(5, 7), 10) === month.value &&
          parseInt(item.updatedDate.slice(0, 4), 10) === year.value,
      )
      expenseList.value = data.filter(
        (item) =>
          item.transactionType === 'expense' &&
          parseInt(item.updatedDate.slice(5, 7), 10) === month.value &&
          parseInt(item.updatedDate.slice(0, 4), 10) === year.value,
      )
    } catch (err) {
      console.error('예산 데이터 로드 실패:', err)
    }
  }

  function previousMonth() {
    if (month.value > 1) month.value -= 1
  }

  function nextMonth() {
    if (month.value < 12) month.value += 1
  }
  function previousYear() {
    if (year.value > 0) year.value -= 1
  }

  function nextYear() {
    if (year.value < 20000) year.value += 1
  }

  return {
    month,
    year,
    incomeList,
    expenseList,
    incomeTotal,
    expenseTotal,
    balance,
    fetchBudgetData,
    previousMonth,
    nextMonth,
    previousYear,
    nextYear,
  }
})
