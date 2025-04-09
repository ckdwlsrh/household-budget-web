<template>
  <header class="bg-blue-600 text-white py-4">
    <div class="container">
      <div class="row">
        <div class="text-2xl col-md-8" style="color: black"><h2 @click="">2팀</h2></div>
        <div class="col-md-4 d-flex justify-content-end">
          <template v-if="userStore.isLoggedIn">
            <button @click="logOut()" class="bg-white text-black px-4 py-2 rounded">
              로그아웃
            </button>
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
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

onMounted(() => {
  const storedUser = userStore.getLoggedUser
  if (storedUser) {
    userStore.isLoggedIn = true
  }
})

const logOut = () => {
  userStore.isLoggedIn = false
  userStore.logoutHandler()
}
</script>

<style scoped></style>
