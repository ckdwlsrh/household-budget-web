<template>
  <nav class="bg-gray-800 text-white">
    <div class="container">
      <div class="row">
        <template v-if="isLoggedIn">
          <ul class="nav nav-pills nav-justified">
            <div class="nav-item">
              <RouterLink
                :to="{ name: 'homePage' }"
                class="btn btn-link nav-link text-black custom-border"
                >대시보드</RouterLink
              >
            </div>
            <div class="nav-item">
              <RouterLink
                :to="{ name: 'profileEditPage' }"
                class="btn btn-link nav-link text-black custom-border"
                >내 정보</RouterLink
              >
            </div>
            <div class="nav-item">
              <RouterLink
                :to="{ name: 'budgetListPage' }"
                class="btn btn-link nav-link text-black custom-border"
                >거래 내역</RouterLink
              >
            </div>
            <div class="nav-item">
              <RouterLink
                :to="{ name: 'homePage' }"
                class="btn btn-link nav-link text-black custom-border"
                >월별 재정</RouterLink
              >
            </div>
          </ul>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import { ref } from 'vue'

const isLoggedIn = ref(false)

onMounted(() => {
  const storedUser = localStorage.getItem('loggedUser')
  if (storedUser) {
    isLoggedIn.value = true
  }
})
</script>

<style scoped>
.nav-link:hover {
  border-color: #ffcc00;
}
.custom-border {
  border: 2px solid #dddddd; /* 원하는 색상으로 변경 */
  border-radius: 0.25rem; /* 테두리 둥글기 조정 */
}
</style>
