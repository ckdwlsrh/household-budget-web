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
            placeholder="username"
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
            placeholder="e-mail"
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
            placeholder="password"
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
            placeholder="password"
            v-model="userStore.checkPassword"
            @keyup.enter="userStore.signupHandler"
            required
          />
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" v-model="userStore.agree" />
          <label> 개인정보 이용에 동의합니다. </label>
        </div>
        <br />
        <div class="col-md-12 text-center">
          <button
            type="submit"
            class="btn btn-block mybtn btn-primary tx-tfm"
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
            <button class="btn btn-block mybtn btn-primary tx-tfm" @click="userStore.signupHandler">
              가입하기
            </button>
          </p>
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
