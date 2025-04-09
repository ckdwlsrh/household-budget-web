<template>
  <nav class="bg-gray-800 text-white" v-if="userStore.isLoggedIn">
    <div class="container">
      <div class="row">
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
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

onMounted(() => {
  const storedUser = userStore.getLoggedUser
  if (!storedUser) {
    userStore.isLoggedIn = false
  } else {
    userStore.isLoggedIn = true
  }
})
</script>

<style scoped>
.nav-link:hover {
  border-color: #ffcc00;
}
.custom-border {
  border: 2px solid #dddddd;
  border-radius: 0.25rem;
}

/* 모바일 */
@media (max-width: 576px) {
  .nav {
    flex-direction: column;
    align-items: center;
  }
}

/* 태블릿  */
@media (min-width: 576px) and (max-width: 768px) {
  .nav {
    flex-direction: row;
    justify-content: space-around;
  }
}

/* 노트북  */
@media (min-width: 768px) {
  .nav {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
