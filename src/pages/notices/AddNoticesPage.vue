<template>
  <div class="container">
    <div style="padding: 30px; margin-top: 30px">
      <h1 style="text-align: center">공지사항 작성</h1>
    </div>
    <div class="form-group">
      <label><p class="fs-3">제목</p></label>
      <input
        type="text"
        class="form-control"
        placeholder="제목을 입력해주세요"
        required
        v-model="title"
        style="height: 50px; font-size: 20px"
      />
    </div>
    <br />
    <div class="form-group">
      <label><p class="fs-3">내용</p></label>
      <textarea
        type="text"
        class="form-control"
        placeholder="내용을 입력해주세요"
        required
        v-model="desc"
        style="font-size: 20px"
      />
    </div>
    <div class="button-group">
      <button class="btn btn-outline-dark" @click="goToNoticesList">목록보기</button>
      <button class="btn btn-outline-dark" @click="addNotice">추가하기</button>
    </div>
  </div>
</template>

<script setup>
import { createNotices } from '@/api/notices/noticeService'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const title = ref('')
const desc = ref('')
const router = useRouter()

const addNotice = async () => {
  const koreaTime = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().split('T')[0]
  const newNotice = {
    title: title.value,
    desc: desc.value,
    createdDate: koreaTime,
  }
  try {
    await createNotices(newNotice)
    goToNoticesList()
  } catch (error) {
    console.error('공지사항 작성 에러: ', error)
  }
}

const goToNoticesList = () => {
  router.push('/noticeList')
}
</script>

<style scoped>
textarea {
  resize: none;
  height: 400px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
}
</style>
