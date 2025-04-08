<template>
  <nav class="bg-gray-800 text-white">
    <div class="container mx-auto py-2">
      <ul class="flex space-x-4">
        <RouterLink to="/home">대시보드</RouterLink>
        <RouterLink to="/profileEdit">내 정보</RouterLink>
        <RouterLink to="/budgetList">거래 내역</RouterLink>
        <RouterLink to="/#">월별 재정</RouterLink>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped></style>
