<template>
  <div class="container">
    <div style="padding: 30px; margin-top: 30px">
      <h1 style="text-align: center">공지사항</h1>
    </div>
    <!--  -->
    <div>
      <div v-for="notice in notices" :key="notice.id">
        {{ notice.title }}
      </div>
    </div>
    <!--  -->
    <div>
      <button>작성하기</button>
    </div>
  </div>
</template>

<script setup>
import { getNotices } from '@/api/notices/noticeService'
import { onMounted, ref } from 'vue'

const notices = ref([])

const featchNotices = async () => {
  try {
    const data = await getNotices()
    notices.value = data
  } catch (error) {
    console.error('에러발생: ', error)
  }
}

onMounted(() => {
  featchNotices()
})
</script>
