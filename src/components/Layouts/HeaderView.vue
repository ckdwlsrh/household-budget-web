<template>
  <header class="container-fluid p-5" style="background-color: #6c5ce7; color: white">
    <div class="d-flex justify-content-between">
      <span class="h2 fw-bold text-shadow">머니 매니저</span>
      <button v-if="userStore.isLoggedIn" @click="logOut" class="btn btn-outline-light text-end">
        로그아웃
      </button>
    </div>
  </header>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.checkLoggedUser()
})

const logOut = () => {
  userStore.logoutHandler()
}
</script>
