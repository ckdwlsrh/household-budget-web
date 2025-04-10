<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3e6ec">
    <div class="container-fluid">
      <ul class="navbar-nav">
        <template v-if="userStore.isLoggedIn">
          <li class="nav-item me-3">
            <RouterLink :to="{ name: 'homePage' }" class="nav-link">
              <i class="fa-solid fa-chart-line me-2"></i>대시보드</RouterLink
            >
          </li>
          <li class="nav-item me-3">
            <RouterLink :to="{ name: 'profileEditPage' }" class="nav-link">
              <i class="fa-solid fa-user me-2"></i>내 정보</RouterLink
            >
          </li>
          <li class="nav-item me-3">
            <RouterLink :to="{ name: 'budgetListPage' }" class="nav-link"
              ><i class="fa-solid fa-money-bill-transfer me-2"></i>거래 내역</RouterLink
            >
          </li>
          <div class="nav-item me-3">
            <RouterLink :to="{ name: 'noticeList' }" class="nav-link">
              <i class="fa-solid fa-circle-exclamation me-2"></i>공지 사항</RouterLink
            >
            <!-- 라우팅 변경 해야됨 -->
          </div>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'
const userStore = useUserStore()

onMounted(() => {
  userStore.checkLoggedUser()
})
</script>

<style scoped>
.nav-link:hover {
  color: #6c5ce7;
  text-decoration: none;
}
</style>
