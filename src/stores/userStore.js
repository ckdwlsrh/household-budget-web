import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const email = ref('')
  const password = ref('')
  const users = ref([])
  const router = useRouter()

  const getUsers = async () => {
    try {
      const response = await axios.get('/api/user')
      users.value = response.data
    } catch (error) {
      console.error('유저 조회 오류', error)
    }
  }

  const isValidEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(emailValue)
  }

  const loginHandler = async () => {
    try {
      if (!isValidEmail(email.value)) {
        alert('이메일 형식이 올바르지 않습니다.')
        return
      }

      await getUsers()

      const existUser = users.value.find(
        (user) => user.email === email.value && user.password === password.value,
      )

      if (existUser) {
        console.log('로그인 성공:', toRaw(existUser))
        router.push('/home')
      } else {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.')
      }
    } catch (error) {
      console.error('로그인 오류:', error)
    }
  }

  const goToSignUp = () => {
    router.push('/signup')
  }

  return {
    email,
    password,
    loginHandler,
    goToSignUp,
  }
})
