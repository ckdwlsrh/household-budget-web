<template>
  <div>
    <Header v-if="userId"></Header>
    <Nav v-if="userId"></Nav>
    <RouterView></RouterView>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from '@/components/Layouts/HeaderView.vue'
import Footer from './components/Layouts/FooterView.vue'
import Nav from './components/Layouts/NavView.vue'

import { RouterView } from 'vue-router'
import { useUserStore } from './stores/userStore'
// import { onMounted, ref } from 'vue'
import { computed, onBeforeMount } from 'vue'

const userStore = useUserStore()

onBeforeMount(() => {
  userStore.getLoggedUser()
})

const userId = computed(() => userStore.loggedUser?.id)

// const userId = ref(null)
// onMounted(() => {
//   userStore.getLoggedUser()
//   userId.value = userStore.loggedUser.id
// })
</script>

<style scoped></style>
