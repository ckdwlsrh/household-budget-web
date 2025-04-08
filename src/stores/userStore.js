import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const users = ref([])
  const router = useRouter()
  const checkPassword = ref('')
  const agree = ref(false)

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
  const signupHandler = async () => {
    try {
      if (!name.value || !email.value || !password.value || !checkPassword.value) {
        alert('모든 항목을 입력해주세요.')
        return
      }

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
        return
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

      name.value = ''
      email.value = ''
      password.value = ''
      checkPassword.value = ''
      agree.value = false

      alert('회원가입이 완료되었습니다.')
      router.push('/login')
    } catch (error) {
      console.error('회원가입 오류: ', error)
    }
  }

  const goToLogin = () => {
    router.push('/login')
  }
  const goToSignUp = () => {
    router.push('/signup')
  }

  return {
    name,
    email,
    password,
    checkPassword,
    agree,
    users,

    isValidEmail,
    getUsers,
    loginHandler,
    signupHandler,
    goToLogin,
    goToSignUp,
  }
})
