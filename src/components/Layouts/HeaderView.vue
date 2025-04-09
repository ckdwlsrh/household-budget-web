<template>
  <header class="bg-blue-600 text-white py-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl" style="color: black">2팀</h1>
      <div>
        <template v-if="!isLoggedIn">
          <RouterLink :to="{ name: 'loginPage' }">
            <button class="bg-white text-blue-600 px-4 py-2 rounded mr-2 hover:bg-gray-200">
              로그인
            </button>
          </RouterLink>
          <RouterLink :to="{ name: 'signupPage' }">
            <button class="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">
              회원가입
            </button>
          </RouterLink>
        </template>
      </div>
    </div>
  </header>
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

<style scoped></style>
