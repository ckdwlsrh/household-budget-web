<template>
  <div class="container d-flex justify-content-center align-items-center full-height">
      <img src="../../assets/img/kb.png" class="kbImg" />
    <div class="col-md-5 mx-auto">
      <div class="myform">
        <div class="mb-3">
          <div class="col-md-12 text-center h3 fw-bold">머니 매니저 로그인</div>
        </div>
        <div class="input-group input-group-lg mb-3">
          <span class="input-group-text">
            <i class="fa-regular fa-envelope"></i>
          </span>
          <input
            type="email"
            class="form-control"
            placeholder="이메일을 입력해 주세요"
            v-model="userStore.email"
            @keyup.enter="userStore.loginHandler"
            required
          />
        </div>
        <div class="input-group input-group-lg">
          <span class="input-group-text"><i class="fa-solid fa-lock"></i> </span>
          <input
            type="password"
            class="form-control"
            placeholder="비밀번호를 입력해 주세요"
            v-model="userStore.password"
            @keyup.enter="userStore.loginHandler"
            required
          />
        </div>
        <br />
        <div class="col-md-12 text-center">
          <button
            type="submit"
            class="btn btn-block mybtn btn-dark fw-bold"
            @click.prevent="userStore.loginHandler"
            :class="{ disabled: isLoginReady }"
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
            <button class="btn btn-block mybtn btn-primary fw-bold" @click="userStore.goToSignUp">
              회원가입
              </button>
            </p>
          </div>
        </div>
        <p class="text-end mt-4 fs-6">
          <small>
            <span class="text-secondary me-1">비밀번호를 까먹으셨나요?</span>
            <button type="button" class="btn btn-link btn-sm" @click="openModal">
              비밀번호 찾기
            </button>
          </small>
        </p>

        <!-- 모달 -->
        <FindPassword :showModal="showModal" @close="closeModal"></FindPassword>
        <!--  -->

      </div>
    </div>
  </div>
</template>

<script setup>
import FindPassword from '@/components/modal/FindPassword.vue'
import { useUserStore } from '@/stores/userStore'
import { computed, ref } from 'vue'

const showModal = ref(false)

const userStore = useUserStore()
//로그인 버튼 disabled확인
const isLoginReady = computed(() => {
  if (userStore.password.length > 0 && userStore.email.length > 0) return false
  else return true
})

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>

<style scoped>
.page-wrapper {
  background-color: #fcfae9;
}
.container {
  background-color: #fcfae9;
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

.mybtn {
  border-radius: 50px;
  padding: 0.2rem 1rem;
  font-weight: 500;
  border-width: 1px;
  transition: all 0.3s ease;
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
