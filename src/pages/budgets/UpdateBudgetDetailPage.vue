<template>
  <div class="d-flex justify-content-center p-5">
    <div class="card" style="width: 50rem">
      <div class="card-header text-center">거래 내역 수정 페이지</div>
      <div class="card-body">
        <div v-if="transactionsDetail">
          <div class="mb-2">
            <label for="transactionType" class="form-label">유형</label>
            <select id="transactionType" class="form-select" v-model="transactionType">
              <option value="income">수입</option>
              <option value="expense">지출</option>
            </select>
          </div>
          <div class="mb-2">
            <label for="categorySelect" class="form-label">카테고리</label>
            <select id="categorySelect" class="form-select" v-model="selectedCategory">
              <option disabled value="">-- 카테고리를 선택하세요 --</option>
              <option v-for="item in categoryStore.category" :key="item.id" :value="item.item">
                {{ item.item }}
              </option>
            </select>
          </div>
          <div class="mb-2">
            <label for="amountInput" class="form-label">금액</label>
            <input
              id="amountInput"
              type="number"
              v-model.number="amount"
              class="form-control"
              placeholder="금액"
            />
          </div>
          <div class="mb-2">
            <label for="memoInput" class="form-label">메모</label>
            <input
              id="memoInput"
              type="text"
              v-model="memo"
              class="form-control"
              placeholder="메모"
            />
          </div>
          <div class="mb-2 card-text">
            <label for="dateInput" class="form-label">거래 날짜</label>
            <input
              id="dateInput"
              type="date"
              v-model="selectedDate"
              class="form-control"
              :max="new Date().toISOString().split('T')[0]"
            />
          </div>
        </div>
        <div v-else>
          <div class="card-text">거래 정보를 불러오는 중...</div>
        </div>
      </div>

      <div class="card-footer text-end">
        <button class="btn btn-primary me-2" @click="submit">완료</button>
        <button class="btn btn-danger" @click="router.back()">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBudgetStore } from '@/stores/budget'
import { useCategoryStore } from '@/stores/categoryStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const budgetStore = useBudgetStore()
const route = useRoute()
const router = useRouter()
const id = route.params.id

const categoryStore = useCategoryStore()
categoryStore.getCategory()

const { transactionsDetail } = storeToRefs(budgetStore)

const transactionType = ref(transactionsDetail.value.transactionType)
const amount = ref(transactionsDetail.value.amount)
const memo = ref(transactionsDetail.value.memo)
const selectedCategory = ref(transactionsDetail.value.category)
const selectedDate = ref(new Date(transactionsDetail.value.updatedDate).toISOString().split('T')[0])

const submit = () => {
  //validation
  if (amount.value <= 0) {
    alert('금액을 알맞게 입력해주세요')
    return false
  }
  if (memo.value === '' || memo.value.length === 0) {
    alert('메모를 입력해주세요')
    return false
  }
  if (transactionType.value === '' || transactionType.value.length === 0) {
    alert('유형을 선택해주세요')
    return false
  }
  if (selectedCategory.value === '' || selectedCategory.value.length === 0) {
    alert('카테고리를 선택해주세요')
    return false
  }
  if (!selectedDate.value) {
    alert('날짜를 선택해주세요')
    return false
  }
  const today = new Date()
  const selected = new Date(selectedDate.value)
  if (selected > today) {
    alert('미래 날짜는 선택할 수 없습니다')
    return false
  }

  // -----------
  const budgetStore = useBudgetStore()
  const data = {
    id: id,
    userId: transactionsDetail.value.userId,
    createdDate: selectedDate.value,
    updatedDate: today.toISOString().split('T')[0],
    amount: amount.value,
    transactionType: transactionType.value,
    category: selectedCategory.value,
    memo: memo.value,
  }
  budgetStore.updateTransaction(id, data)
  alert('정상적으로 수정되었습니다.')
  router.push(`/budgetDetail/${id}`)
}
</script>

<style scoped></style>
