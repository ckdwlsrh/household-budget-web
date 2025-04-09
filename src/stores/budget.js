import { defineStore } from 'pinia'
import {
  editBudgetBook,
  getBudgetBook,
  getBudgetBookById,
  postBudgetBook,
} from '@/api/budgetBook/budgetBookService'

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    transactions: [], // 원본 배열
    transactionsDetail: null, // 상세 페이지용 배열

    // 카테고리
    selectedType: '',
    selectedCategory: '',
    selectedDate: '',

    // 페이지네이션
    currentPage: 1,
    itemsPerPage: 5,

    // 내림차순
    sortField: 'createdDate',
    sortOrder: 'desc',
  }),

  getters: {
    // 내림차순(최신순으로 정렬)
    sortedDescList: (state) => {
      const list = [...state.transactions]
      const { sortField, sortOrder } = state

      return list.sort((a, b) => {
        // a.createdDate < b.createdDate

        const aValue = a[sortField]
        const bValue = b[sortField]

        // 날짜 정렬
        if (sortField === 'createdDate') {
          return sortOrder === 'asc'
            ? new Date(aValue) - new Date(bValue)
            : new Date(bValue) - new Date(aValue)
        }
        // 숫자 정렬 (ex: amount)
        return sortOrder === 'asc' ? aValue - bValue : aValue - bValue
      })
    },

    //---------------------------------------------------------------//
    //------------------------[getters]필터--------------------------//
    //---------------------------------------------------------------//
    // 필터 조건 추출
    categoryOptions: (state) => {
      const set = new Set(state.transactions.map((t) => t.category)) // Set을 통해 중복 카테고리 제거
      return Array.from(set) // 배열로 변환
    },

    typeOptions: (state) => {
      const set = new Set(state.transactions.map((t) => t.transactionType)) // Set을 통해 중복 카테고리 제거
      return Array.from(set) // 배열로 변환
    },

    // 필터링된 목록 추출
    // 리팩토링 고려 중
    filteredList: (state) => {
      return state.sortedDescList.filter((item) => {
        const matchType = state.selectedType ? item.transactionType === state.selectedType : true
        const matchCategory = state.selectedCategory
          ? item.category === state.selectedCategory
          : true
        const matchDate = state.selectedDate
          ? item.createdDate &&
            typeof item.createdDate === 'string' &&
            item.createdDate.slice(0, 10) === state.selectedDate
          : true
        return matchType && matchCategory && matchDate
      })
    },

    // 필터별 합산 금액
    totalAmount: (state) => {
      const incomeAmount = state.filteredList
        .filter((t) => t.transactionType === 'income')
        .reduce((sum, income) => sum + income.amount, 0)
      const expenseAmount = state.filteredList
        .filter((t) => t.transactionType === 'expense')
        .reduce((sum, expense) => sum + expense.amount, 0)

      return incomeAmount - expenseAmount
    },

    //---------------------------------------------------------------//
    //--------------------[getters]페이지네이션----------------------//
    //---------------------------------------------------------------//

    // 페이지 수 계산
    totalPages: (state) => {
      // [반올림](전체 거래 내역 수 ÷ 표시할 거래 내역 수)
      return Math.ceil(state.filteredList.length / state.itemsPerPage)
    },

    // 현재 페이지에 해당하는 항목
    paginatedList: (state) => {
      const start = (state.currentPage - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      return state.filteredList.slice(start, end)
    },
  },

  actions: {
    async fetchTransactions() {
      try {
        const result = await getBudgetBook()
        this.transactions = result
      } catch (e) {
        console.error('[ERROR] fetchTransactions:', e)
      }
    },

    //---------------------------------------------------------------//
    //------------------------DetailPage-----------------------------//
    //---------------------------------------------------------------//
    async fetchTransactionDetail(id) {
      try {
        const item = await getBudgetBookById(id)
        this.transactionsDetail = item
      } catch (e) {
        console.log('[ERROR]', e)
      }
    },

    //---------------------------------------------------------------//
    //--------------------[Action]페이지네이션-----------------------//
    //---------------------------------------------------------------//

    // 페이지 이동
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },

    //---------------------------------------------------------------//
    //------------------------AddBudgetbook--------------------------//
    //---------------------------------------------------------------//
    async addTransaction(data) {
      try {
        await postBudgetBook(data)
      } catch (e) {
        console.log('[ERROR]', e)
      }
    },

    async updateTransaction(id, data) {
      try {
        await editBudgetBook(id, data)
      } catch (e) {
        console.log('[ERROR]', e)
      }
    },
  },
})
