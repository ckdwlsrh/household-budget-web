<template>
  <div>
    <h3>SIGNUPPAGE</h3>
    <div>
      <input type="text" placeholder="name" v-model="name" required />
      <input type="email" placeholder="email" v-model="email" required />
      <input type="password" placeholder="password" v-model="password" required />
      <input type="password" placeholder="password" v-model="checkPassword" required />
      <br />
      <input type="checkbox" v-model="agree" required />개인 정보 사용 동의
      <br />
      <button @click="goToLogin">뒤로가기</button>
      <button @click="signupHandler">회원가입</button>
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
const checkPassword = ref('')
const agree = ref(false)
const users = ref([])

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const getUsers = async () => {
  try {
    const response = await axios.get('/api/user')
    users.value = response.data
  } catch (error) {
    console.error('오류 발생', error)
  }
}

const goToLogin = () => {
  router.push('/login')
}

const signupHandler = async () => {
  try {
    if (!isValidEmail(email.value)) {
      alert('이메일 형식 틀림')
      return
    }

    if (password.value !== checkPassword.value) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    if (!agree.value) {
      alert('개인 정보 사용에 동의해주세요.')
    }

    await getUsers()
    const emailExist = users.value.find((user) => user.email === email.value)

    if (emailExist) {
      alert('이미 사용 중인 이메일입니다.')
      return
    }

    await axios.post('/api/user', {
      name: name.value,
      email: email.value,
      password: password.value,
      role: 'user',
    })

    alert('회원가입이 완료되었습니다.')
    router.push('/login')
  } catch (error) {
    console.error('오류 발생: ', error)
  }
}
</script>

<style scoped></style>
