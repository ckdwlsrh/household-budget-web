<template>
  <div>
    <Header></Header>
    <Nav></Nav>
    <router-view></router-view>
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
