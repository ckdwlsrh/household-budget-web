<template>
  <div class="container">
    <div style="padding: 30px; margin-top: 30px">
      <h1 style="text-align: center">공지 사항</h1>
    </div>
    <!--  -->
    <table class="notice-table table table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>제목</th>
          <th>내용</th>
          <th>작성일</th>
          <th v-if="userStore.loggedUser.role === 'admin'">삭제하기</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(notice, index) in notices"
          :key="index"
          @click="openModal(notice)"
          style="cursor: pointer"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <span>{{ notice.title }}</span>
            <span v-if="isNew(notice.createdDate)" class="badge rounded-pill new-badge">new</span>
          </td>
          <td>{{ notice.desc }}</td>
          <td>{{ notice.createdDate.split('T')[0] }}</td>
          <td v-if="userStore.loggedUser.role === 'admin'">
            <button class="btn btn-outline-dark" @click.stop="deleteNotice(notice.id)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!--  -->

    <!--  -->
    <div
      v-if="showModal"
      class="modal fade"
      id="noticeDetail"
      tabindex="-1"
      aria-hidden="true"
      ref="modalEl"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        style="max-width: 800px"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="noticeDetail">{{ selectedNotice.title }}</h3>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body fs-5" style="max-height: 500px; overflow-y: auto">
            {{ selectedNotice.desc }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" @click="closeModal">닫기</button>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div
      v-if="userStore.loggedUser.role === 'admin'"
      style="display: flex; justify-content: flex-end; margin-top: 20px"
    >
      <button class="btn btn-outline-dark" @click="goToAddNotice">추가하기</button>
    </div>
  </div>
</template>

<script setup>
import { getNotices, removeNotices } from '@/api/notices/noticeService'
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Modal } from 'bootstrap/dist/js/bootstrap.min'

const router = useRouter()
const userStore = useUserStore()
const showModal = ref(false)
const modalEl = ref(null)
let modalInstance = null

const notices = ref([])
const selectedNotice = ref(null)

const isNew = (createdDate) => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const created = new Date(createdDate)
  const createdDay = new Date(created.getFullYear(), created.getMonth(), created.getDate())

  const day = 24 * 60 * 60 * 1000
  return today - createdDay < 4 * day
}

const fetchNotices = async () => {
  try {
    const data = await getNotices({ _sort: 'createdDate', _order: 'desc' })
    notices.value = data
  } catch (error) {
    console.error('에러발생: ', error)
  }
}

const deleteNotice = async (id) => {
  try {
    await removeNotices(id)
    fetchNotices()
  } catch (error) {
    console.error('에러발생: ', error)
  }
}

const openModal = async (notice) => {
  selectedNotice.value = notice
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
}

onMounted(() => {
  userStore.getLoggedUser()
  fetchNotices()
})

const goToAddNotice = () => {
  router.push('/addNotice')
}
</script>

<style scoped>
.notice-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 18px;
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 12px;
  overflow: hidden;
}

.notice-table th {
  background-color: #f5f5f5;
  padding: 16px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}

.notice-table td {
  padding: 16px;
  text-align: center;
  border-bottom: 1px solid #eee;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notice-table td:nth-child(2) {
  max-width: 200px;
}

.notice-table td:nth-child(3) {
  max-width: 300px;
}

.notice-table tr:last-child td {
  border-bottom: none;
}

.notice-table thead tr:first-child th:first-child {
  border-top-left-radius: 12px;
}

.notice-table thead tr:first-child th:last-child {
  border-top-right-radius: 12px;
}

.notice-table tbody tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
}

.notice-table tbody tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
}

.new-badge {
  margin-left: 8px;
  background-color: red;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}
</style>
