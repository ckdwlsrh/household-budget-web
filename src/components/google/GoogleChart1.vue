<template>
  <div>
    <h3>수익 및 지출 차트</h3>
    <div id="chart" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  income: {
    type: Array,
    required: true,
  },
  expense: {
    type: Array,
    required: true,
  },
})

const drawChart = () => {
  const data = google.visualization.arrayToDataTable([
    ['항목', '금액'],
    ...props.income.map((item) => [item.category, Number(item.amount)]),
    ...props.expense.map((item) => [item.category, -Number(item.amount)]), // 지출은 음수로 표시
  ])

  const options = {
    title: '수익과 지출',
    pieHole: 0.4,
    is3D: true,
    slices: {
      0: { offset: 0.1 },
      1: { offset: 0.1 },
    },
  }

  const chart = new google.visualization.PieChart(document.getElementById('chart'))
  chart.draw(data, options)
}

onMounted(() => {
  // Google Charts 라이브러리 로드
  const script = document.createElement('script')
  script.src = 'https://www.gstatic.com/charts/loader.js'
  script.onload = () => {
    google.charts.load('current', { packages: ['corechart'] })
    google.charts.setOnLoadCallback(drawChart)
  }
  document.head.appendChild(script)
})
</script>

<style scoped>
/* 필요에 따라 스타일 추가 */
</style>
