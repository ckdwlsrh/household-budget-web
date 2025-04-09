<template>
  <div>
    <Header></Header>
    <Nav></Nav>
    <RouterView></RouterView>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from '@/components/Layouts/HeaderView.vue'
import Footer from './components/Layouts/FooterView.vue'
import Nav from './components/Layouts/NavView.vue'

import { RouterView } from 'vue-router'
</script>

<style scoped></style>
