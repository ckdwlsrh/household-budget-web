<template>
  <div class="container d-flex justify-content-center align-items-center full-height">
    <div class="col-md-5 mx-auto">
      <div class="myform">
        <div class="mb-3">
          <div class="col-md-12 text-center">
            <h1>Login</h1>
          </div>
        </div>
        <div class="form-group">
          <label for="exmapleEmail">Email</label>
          <input
            type="email"
            class="form-control"
            placeholder="e-mail"
            v-model="email"
            @keyup.enter="loginHandler"
            required
          />
        </div>
        <div class="form-group">
          <label for="examplePasswod">Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="password"
            v-model="password"
            @keyup.enter="loginHandler"
            required
          />
        </div>
        <br />
        <div class="col-md-12 text-center">
          <button
            type="submit"
            class="btn btn-block mybtn btn-primary tx-tfm"
            @click.prevent="loginHandler"
          >
            로그인
          </button>
        </div>
        <div class="col-md-12">
          <div class="login-or">
            <hr class="hr-or" />
            <span class="span-or">or</span>
          </div>
        </div>
        <div class="form-group">
          <p class="text-center">
            <button class="btn btn-block mybtn btn-primary tx-tfm" @click="goToSignUp">
              회원가입
            </button>
          </p>
        </div>
      </div>
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
    if (!isValidEmail(email.value)) {
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

<style scoped>
a {
  text-decoration: none !important;
}

.full-height {
  height: 100vh;
}

.myform {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  width: 100%;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 1.1rem;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tx-tfm {
  text-transform: uppercase;
}

.mybtn {
  border-radius: 50px;
}

.login-or {
  position: relative;
  color: #aaa;
  margin: 10px 0;
  padding: 10px 0;
}

.span-or {
  display: block;
  position: absolute;
  left: 50%;
  top: -2px;
  margin-left: -25px;
  background-color: #fff;
  width: 50px;
  text-align: center;
}

.hr-or {
  height: 1px;
  margin: 0 !important;
}
</style>
