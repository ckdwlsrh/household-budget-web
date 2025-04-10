<template>
  <div class="page-wrapper">
    <div class="container d-flex justify-content-center align-items-center full-height">
      <img src="../../assets/img/kb.png" class="kbImg" />
      <div class="col-md-5 mx-auto">
        <div class="myform">
          <div class="mb-3">
            <div class="col-md-12 text-center">
              <h1>로그인</h1>
            </div>
          </div>
          <div class="form-group">
            <label>이메일</label>
            <input
              type="email"
              class="form-control"
              placeholder="이메일을 입력해주세요"
              v-model="userStore.email"
              @keyup.enter="userStore.loginHandler"
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
              @keyup.enter="userStore.loginHandler"
              required
            />
          </div>
          <div class="col-md-12 text-center mt-2">
            <button
              type="submit"
              class="btn btn-block mybtn btn-outline-dark tx-tfm"
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
              <button
                class="btn btn-block mybtn btn-outline-dark tx-tfm"
                @click="userStore.goToSignUp"
              >
                회원가입
              </button>
            </p>
          </div>
          <p class="text-end mt-3 fs-6">
            <small>
              비밀번호를 까먹으셨나요?
              <button type="button" class="btn btn-link p-0" @click="openModal">
                비밀번호 찾기
              </button>
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
