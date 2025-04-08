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

<script setup></script>
<style scoped></style>
