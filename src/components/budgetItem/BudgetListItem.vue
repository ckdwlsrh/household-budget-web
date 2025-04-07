<template>
  <tr @click="emit('handlrDetail', props.transactions.id)">
    <td>{{ transactions.transactionType }}</td>
    <td>{{ transactions.category }}</td>
    <td>{{ transactions.amount }}</td>
    <td>{{ transactions.createdDate }}</td>
    <td>{{ transactions.memo }}</td>
    <td>{{ transactions.updatedDate }}</td>
  </tr>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  transactions: {
    type: Object,
  },
})

const emit = defineEmits(['handlrDetail'])
</script>
