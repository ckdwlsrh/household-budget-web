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
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            placeholder="e-mail"
            v-model="userStore.email"
            @keyup.enter="userStore.loginHandler"
            required
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="password"
            v-model="userStore.password"
            @keyup.enter="userStore.loginHandler"
            required
          />
        </div>
        <br />
        <div class="col-md-12 text-center">
          <button
            type="submit"
            class="btn btn-block mybtn btn-primary tx-tfm"
            @click.prevent="userStore.loginHandler"
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
            <button class="btn btn-block mybtn btn-primary tx-tfm" @click="userStore.goToSignUp">
              회원가입
            </button>
          </p>
        </div>
        <p class="text-end mt-4 fs-6">
          <small>
            비밀번호를 까먹으셨나요?
            <button type="button" class="btn btn-link p-0" @click="openModal">비밀번호 찾기</button>
          </small>
        </p>

        <!-- 모달 -->
        <div
          v-if="showModal"
          class="modal fade"
          id="removeUser"
          tabindex="-1"
          aria-hidden="true"
          ref="modalEl"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h3 class="modal-title" id="removeUserLabel">비밀번호 찾기</h3>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  @click="closeModal"
                ></button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="username"
                    v-model="searchName"
                    @keyup.enter="searchPassword"
                    required
                  />
                </div>

                <br />
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="e-mail"
                    v-model="searchEmail"
                    @keyup.enter="searchPassword"
                    required
                  />
                </div>
                <br />
                <div>비밀번호: {{ result }}</div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" @click="searchPassword">찾기</button>
              </div>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { getUserByUsernameAndEmail } from '@/api/user/userService'
import { useUserStore } from '@/stores/userStore'
import { Modal } from 'bootstrap/dist/js/bootstrap.min'
import { nextTick, ref } from 'vue'

const showModal = ref(false)
const modalEl = ref(null)
let modalInstance = null
const searchName = ref('')
const searchEmail = ref('')
const result = ref('')

const userStore = useUserStore()

const openModal = async () => {
  showModal.value = true
  await nextTick()

  if (modalEl.value) {
    modalInstance = new Modal(modalEl.value)
    modalInstance.show()
  }
}

const closeModal = () => {
  if (modalInstance) {
    modalInstance.hide()
  }
  showModal.value = false
  showModal.value = false
  searchName.value = ''
  searchEmail.value = ''
  result.value = ''
}

const searchPassword = async () => {
  try {
    const findUser = await getUserByUsernameAndEmail(searchName.value, searchEmail.value)

    if (findUser) {
      result.value = findUser[0].password
    }
  } catch (error) {
    result.value = '사용자를 찾을 수 없습니다. (이름, 이메일 확인)'
    console.error('에러 발생:', error)
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
