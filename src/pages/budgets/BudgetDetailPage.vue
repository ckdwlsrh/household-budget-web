<template>
  <div v-if="transactions">
    <h2>거래 상세 정보</h2>
    <p>거래 유형: {{ transactions.transactionType }}</p>
    <p>카테고리: {{ transactions.category }}</p>
    <p>금액: {{ transactions.amount }}</p>
    <p>거래 날짜: {{ transactions.createdDate }}</p>
    <p>수정 날짜: {{ transactions.updatedDate }}</p>
    <p>메모: {{ transactions.memo }}</p>
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
import { ref, onMounted } from 'vue'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const userId = route.params.id
const transactions = ref([])

const fetchTransaction = async () => {
  try {
    const item = await axios.get(`/api/budgetBook/${userId}`)
    transactions.value = item.data
  } catch (e) {
    console.log('[ERROR]', e)
  }
}

const goBack = () => {
  router.push('/')
}

console.log('거래 아이디:', userId)

onMounted(() => {
  fetchTransaction()
})
</script>
