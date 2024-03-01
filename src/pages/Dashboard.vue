<script setup>
import { computed, reactive, onMounted } from 'vue';
import Card from './../components/Card.vue';
import LayoutDefault from './../layouts/Default.vue'
import ChartInfo from './../components/ChartInfo.vue';
import TopBar from './../components/TopBar.vue';
import GeoVisitor from './../components/GeoVisitor.vue';
import Tab from './../components/Tab.vue';
import { useRoute } from 'vue-router';

const route = useRoute()

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
  },
  visitorTabs: ["All"],
  keyVisitor: ['Page', 'Visitors'],
  dataVisitor: [
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
  ],
  deviceTabs: ["All"],
  keyDevices: ['Devices', 'Visitors'],
  dataDevices: [
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
  ],
  locationTabs: ["Map", "Countries"],
  geoLocation: [
      {
          name: 'Afghanistan',
          value: 1000,
      },
      {
          name: 'Albania',
          value: 300,
      },
      {
          name: 'Algeria',
          value: 500,
      },
      {
          name: 'Andorra',
          value: 200,
      },
      {
          name: 'Indonesia',
          value: 1000,
      },
      {
          name: 'Malaysia',
          value: 300,
      },
      {
          name: 'Singapore',
          value: 500,
      },
      {
          name: 'Thailand',
          value: 200,
      },
      {
          name: 'Russia',
          value: 1000,
      }
  ],
  keyLocation: ["Country", "Visitors"],
})

const dataLocation = computed(() => {
  return state.geoLocation.map((item) => {
    return {
      country: item.name,
      visitors: item.value
    }
  })
})

onMounted(() => {
  console.log(route.query)
})
</script>

<template>
  <LayoutDefault>
    <div class="py-10">
      <div class="flex gap-5">
        <Card class="flex-1">
          <ChartInfo />
          <apexchart height="450" type="line" :options="state.chartOptions" :series="state.series">
          </apexchart>
        </Card>
        <Card>
          <Tab title="Location" :tabs="state.locationTabs">
            <template #Map>
              <GeoVisitor :data="state.geoLocation" />
            </template>
            <template #Countries>
              <TopBar class="w-[550px] h-[500px]" :column="state.keyLocation" :data="dataLocation" />
            </template>
          </Tab>
        </Card>
      </div>
      
      <div class="flex gap-5 mt-5">
        <Card class="w-full">
          <Tab title="Top Pages" :tabs="state.visitorTabs">
            <template #All>
              <TopBar :column="state.keyVisitor" :data="state.dataVisitor" />
            </template>
          </Tab>
        </Card>
        <Card class="w-full">
          <Tab title="Devices" :tabs="state.deviceTabs">
            <template #All>
              <TopBar :column="state.keyDevices" :data="state.dataDevices" />
            </template>
          </Tab>
        </Card>
      </div>
    </div>
  </LayoutDefault>
</template>
