<template>
  <tr @click="emit('handlerDetail', props.transactions.id)">
    <td :class="transactionColor">
      {{ transactions.transactionType === 'income' ? '수입' : '지출' }}
    </td>
    <td>{{ transactions.category }}</td>
    <td>{{ transactions.amount.toLocaleString() }} 원</td>
    <td>{{ transactions.createdDate }}</td>
    <td>{{ transactions.memo }}</td>
    <td>{{ transactions.updatedDate }}</td>
  </tr>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  transactions: {
    type: Object,
  },
})
const transactionColor = computed(() => {
  if (props.transactions.transactionType === 'income') return 'text-success'
  else return 'text-danger'
})
const emit = defineEmits(['handlerDetail'])
</script>
