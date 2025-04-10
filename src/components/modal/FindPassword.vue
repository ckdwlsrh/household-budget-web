<template>
  <div v-show="props.showModal" class="modal fade" tabindex="-1" aria-hidden="true" ref="modalEl">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">비밀번호 찾기</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body p-4">
          <div class="input-group mb-4">
            <span class="input-group-text">
              <i class="fa-regular fa-user"></i>
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="이름을 입력해 주세요"
              v-model="searchName"
              @keyup.enter="searchPassword"
              required
            />
          </div>
          <div class="input-group mb-4">
            <span class="input-group-text">
              <i class="fa-regular fa-envelope"></i>
            </span>
            <input
              type="email"
              class="form-control"
              placeholder="이메일을 입력해 주세요"
              v-model="searchEmail"
              @keyup.enter="searchPassword"
              required
            />
          </div>
          <div v-if="result" class="text-center">{{ result }}</div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-info"
            @click="searchPassword"
            :class="{ disabled: isSearchReady }"
          >
            찾기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getUserByUsernameAndEmail } from '@/api/user/userService'
import { Modal } from 'bootstrap/dist/js/bootstrap.min'
import { computed, nextTick, ref, watch } from 'vue'

const props = defineProps(['showModal'])
const emits = defineEmits(['close'])

const searchName = ref('')
const searchEmail = ref('')
const result = ref('')
const modalEl = ref(null)
let modalInstance = null

watch(
  () => props.showModal,
  async (val) => {
    if (val) {
      await nextTick()
      if (modalEl.value) {
        modalInstance = new Modal(modalEl.value)
        modalInstance.show()
      }
    }
  },
)

const isSearchReady = computed(() => {
  if (searchName.value.length > 0 && searchEmail.value.length > 0) return false
  else return true
})

const searchPassword = async () => {
  try {
    const findUser = await getUserByUsernameAndEmail(searchName.value, searchEmail.value)

    if (findUser) {
      result.value = '비밀번호 : ' + findUser[0].password
    }
  } catch (error) {
    result.value = '사용자를 찾을 수 없습니다. (이름, 이메일 확인)'
    console.error('에러 발생:', error)
  }
}

const closeModal = () => {
  if (modalInstance) {
    modalInstance.hide()
  }
  searchEmail.value = ''
  searchName.value = ''
  result.value = ''
  emits('close')
}
</script>
