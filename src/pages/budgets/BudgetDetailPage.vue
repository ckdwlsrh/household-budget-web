<template>
  <div v-if="transactionsDetail">
    <h2>거래 상세 정보</h2>
    <p>거래 유형: {{ transactionsDetail.transactionType }}</p>
    <p>카테고리: {{ transactionsDetail.category }}</p>
    <p>금액: {{ transactionsDetail.amount }}</p>
    <p>거래 날짜: {{ transactionsDetail.createdDate }}</p>
    <p>수정 날짜: {{ transactionsDetail.updatedDate }}</p>
    <p>메모: {{ transactionsDetail.memo }}</p>
  </div>
  <div v-else>
    <p>거래 정보를 불러오는 중...</p>
  </div>
  <div>
    <button class="btn btn-primary" @click="goBack">뒤로가기</button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useBudgetStore } from '@/stores/budget'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const budgetStore = useBudgetStore()

// action은 구조분해할당 안됨.
const { transactionsDetail } = storeToRefs(budgetStore)

const goBack = () => {
  router.push('/budgetList')
}

onMounted(() => {
  budgetStore.fetchTransactionDetail(id)
})
</script>
