<template>
  <header class="container-fluid p-5" style="background-color: #fcfae9; color: black">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center gap-1">
        <img src="../../assets/img/money.png" width="50" height="50" />
        <span class="h2 fw-bold text-shadow mb-0">머니 매니저</span>
      </div>
      <button @click="logOut" class="btn btn-outline-dark">로그아웃</button>
    </div>
  </header>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const logOut = () => {
  userStore.logoutHandler()
}
</script>
