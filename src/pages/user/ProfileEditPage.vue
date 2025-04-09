<template>
  <div class="container mt-5 big-container">
    <div v-if="userStore.loggedUser" class="card shadow p-5 big-card">
      <h1 class="mb-4 fw-bold">내 정보</h1>
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
            {{ showPassword ? '숨기기' : '보기' }}
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
      </div>
    </div>

    <div v-else class="alert alert-warning text-center mt-5 fs-4 p-4">
      로그인된 유저 정보가 없습니다. 다시 로그인 해주세요.
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref, computed } from 'vue'

const userStore = useUserStore()

const editingPassword = ref(false)
const newPassword = ref('')
const showPassword = ref(false)

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
</style>
