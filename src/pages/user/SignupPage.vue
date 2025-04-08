<template>
  <div class="container d-flex justify-content-center align-items-center full-height">
    <div class="col-md-5 mx-auto">
      <div class="myform">
        <div class="mb-3">
          <div class="col-md-12 text-center">
            <h1>SignUp</h1>
          </div>
        </div>
        <div class="form-group">
          <label>이름</label>
          <input
            type="text"
            class="form-control"
            placeholder="name"
            v-model="name"
            @keyup.enter="signupHandler"
            required
          />
        </div>
        <div class="form-group">
          <label>이메일</label>
          <input
            type="email"
            class="form-control"
            placeholder="e-mail"
            v-model="email"
            @keyup.enter="signupHandler"
            required
          />
        </div>
        <div class="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            class="form-control"
            placeholder="password"
            v-model="password"
            @keyup.enter="signupHandler"
            required
          />
        </div>
        <div class="form-group">
          <label>비밀번호 확인</label>
          <input
            type="password"
            class="form-control"
            placeholder="password"
            v-model="checkPassword"
            @keyup.enter="signupHandler"
            required
          />
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" v-model="agree" />
          <label> 개인정보 이용에 동의합니다. </label>
        </div>
        <br />
        <div class="col-md-12 text-center">
          <button
            type="submit"
            class="btn btn-block mybtn btn-primary tx-tfm"
            @click.prevent="goToLogin"
          >
            뒤로가기
          </button>
        </div>
        <div class="col-md-12">
          <div class="signup-or">
            <hr class="hr-or" />
            <span class="span-or">or</span>
          </div>
        </div>
        <div class="form-group">
          <p class="text-center">
            <button class="btn btn-block mybtn btn-primary tx-tfm" @click="signupHandler">
              가입하기
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="container d-flex justify-content-center align-items-center full-height">
    <div class="col-md-5 mx-auto">
      <div class="myform">
        <div class="mb-3">
          <div class="col-md-12 text-center">
            <h1>SignUp</h1>
          </div>
        </div>
        <div class="form-group">
          <label>이름</label>
          <input
            type="text"
            class="form-control"
            placeholder="name"
            v-model="name"
            @keyup.enter="signupHandler"
            required
          />
        </div>
        <div class="form-group">
          <label>이메일</label>
          <input
            type="email"
            class="form-control"
            placeholder="e-mail"
            v-model="email"
            @keyup.enter="signupHandler"
            required
          />
        </div>
        <div class="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            class="form-control"
            placeholder="password"
            v-model="password"
            @keyup.enter="signupHandler"
            required
          />
        </div>
        <div class="form-group">
          <label>비밀번호 확인</label>
          <input
            type="password"
            class="form-control"
            placeholder="password"
            v-model="checkPassword"
            @keyup.enter="signupHandler"
            required
          />
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" v-model="agree" />
          <label> 개인정보 이용에 동의합니다. </label>
        </div>
        <br />
        <div class="col-md-12 text-center">
          <button
            type="submit"
            class="btn btn-block mybtn btn-primary tx-tfm"
            @click.prevent="goToLogin"
          >
            뒤로가기
          </button>
        </div>
        <div class="col-md-12">
          <div class="signup-or">
            <hr class="hr-or" />
            <span class="span-or">or</span>
          </div>
        </div>
        <div class="form-group">
          <p class="text-center">
            <button class="btn btn-block mybtn btn-primary tx-tfm" @click="signupHandler">
              가입하기
            </button>
          </p>
        </div>
      </div>
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
    console.error('오류 발생: ', error)
  }
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

.signup-or {
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

.form-check {
  margin-top: 1rem;
}
</style>
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

.signup-or {
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

.form-check {
  margin-top: 1rem;
}
</style>
