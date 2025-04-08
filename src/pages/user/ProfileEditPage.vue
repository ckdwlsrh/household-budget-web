<template>
  <div class="container">
    <div v-if="userStore.loggedUser">
      <div>
        <h1>내 정보</h1>
      </div>
      <hr />
      <div>{{ userStore.loggedUser.username }} 님</div>
      <div>이메일 : {{ userStore.loggedUser.email }}</div>
      <div>
        <div v-if="!editingPassword">
          비밀번호 : {{ showPassword ? userStore.loggedUser.password : hidePassword }}
          <button @click="toggleViewPassword">
            {{ showPassword ? '숨기기' : '보기' }}
          </button>
          <button @click="editingPassword = true">수정</button>
        </div>
        <div v-else>
          비밀번호 변경:
          <input type="password" v-model="newPassword" placeholder="새 비밀번호 입력" />
          <button @click="savePassword">저장</button>
          <button @click="cancelEdit">취소</button>
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
