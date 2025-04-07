<template>
  <div>
    <h3>LOGINPAGE</h3>
    <div>
      <input type="email" placeholder="e-mail" v-model="email" required />
      <input type="password" placeholder="password" v-model="password" required />
      <button @click="loginHandler">로그인</button>
      <button @click="goToSignUp">회원가입</button>
    </div>
  </div>
</template>

<script setup>
import { ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const email = ref('')
const password = ref('')
const users = ref([])

const getUsers = async () => {
  try {
    const response = await axios.get('/api/user')
    users.value = response.data
  } catch (error) {
    console.error('오류 발생', error)
  }
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const loginHandler = async () => {
  try {
    if (!isValidEmail(email)) {
      alert('이메일 형식 틀림')
      return
    }
    await getUsers()

    const existUser = users.value.find(
      (user) => user.email === email.value && user.password === password.value,
    )

    if (existUser) {
      console.log('로그인 성공,', toRaw(existUser))
      router.push('/home')
    } else {
      alert('이메일 또는 비밀번호가 일치하지 않습니다.')
    }
  } catch (error) {
    console.error('오류 발생: ', error)
  }
}

const goToSignUp = () => {
  router.push('/signup')
}
</script>

<style scoped></style>
