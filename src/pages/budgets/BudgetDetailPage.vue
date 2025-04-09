<template>
<<<<<<< HEAD
  <div class="d-flex justify-content-center p-5">
    <div class="card" style="width: 50rem">
      <div class="card-header text-center">거래 내역 상세 보기</div>
      <div class="card-body">
        <div v-if="transactionsDetail">
          <div class="mb-2 row">
            <label class="col-2 form-label fw-bold">거래 유형</label>
            <p class="col-10 card-text">
              {{ transactionsDetail.transactionType === 'income' ? '수입' : '지출' }}
            </p>
          </div>
          <div class="mb-2 row">
            <label class="col-2 form-label fw-bold">카테고리</label>
            <p class="col-10 card-text">{{ transactionsDetail.category }}</p>
          </div>
          <div class="mb-2 row">
            <label class="col-2 form-label fw-bold">금액</label>
            <p class="col-10 card-text">{{ transactionsDetail.amount }}</p>
          </div>
          <div class="mb-2 row">
            <label class="col-2 form-label fw-bold">메모</label>
            <p class="col-10 card-text">{{ transactionsDetail.memo }}</p>
          </div>
          <div class="mb-2 row">
            <label class="col-2 form-label fw-bold">거래 날짜</label>
            <p class="col-10 card-text">{{ transactionsDetail.createdDate }}</p>
          </div>
          <div class="mb-2 row">
            <label class="col-2 form-label fw-bold">수정 날짜</label>
            <p class="col-10 card-text">{{ transactionsDetail.updatedDate }}</p>
          </div>
        </div>
        <div v-else>
          <div class="card-text">거래 정보를 불러오는 중...</div>
        </div>
      </div>

      <div class="card-footer text-end">
        <!-- USER 검사 추가해야됨 -->
        <button class="btn btn-danger me-2" @click="deleteDetail">삭제하기</button>
        <button class="btn btn-warning me-2" @click="editDetail">수정하기</button>
        <button class="btn btn-secondary" @click="goBack">뒤로가기</button>
=======
  <div class="container mt-4">
    <div class="card p-4 mb-4">
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
      <div class="mt-4">
        <button class="btn btn-dark me-2" @click="goBack">뒤로가기</button>
        <button class="btn btn-danger me-2" @click="deleteTransAction">거래 내역 삭제</button>
>>>>>>> be06887 (월별 필터 추가)
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useBudgetStore } from '@/stores/budget'
import { storeToRefs } from 'pinia'
<<<<<<< HEAD
import { useUserStore } from '@/stores/userStore'
=======
import { removeBudgetBookById } from '@/api/budgetBook/budgetBookService'
>>>>>>> be06887 (월별 필터 추가)

const route = useRoute()
const router = useRouter()
const id = route.params.id
const budgetStore = useBudgetStore()
const userStore = useUserStore()

userStore.getLoggedUser()

// action은 구조분해할당 안됨.
const { transactionsDetail } = storeToRefs(budgetStore)

const goBack = () => {
  router.push('/budgetList')
}
<<<<<<< HEAD
const editDetail = () => {
  router.push(`/updateBudgetDetail/${id}`)
}
const deleteDetail = () => {
  // 삭제 메소드
}
=======

const deleteTransAction = async (id) => {
  if (window.confirm('정말 삭제하시겠습니까?')) {
    try {
      await removeBudgetBookById(id)
      router.push('/budgetList')
      budgetStore.fetchTransactions()
    } catch (e) {
      console.log('[ERROR]', e)
    }
  }
}

>>>>>>> be06887 (월별 필터 추가)
onMounted(() => {
  budgetStore.fetchTransactionDetail(id)
})
</script>
