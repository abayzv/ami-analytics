<script setup>
import { reactive } from 'vue';
import Card from './components/Card.vue';
import LayoutDefault from './layouts/Default.vue'
import ChartInfo from './components/ChartInfo.vue';
import TopBar from './components/TopBar.vue';

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

const keyVisitor = ['Page', 'Visitors']
const dataVisitor = [
    {
        page: '/dashboard',
        visitors: 1000,
    },
    {
        page: '/about',
        visitors: 300,
    },
    {
        page: '/contact',
        visitors: 500,
    },
    {
        page: '/blog',
        visitors: 200,
    },
    {
        page: '/pricing',
        visitors: 100,
    },
    {
        page: '/faq',
        visitors: 50,
    },
    {
        page: '/support',
        visitors: 300,
    },
    {
        page: '/login',
        visitors: 100,
    },
    {
        page: '/signup',
        visitors: 50,
    },
    {
        page: '/terms',
        visitors: 200,
    },
]

const keyDevices = ['Devices', 'Visitors']
const dataDevices = [
    {
        devices: 'Chrome',
        visitors: 1000,
    },
    {
        devices: 'Safari',
        visitors: 300,
    },
    {
        devices: 'Firefox',
        visitors: 500,
    },
    {
        devices: 'Edge',
        visitors: 200,
    },
    {
        devices: 'Opera',
        visitors: 100,
    },
    {
        devices: 'IE',
        visitors: 50,
    },
    {
        devices: 'Other',
        visitors: 300,
    },
]
</script>

<template>
  <LayoutDefault>
    <div class="py-10">
      <Card>
        <ChartInfo />
        <apexchart width="100%" height="500" type="line" :options="state.chartOptions" :series="state.series"></apexchart>
      </Card>

      <div class="flex gap-5 mt-5">
        <TopBar title="Top Page" :column="keyVisitor" :data="dataVisitor" />
        <TopBar title="Devices" :column="keyDevices" :data="dataDevices" :percentage="true" />
      </div>
    </div>
  </LayoutDefault>
</template>
