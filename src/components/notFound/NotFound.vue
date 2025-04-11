<template>
  <div class="not-found">
    <h1>404 - 페이지를 찾을 수 없습니다.</h1>
    <p>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
    <router-link to="/">홈으로 돌아가기</router-link>
  </div>
</template>

<script setup></script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}

.not-found h1 {
  font-size: 2.5rem;
  color: #ff4d4f;
}

.not-found p {
  font-size: 1.2rem;
}

.not-found a {
  text-decoration: none;
  color: #007bff;
}
</style>
