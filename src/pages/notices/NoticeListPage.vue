<template>
  <div class="container">
    <div style="padding: 30px; margin-top: 30px">
      <h1 style="text-align: center">공지사항</h1>
    </div>
    <!--  -->
    <table class="notice-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>내용</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(notice, index) in notices" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ notice.title }}</td>
          <td>{{ notice.desc }}</td>
          <td>{{ notice.createdDate.split('T')[0] }}</td>
        </tr>
      </tbody>
    </table>
    <!--  -->

    <div style="display: flex; justify-content: flex-end; margin-top: 20px">
      <button class="btn btn-outline-dark" @click="goToAddNotice">추가하기</button>
    </div>
  </div>
</template>

<script setup>
import { getNotices } from '@/api/notices/noticeService'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
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

const goToAddNotice = () => {
  router.push('/addNotice')
}
</script>

<style scopede>
.notice-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 18px;
  margin-top: 30px;
}

.notice-table th,
.notice-table td {
  border: 1px solid #ccc;
  padding: 16px;
  text-align: center;
}

.notice-table th {
  background-color: #f5f5f5;
}
</style>
