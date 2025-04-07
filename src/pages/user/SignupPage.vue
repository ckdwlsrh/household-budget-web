<template>
  <div>
    <h3>SIGNUPPAGE</h3>
    <div>
      <input type="text" placeholder="name" />
      <input type="email" placeholder="email" />
      <input type="password" placeholder="password" />
      <input type="password" placeholder="password" />
      <button @click="goToLogin">뒤로가기</button>
      <button @click="goToLogin">회원가입</button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const users = ref([])
</script>

<style scoped></style>
