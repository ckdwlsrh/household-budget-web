import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const username = ref('')
  const email = ref('')
  const password = ref('')
  const users = ref([])
  const router = useRouter()
  const checkPassword = ref('')
  const agree = ref(false)
  const loggedUser = ref(null)

  // 유저 전체 조회
  const getUsers = async () => {
    try {
      const response = await axios.get('/api/user')
      users.value = response.data
    } catch (error) {
      console.error('유저 조회 오류', error)
    }
  }

  // email 정규식 검증
  const isValidEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(emailValue)
  }

  // 로그인 핸들러
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
        localStorage.setItem('loggedUser', JSON.stringify(toRaw(existUser)))
        router.push('/home')
      } else {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.')
      }
    } catch (error) {
      console.error('로그인 오류:', error)
    }
  }

  // 회원가입 핸들러
  const signupHandler = async () => {
    try {
      if (!username.value || !email.value || !password.value || !checkPassword.value) {
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
        username: username.value,
        email: email.value,
        password: password.value,
        role: 'user',
      })

      username.value = ''
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

  // 현재 로그인된 회원 정보를 LocalStorage에서 추출
  const getLoggedUser = () => {
    const storedUser = localStorage.getItem('loggedUser')
    if (storedUser) {
      loggedUser.value = JSON.parse(storedUser)
    } else {
      alert('로그인을 해주세요')
    }
  }

  // 비밀번호 변경 메서드
  const changePassword = async (newPassword) => {
    if (!loggedUser.value) {
      alert('로그인이 필요합니다.')
      return
    }

    const newVal = {
      ...loggedUser.value,
      password: newPassword,
    }

    try {
      await axios.put(`/api/user/${loggedUser.value.id}`, newVal)
      loggedUser.value.password = newPassword
      localStorage.setItem('loggedUser', JSON.stringify(loggedUser.value))
      return true
    } catch (error) {
      console.error('에러 발생: ', error)
      return false
    }
  }

  // 로그아웃 핸들러
  const logoutHandler = () => {
    localStorage.removeItem('loggedUser')
    loggedUser.value = null
    router.push('/login')
  }

  // LoginPage로 이동
  const goToLogin = () => {
    router.push('/login')
  }

  // SignupPage로 이동
  const goToSignUp = () => {
    router.push('/signup')
  }

  return {
    username,
    email,
    password,
    checkPassword,
    agree,
    users,
    loggedUser,

    isValidEmail,
    getUsers,
    loginHandler,
    signupHandler,
    goToLogin,
    goToSignUp,
    getLoggedUser,
    changePassword,
    logoutHandler,
  }
})
