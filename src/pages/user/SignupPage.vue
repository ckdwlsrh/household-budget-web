<template>
  <div class="page-wrapper">
    <div class="container d-flex justify-content-center align-items-center full-height">
      <img src="../../assets/img/kb.png" class="kbImg" />
      <div class="col-md-5 mx-auto">
        <div class="myform">
          <div class="mb-3">
            <div class="col-md-12 text-center">
              <h1>회원가입</h1>
            </div>
          </div>
          <div class="form-group">
            <label>이름</label>
            <input
              type="text"
              class="form-control"
              placeholder="이름을 입력해주세요"
              v-model="userStore.username"
              @keyup.enter="userStore.signupHandler"
              required
            />
          </div>
          <div class="form-group">
            <label>이메일</label>
            <input
              type="email"
              class="form-control"
              placeholder="이메일을 입력해주세요"
              v-model="userStore.email"
              @keyup.enter="userStore.signupHandler"
              required
            />
          </div>
          <div class="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              class="form-control"
              placeholder="비밀번호를 입력해주세요"
              v-model="userStore.password"
              @keyup.enter="userStore.signupHandler"
              required
            />
          </div>
          <div class="form-group">
            <label>비밀번호 확인</label>
            <input
              type="password"
              class="form-control"
              placeholder="확인 비밀번호를 입력해주세요"
              v-model="userStore.checkPassword"
              @keyup.enter="userStore.signupHandler"
              required
            />
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" v-model="userStore.agree" />
            <label> 개인정보 이용에 동의합니다. </label>
          </div>

          <div class="col-md-12 text-center mt-1">
            <button
              type="submit"
              class="btn btn-block mybtn btn-outline-dark tx-tfm"
              @click.prevent="userStore.goToLogin"
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
              <button
                class="btn btn-block mybtn btn-outline-dark tx-tfm"
                @click="userStore.signupHandler"
              >
                가입하기
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<style scoped>
.page-wrapper {
  background-color: #faf8e7;
}

.container {
  background-color: #faf8e7;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}
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
  padding: 0.2rem 1rem;
  font-weight: 500;
  border-width: 1px;
  transition: all 0.3s ease;
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

label {
  font-weight: 500;
  margin-bottom: 0.3rem;
  display: inline-block;
  color: #333;
  font-size: 16px;
}

.form-control {
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  padding: 0.75rem 1rem;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
  font-size: 1rem;
  color: #333;
  margin-bottom: 1rem;
  font-size: 15px;
}

.form-control::placeholder {
  color: #aaa;
}

.form-control:focus {
  outline: none;
  border-color: #ffb300;
  box-shadow: 0 0 0 3px rgba(255, 179, 0, 0.25);
  background-color: #fff;
}

.kbImg {
  height: 150px;
  width: auto;
  margin-bottom: 2rem;
  margin-right: 1.5rem;
}
</style>
