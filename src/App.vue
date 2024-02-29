<script setup>
import { reactive } from 'vue';
import Card from './components/Card.vue';
import LayoutDefault from './layouts/Default.vue'
import ChartInfo from './components/ChartInfo.vue';

const state = reactive({
  series: [{
    name: 'series-1',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  }],
  chartOptions: {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    }
  }
})
</script>

<template>
  <LayoutDefault>
    <div class="py-10">
      <Card>
        <ChartInfo />
        <apexchart width="100%" height="500" type="line" :options="state.chartOptions" :series="state.series"></apexchart>
      </Card>
    </div>
  </LayoutDefault>
</template>
