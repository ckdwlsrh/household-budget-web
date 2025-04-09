<template>
  <div
    class="modal fade"
    :class="{ show: props.showModal }"
    style="display: block"
    v-if="showModal"
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content shadow rounded p-3">
        <div class="modal-header">
          <h5 class="modal-title">가계부 작성</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <select class="form-select mb-2" v-model="transactionType">
            <option disabled value="">-- 유형을 선택하세요 --</option>
            <option value="income">수입</option>
            <option value="expense">지출</option>
          </select>
          <select class="form-select mb-2" v-model="selectedCategory">
            <option disabled value="">-- 카테고리를 선택하세요 --</option>
            <option v-for="item in categoryStore.category" :key="item.id" :value="item.item">
              {{ item.item }}
            </option>
          </select>
          <input
            type="number"
            v-model.number="amount"
            class="form-control mb-2"
            placeholder="금액"
          />
          <input type="text" v-model="memo" class="form-control mb-2" placeholder="메모" />
          <input
            type="date"
            v-model="selectedDate"
            class="form-control mb-2"
            :max="new Date().toISOString().split('T')[0]"
          />
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="submit">저장</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBudgetStore } from '@/stores/budget'
import { useCategoryStore } from '@/stores/categoryStore'
import { ref } from 'vue'

const props = defineProps({
  showModal: Boolean,
  userId: String,
})
const emits = defineEmits(['close'])
//data 영역
const categoryStore = useCategoryStore()
categoryStore.getCategory()

const transactionType = ref('')
const amount = ref(0)
const memo = ref('')
const selectedCategory = ref('')
const selectedDate = ref(new Date().toISOString().substring(0, 10))

const submit = () => {
  //validate
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
  if (selectedDate.value > today) {
    alert('미래 날짜는 선택할 수 없습니다')
    return false
  }

  // -----------
  const budgetStore = useBudgetStore()
  const data = {
    userId: props.userId,
    createdDate: selectedDate.value,
    updatedDate: selectedDate.value,
    amount: amount.value,
    transactionType: transactionType.value,
    category: selectedCategory.value,
    memo: memo.value,
  }
  budgetStore.addTransaction(data)
  alert('저장되었습니다.')
  closeModal()
}
const closeModal = () => {
  emits('close')
}
</script>

<style scoped></style>
