<template>
  <div>
    <div id="dual_line_chart" style="width: 650px; height: 400px"></div>
    <div v-if="chartData.length === 0" class="text-center text-gray-400 mt-2">
      표시할 데이터가 없습니다.
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue'

const props = defineProps({
  income: Array,
  expense: Array,
})

// 날짜 기준으로 합쳐진 데이터 생성
const chartData = computed(() => {
  const incomeMap = {}
  const expenseMap = {}

  const formatDate = (isoString) => isoString.split('T')[0]

  props.income.forEach((item) => {
    const date = formatDate(item.createdDate)
    incomeMap[date] = (incomeMap[date] || 0) + Number(item.amount)
  })

  props.expense.forEach((item) => {
    const date = formatDate(item.createdDate)
    expenseMap[date] = (expenseMap[date] || 0) + Number(item.amount)
  })

  const dates = Array.from(new Set([...Object.keys(incomeMap), ...Object.keys(expenseMap)])).sort()

  return dates.map((date) => [date, incomeMap[date] || 0, expenseMap[date] || 0])
})

// 구글 차트 로딩 및 그리기
const drawChart = () => {
  const dataArray =
    chartData.value.length === 0
      ? [['2025-01-01', 0, 0]] // 데이터 없을 때 빈 그래프용 기본 값
      : chartData.value

  const data = window.google.visualization.arrayToDataTable([
    ['날짜', '수익', '지출'],
    ...dataArray,
  ])

  const options = {
    title: '수익 vs 지출 (일자별)',
    hAxis: { title: '날짜' },
    vAxis: { title: '금액' },
    curveType: 'function',
    legend: { position: 'bottom' },
    pointSize: 5,
  }

  const chart = new window.google.visualization.LineChart(
    document.getElementById('dual_line_chart'),
  )
  chart.draw(data, options)
}

// 구글 차트 라이브러리 로드
const loadGoogleChart = () => {
  if (!window.google || !window.google.charts) {
    const script = document.createElement('script')
    script.src = 'https://www.gstatic.com/charts/loader.js'
    script.onload = () => {
      window.google.charts.load('current', { packages: ['corechart'] })
      window.google.charts.setOnLoadCallback(drawChart)
    }
    document.head.appendChild(script)
  } else {
    window.google.charts.load('current', { packages: ['corechart'] })
    window.google.charts.setOnLoadCallback(drawChart)
  }
}

onMounted(loadGoogleChart)
watch(chartData, () => {
  if (window.google && window.google.visualization) {
    drawChart()
  }
})
</script>
