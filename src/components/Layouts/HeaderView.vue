<template>
  <header class="bg-blue-600 text-white py-4">
    <div class="container">
      <div class="row">
        <div class="text-2xl col-md-8" style="color: black"><h2 @click="">2팀</h2></div>
        <div class="col-md-4 d-flex justify-content-end">
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

          <template v-else>
            <button @click="logOut" class="bg-white text-black px-4 py-2 rounded">로그아웃</button>
          </template>
        </div>
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

const logOut = () => {
  localStorage.removeItem('loggedUser')
  isLoggedIn.value = false
  window.location.href = '/login'
}
</script>

<style scoped></style>
