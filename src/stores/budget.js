// /store/budgetList.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  editBudgetBook,
  getBudgetBook,
  getBudgetBookById,
  postBudgetBook,
} from '@/api/budgetBook/budgetBookService'
import { useUserStore } from '@/stores/userStore'

export const useBudgetStore = defineStore('budget', () => {
  // 상태(state)
  const transactions = ref([]) // 전체 거래 내역
  const transactionsDetail = ref(null) // 상세 거래 내역

  // 필터 상태
  const selectedType = ref('')
  const selectedCategory = ref('')
  const selectedDate = ref('')
  const selectedYear = ref('')
  const selectedMonth = ref('')
  const availableIncomeType = ref(['월급', '용돈', '이자', '기타'])
  const availableExpenseType = ref(['식비', '교통비', '유흥', '기타'])
  // 월 옵션 (문자열 형식: '01', '02', ...)
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

  // 로그인 정보 (user filtering)
  const userStore = useUserStore()

  // ------------------- Computed (Getters) -------------------

  // 날짜 정렬 리팩토링
  const sortedDescList = computed(() => {
    const list = [...transactions.value]
    return list.sort((a, b) => {
      return new Date(b.createdDate) - new Date(a.createdDate)
    })
  })

  // 연도 옵션
  const availableYear = computed(() => {
    const set = new Set(transactions.value.map((t) => t.createdDate.slice(0, 4)))
    return Array.from(set)
  })

  // 카테고리 옵션 (중복 제거)
  const categoryOptions = computed(() => {
    const set = new Set(transactions.value.map((t) => t.category))
    return Array.from(set)
  })

  // 거래 유형 옵션 (중복 제거)
  const typeOptions = computed(() => {
    const set = new Set(transactions.value.map((t) => t.transactionType))
    return Array.from(set)
  })

  // 필터링된 거래 내역 (로그인 유저, 거래 유형, 카테고리, 월, 날짜 조건 적용)
  const filteredList = computed(() => {
    return sortedDescList.value.filter((item) => {
      const matchUser = userStore.loggedUser ? item.userId === userStore.loggedUser.id : false
      const matchType = selectedType.value ? item.transactionType === selectedType.value : true
      const matchCategory = selectedCategory.value ? item.category === selectedCategory.value : true
      const matchYear = selectedYear.value
        ? item.createdDate.slice(0, 4) === selectedYear.value
        : true
      const matchMonth = selectedMonth.value
        ? item.createdDate.slice(5, 7) === selectedMonth.value
        : true
      const matchDate = selectedDate.value
        ? item.createdDate &&
          typeof item.createdDate === 'string' &&
          item.createdDate.slice(0, 10) === selectedDate.value
        : true
      return matchUser && matchType && matchCategory && matchYear && matchMonth && matchDate
    })
  })

  // 필터 조건에 맞는 총 합산 금액 (수입 - 지출)
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

  // 페이지네이션: 현재 페이지에 해당하는 거래 내역 목록
  const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredList.value.slice(start, end)
  })

  // ------------------- Actions -------------------

  // 전체 거래 내역을 불러옴
  const fetchTransactions = async () => {
    try {
      const result = await getBudgetBook()
      transactions.value = result
    } catch (e) {
      console.error('[ERROR] fetchTransactions:', e)
    }
  }

  // 상세 거래 내역을 불러옴
  const fetchTransactionDetail = async (id) => {
    try {
      const item = await getBudgetBookById(id)
      transactionsDetail.value = item
    } catch (e) {
      console.error('[ERROR] fetchTransactionDetail:', e)
    }
  }

  // 페이지 이동
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  // 거래 내역 추가
  const addTransaction = async (data) => {
    try {
      await postBudgetBook(data)
    } catch (e) {
      console.error('[ERROR] addTransaction:', e)
    }
  }

  // 거래 내역 수정
  const updateTransaction = async (id, data) => {
    try {
      await editBudgetBook(id, data)
    } catch (e) {
      console.error('[ERROR] updateTransaction:', e)
    }
  }

  // ------------------- 반환 (Return) -------------------
  return {
    // 상태
    transactions,
    transactionsDetail,
    selectedType,
    selectedCategory,
    selectedYear,
    selectedMonth,
    selectedDate,
    availableYear,
    availableMonths,
    currentPage,
    itemsPerPage,
    // computed 값들
    sortedDescList,
    categoryOptions,
    availableIncomeType,
    availableExpenseType,
    typeOptions,
    filteredList,
    totalAmount,
    totalPages,
    paginatedList,
    // 액션
    fetchTransactions,
    fetchTransactionDetail,
    goToPage,
    addTransaction,
    updateTransaction,
  }
})
