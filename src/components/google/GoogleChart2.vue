<template>
  <div>
    <div id="net_profit_chart" style="width: 650px; height: 400px"></div>
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

const chartData = computed(() => {
  const incomeMap = {}
  const expenseMap = {}

  const formatDate = (isoString) => isoString.split('T')[0]

  props.income.forEach((item) => {
    const date = formatDate(item.updatedDate)
    incomeMap[date] = (incomeMap[date] || 0) + Number(item.amount)
  })

  props.expense.forEach((item) => {
    const date = formatDate(item.updatedDate)
    expenseMap[date] = (expenseMap[date] || 0) + Number(item.amount)
  })

  const dates = Array.from(new Set([...Object.keys(incomeMap), ...Object.keys(expenseMap)])).sort()

  let cumulative = 0
  return dates.map((date) => {
    const income = incomeMap[date] || 0
    const expense = expenseMap[date] || 0
    cumulative += income - expense
    return [date, cumulative]
  })
})

const drawChart = () => {
  const hasData = chartData.value.length > 0
  const dataArray = hasData ? chartData.value : [['-', 0]]

  const data = window.google.visualization.arrayToDataTable([['날짜', '누적 순이익'], ...dataArray])

  const options = {
    title: '누적 순이익 (일자별)',
    hAxis: { title: '날짜' },
    vAxis: {
      title: '금액',
      baseline: 0,
    },
    curveType: 'function',
    legend: { position: 'bottom' },
    pointSize: 5,
    colors: ['#28a745'],
  }

  const chart = new window.google.visualization.LineChart(
    document.getElementById('net_profit_chart'),
  )
  chart.draw(data, options)
}

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
