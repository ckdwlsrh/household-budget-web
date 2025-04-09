// /store/budgetList.js
import { defineStore } from 'pinia'
import {
  editBudgetBook,
  getBudgetBook,
  getBudgetBookById,
  postBudgetBook,
} from '@/api/budgetBook/budgetBookService'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore'

export const useBudgetStore = defineStore('budget', () => {
  // 상태(state)
  const transactions = ref([]) // 원본 배열
  const transactionsDetail = ref(null) // 상세 페이지용 배열

  // 필터 상태
  const selectedType = ref('')
  const selectedCategory = ref('')
  const selectedDate = ref('')
  const selectedMonth = ref('')
  // 월 옵션 목록 (문자열 형식: '01', '02', ...)
  const availableMonths = ref([
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ])

  // 페이지네이션
  const currentPage = ref(1)
  const itemsPerPage = ref(5)

  // 정렬 관련
  const sortField = ref('createdDate')
  const sortOrder = ref('desc')

  // 유저관련
  const userStore = useUserStore()

  // ------------------- Getters (computed) -------------------

  // 내림차순(최신순) 정렬된 리스트
  const sortedDescList = computed(() => {
    const list = [...transactions.value]
    const sf = sortField.value
    const so = sortOrder.value

    return list.sort((a, b) => {
      const aValue = a[sf]
      const bValue = b[sf]

      // 날짜 정렬
      if (sf === 'createdDate') {
        return so === 'asc'
          ? new Date(aValue) - new Date(bValue)
          : new Date(bValue) - new Date(aValue)
      }
      // 숫자 정렬 (예: amount)
      return so === 'asc' ? aValue - bValue : aValue - bValue
    })
  })

  // 카테고리 옵션 (중복 제거)
  const categoryOptions = computed(() => {
    const set = new Set(transactions.value.map((t) => t.category))
    return Array.from(set)
  })

  // 거래유형 옵션 (중복 제거)
  const typeOptions = computed(() => {
    const set = new Set(transactions.value.map((t) => t.transactionType))
    return Array.from(set)
  })

  //---------------------------------------------------------------//
  //------------------------AddBudgetbook--------------------------//
  //---------------------------------------------------------------//
  async function addTransaction(data) {
    try {
      await postBudgetBook(data)
    } catch (e) {
      console.log('[ERROR]', e)
    }
  }

  async function updateTransaction(id, data) {
    try {
      await editBudgetBook(id, data)
    } catch (e) {
      console.log('[ERROR]', e)
    }
  }

  // 필터링된 목록 추출 (거래유형, 카테고리, 월, 날짜 필터 적용)
  const filteredList = computed(() => {
    return sortedDescList.value.filter((item) => {
      const userId = userStore.loggedUser ? item.userId === userStore.loggedUser.id : false

      const matchType = selectedType.value ? item.transactionType === selectedType.value : true

      const matchCategory = selectedCategory.value ? item.category === selectedCategory.value : true

      // 월별 필터: selectedMonth 값이 있을 경우, createdDate에서 월 부분("MM")과 비교
      const matchMonth = selectedMonth.value
        ? item.createdDate.slice(5, 7) === selectedMonth.value
        : true

      // 날짜 필터: selectedDate 값이 있을 경우, "YYYY-MM-DD" 비교
      const matchDate = selectedDate.value
        ? item.createdDate &&
          typeof item.createdDate === 'string' &&
          item.createdDate.slice(0, 10) === selectedDate.value
        : true

      return userId && matchType && matchCategory && matchMonth && matchDate
    })
  })

  // 필터별 합산 금액 (수입 - 지출)
  const totalAmount = computed(() => {
    const incomeAmount = filteredList.value
      .filter((t) => t.transactionType === 'income')
      .reduce((sum, income) => sum + income.amount, 0)
    const expenseAmount = filteredList.value
      .filter((t) => t.transactionType === 'expense')
      .reduce((sum, expense) => sum + expense.amount, 0)

    return incomeAmount - expenseAmount
  })

  // 페이지네이션: 총 페이지 수
  const totalPages = computed(() => {
    return Math.ceil(filteredList.value.length / itemsPerPage.value)
  })

  // 페이지네이션: 현재 페이지에 해당하는 항목
  const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredList.value.slice(start, end)
  })

  // ------------------- Actions -------------------

  async function fetchTransactions() {
    try {
      const result = await getBudgetBook()
      transactions.value = result
    } catch (e) {
      console.error('[ERROR] fetchTransactions:', e)
    }
  }

  async function fetchTransactionDetail(id) {
    try {
      const item = await getBudgetBookById(id)
      transactionsDetail.value = item
    } catch (e) {
      console.log('[ERROR]', e)
    }
  }

  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  // ------------------- 반환 (Return) -------------------
  return {
    // 상태
    transactions,
    transactionsDetail,
    selectedType,
    selectedCategory,
    selectedDate,
    selectedMonth,
    availableMonths,
    currentPage,
    itemsPerPage,
    sortField,
    sortOrder,
    // computed (getters)
    sortedDescList,
    categoryOptions,
    typeOptions,
    filteredList,
    totalAmount,
    totalPages,
    paginatedList,
    // actions
    fetchTransactions,
    fetchTransactionDetail,
    goToPage,
  }
})
