<template>
  <div>
    <Header v-if="userId"></Header>
    <Nav v-if="userId"></Nav>
    <RouterView></RouterView>
    <Footer v-if="userId"></Footer>
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

<style>
@font-face {
  font-family: 'OnGleafKonkont';
  src: url('@/assets/fonts/온글잎콘콘체.ttf') format('truetype');
}

div {
  font-family: 'OnGleafKonkont', sans-serif;
}
</style>
