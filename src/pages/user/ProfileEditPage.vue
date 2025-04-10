<template>
  <div class="container mt-5 big-container">
    <div v-if="userStore.loggedUser" class="card shadow p-5 big-card">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="fw-bold mb-0">내 정보</h1>
        <img class="userImg" src="../../assets/img/user.png" />
      </div>
      <hr />
      <div class="mb-4">
        <h2>{{ userStore.loggedUser.username }}님, 안녕하세요 👋</h2>
      </div>

      <div class="mb-3">
        <p class="mb-3 fs-5"><strong>이메일:</strong> {{ userStore.loggedUser.email }}</p>
        <label class="form-label fs-5"><strong>비밀번호</strong></label>
        <div v-if="!editingPassword" class="d-flex align-items-center gap-3 fs-5">
          <span>{{ showPassword ? userStore.loggedUser.password : hidePassword }}</span>
          <button class="btn btn-outline-secondary btn-lg" @click="toggleViewPassword">
            <i class="fa" :class="!showPassword ? 'fa-eye' : 'fa-eye-slash'"></i>
          </button>
          <button class="btn btn-outline-primary btn-lg" @click="editingPassword = true">
            수정
          </button>
        </div>

        <div v-else class="d-flex flex-column gap-3 mt-3">
          <input
            type="password"
            class="form-control form-control-lg"
            v-model="newPassword"
            placeholder="새 비밀번호 입력"
          />
          <div class="d-flex gap-3">
            <button class="btn btn-success btn-lg" @click="savePassword">저장</button>
            <button class="btn btn-secondary btn-lg" @click="cancelEdit">취소</button>
          </div>
        </div>

        <p class="text-end mt-4 fs-6">
          <small>
            ❌ 더 이상 서비스를 이용하지 않으시나요?
            <button type="button" class="btn btn-link p-0" @click="openModal">회원탈퇴</button>
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
                <h3 class="modal-title" id="removeUserLabel">회원탈퇴</h3>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  @click="closeModal"
                ></button>
              </div>
              <div class="modal-body">
                <h5 class="fw-normal">정말로 회원을 탈퇴하시겠습니까?</h5>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" @click="withdraw">예</button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  @click="closeModal"
                >
                  아니요
                </button>
              </div>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
    </div>

    <div v-else class="alert alert-warning text-center mt-5 fs-4 p-4">
      로그인된 유저 정보가 없습니다. 다시 로그인 해주세요.
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { Modal } from 'bootstrap/dist/js/bootstrap.min'
import { onMounted, ref, computed, nextTick } from 'vue'

const userStore = useUserStore()

const editingPassword = ref(false)
const newPassword = ref('')
const showPassword = ref(false)
const showModal = ref(false)
const modalEl = ref(null)
let modalInstance = null

const hidePassword = computed(() => '*'.repeat(userStore.loggedUser?.password?.length || 0))

const toggleViewPassword = () => {
  showPassword.value = !showPassword.value
}

const savePassword = async () => {
  if (!newPassword.value) {
    alert('새 비밀번호를 입력해주세요.')
    return
  }

  const success = await userStore.changePassword(newPassword.value)

  if (success) {
    alert('비밀번호 변경 완료')
    editingPassword.value = false
    newPassword.value = ''
    showPassword.value = false
  } else {
    alert('비밀번호 변경 실패')
  }
}

const cancelEdit = () => {
  newPassword.value = ''
  editingPassword.value = false
}

onMounted(() => {
  userStore.getLoggedUser()
})

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
}

const withdraw = async () => {
  const result = await userStore.withdrawHandler()
  if (result) closeModal()
}
</script>

<style scoped>
.big-container {
  font-size: 1.5rem;
}

.big-card {
  max-width: 800px;
  margin: auto;
  font-size: inherit;
}

.userImg {
  width: 100px;
  height: 100px;
  border: 3px solid black;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
</style>
