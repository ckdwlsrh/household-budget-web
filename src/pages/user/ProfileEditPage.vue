<template>
  <div class="container">
    <div v-if="userStore.loggedUser">
      <div>
        <p class="fs-1">내 정보</p>
      </div>
      <hr />
      <div>
        <p class="fs-2">{{ userStore.loggedUser.username }}님, 안녕하세요</p>
        <p class="fs-4">이메일 : {{ userStore.loggedUser.email }}</p>
        <div>
          <div v-if="!editingPassword">
            <p class="fs-4">
              비밀번호 : {{ showPassword ? userStore.loggedUser.password : hidePassword }}
              <button @click="toggleViewPassword">
                {{ showPassword ? '숨기기' : '보기' }}
              </button>
              <button @click="editingPassword = true">수정</button>
            </p>
          </div>
          <div v-else>
            <p class="fs-4">
              비밀번호 변경:
              <input type="password" v-model="newPassword" placeholder="새 비밀번호 입력" />
              <button @click="savePassword">저장</button>
              <button @click="cancelEdit">취소</button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>로그인된 유저 정보가 없습니다. 다시 로그인 해주세요.</p>
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
<style scoped></style>
