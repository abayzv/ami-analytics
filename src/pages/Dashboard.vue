<script setup>
import { computed, reactive, onMounted, watch } from "vue";
import Card from "./../components/Card.vue";
import LayoutDefault from "./../layouts/Default.vue";
import ChartInfo from "./../components/ChartInfo.vue";
import TopBar from "./../components/TopBar.vue";
import GeoVisitor from "./../components/GeoVisitor.vue";
import Tab from "./../components/Tab.vue";
import { api } from "../utils/api";
import { useRoute } from "vue-router";

const route = useRoute();
const { id } = route.params;

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
};

// format date to "Sun, 01 Mar"
const formatDate2 = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

const state = reactive({
  series: [],
  chartOptions: {
    chart: {
      height: 350,
      type: "area",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      type: "categort",
      labels: {
        show: true,
        formatter: function(value) {
          return formatDate(value);
        },
        trim: false,
        rotate: 0,
        minHeight: 40,
        hideOverlappingLabels: true,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
      y: {
        formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
          return formatDate2(w.config.series[seriesIndex].data[dataPointIndex].x) + " : " + value + " " + getMetricValue(state.metric);
        },
        title: {
          formatter: function(seriesName) {
            return "";
          },
        }
      },
    },
  },
  topStats: [],
  visitorTabs: ["All"],
  keyVisitor: ["Page", "Visitors"],
  dataVisitor: [
    {
      page: "/dashboard",
      visitors: 1000,
    },
    {
      page: "/about",
      visitors: 300,
    },
    {
      page: "/contact",
      visitors: 500,
    },
    {
      page: "/blog",
      visitors: 200,
    },
    {
      page: "/pricing",
      visitors: 100,
    },
    {
      page: "/faq",
      visitors: 50,
    },
    {
      page: "/support",
      visitors: 300,
    },
    {
      page: "/login",
      visitors: 100,
    },
    {
      page: "/terms",
      visitors: 200,
    },
  ],
  locationTabs: ["Map"],
  geoLocation: [],
  location: {
    keyCountry: ["Country", "Visitors"],
    keyRegion: ["Region", "Visitors"],
    keyCity: ["City", "Visitors"],
    data: []
  },
  device: {
    keyBrowser: ["Browser", "Visitors"],
    keyOS: ["OS", "Visitors"],
    data: []
  },
  topPage: {
    keyPage: ["Page", "Visitors"],
    data: []
  },
  dataParams: {
    website_id: id,
    period: route.query.period || "custom",
    date: route.query.date || new Date().toISOString().split("T")[0],
    filters: "",
    comparison: "previous_period",
    compare_from: route.query.compare_from || "",
    compare_to: route.query.compare_to || "",
    from: route.query.from || new Date().toISOString().split("T")[0],
    to: route.query.to || new Date().toISOString().split("T")[0],
  },
  metric: "unique_visitor",
  locationMetric: "country",
  deviceMetric: "browser",
  topPageMetric: 'top-page',
  isLoading: {
    chart: true,
    location: true,
    device: true,
    topPage: true,
  },
  previousPeriod: []
});

const getMetricValue = (value) => {
  return value === "unique_visitor"
    ? "Visitor"
    : value === "total_visitor"
    ? "Visit"
    : value === "total_pageview"
    ? "Pageviews"
    : value === "visit_duration"
    ? "Visit Duration"
    : value === "view_pervisit"
    ? "View Per Visit"
    : "";
};

const convertDataToChart = (data) => {
  state.series = [
    {
      name: getMetricValue(state.metric),
      data: data.plot.map((item, index) => {
        return {
          x: data.labels[index],
          y: item,
        };
      }),
    },
  ];

  if (data.comparison_plot?.length > 0) {
    state.series.push({
      name: `Comparison`,
      data: data.comparison_plot.map((item, index) => {
        return {
          x: data.comparison_labels[index],
          y: item,
        };
      }),
    });
  }
};

const getData = async () => {
  state.isLoading.chart = true;
  try {
    const response = await api.post('/analytic-web/top-stats', state.dataParams).then((res) => {
      return res;
    });
    
    const { top_stats, compare_from, compare_to } = response.data.data;
    state.topStats = top_stats;
    state.previousPeriod = [compare_from, compare_to]
    setTimeout(() => {
      state.isLoading.chart = false;
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};

const getChart = async () => {
  state.isLoading.chart = true;
  const params = {
    ...state.dataParams,
    metric: state.metric,
    comparison: route.query.comparison ?  state.dataParams.comparison : "",
  };

  try {
    const response = await api.post('/analytic-web/top-stats-chart', params).then((res) => {
      return res;
    });

    convertDataToChart(response.data.data);
    setTimeout(() => {
      state.isLoading.chart = false;
    }, 1000);
  } catch (error) {
    state.isLoading.chart = false;
    console.log(error);
  }
};

const getLocation = async () => {
  state.isLoading.location = true;
  const { compare_from, compare_to, comparison, ...query } = state.dataParams;
  const params = {
    ...query,
    metric: state.locationMetric,
    limit: 10,
    page: 1,
  };
  try {
    const response = await api.post('/analytic-web/location', params).then((res) => {
      return res;
    });

    const {data} = response.data
    state.location.data = data.map((item) => {
      return {
        [state.locationMetric]: item[state.locationMetric || "country"],
        visitors: item.value,
      };
    });

    if (state.locationMetric === 'country') {
      state.geoLocation = data.map((item) => {
        return {
          name: item.country,
          value: item.value,
        };
      });
    }

    setTimeout(() => {
      state.isLoading.location = false;
    }, 1000);
  } catch (error) {
    state.isLoading.location = false;
    console.log(error);
  }
}

const getDevice = async () => {
  state.isLoading.device = true;
  const { compare_from, compare_to, comparison, ...query } = state.dataParams;
  const params = {
    ...query,
    metric: state.deviceMetric,
    limit: 10,
    page: 1,
  };
  try {
    const response = await api.post('/analytic-web/device', params).then((res) => {
      return res;
    });

    const {data} = response.data
    state.device.data = data.map((item) => {
      return {
        [state.deviceMetric]: item[state.deviceMetric || "browser"],
        visitors: item.value,
      };
    });
    setTimeout(() => {
      state.isLoading.device = false;
    }, 1000);
  } catch (error) {
    state.isLoading.device = false;
    console.log(error);
  }
}

const getTopPage = async () => {
  state.isLoading.topPage = true;
  const { compare_from, compare_to, comparison, ...query } = state.dataParams;
  const params = {
    ...query,
    metric: state.topPageMetric,
    limit: 10,
    page: 1,
  };
  try {
    const response = await api.post('/analytic-web/page', params).then((res) => {
      return res;
    });

    const {data} = response.data
    state.topPage.data = data.map((item) => {
      return {
        page: item[state.topPageMetric || "top-page"],
        visitors: item.value,
      };
    });
    setTimeout(() => {
      state.isLoading.topPage = false;
    }, 1000);
  } catch (error) {
    state.isLoading.topPage = false;
    console.log(error);
  }
}

const handleChangeLocationTab = (tab) => {
  switch (tab) {
    case "Countries":
      state.locationMetric = "country";
      getLocation();
      break;
    case "Regions":
      state.locationMetric = "region";
      getLocation();
      break;
    case "Cities":
      state.locationMetric = "city";
      getLocation();
      break;
  }
};  

const handleChangeDeviceTab = (tab) => {
  switch (tab) {
    case "Browser":
      state.deviceMetric = "browser";
      getDevice();
      break;
    case "OS":
      state.deviceMetric = "os";
      getDevice();
      break;
  }
};

onMounted(() => {
  if (route.query.date) {
    state.dataParams.period = "custom";
    state.dataParams.from = route.query.date;
    state.dataParams.to = route.query.date;
  } else if (route.query.period == "day" || route.query.period == "compare") {
    state.dataParams.period = "custom";
    state.dataParams.from = new Date().toISOString().split("T")[0];
    state.dataParams.to = new Date().toISOString().split("T")[0];
  }

  getData();
  getChart();
  getLocation();
  getDevice();
  getTopPage();
});

// watch route query
watch(
  () => route.query,
  (query) => {
    const { period, metric } = query;

    if (period == 'compare') {
      return;
    }
    
    if (period == "day") {
      state.dataParams = {
        ...state.dataParams,
        period: "custom",
        from: new Date().toISOString().split("T")[0],
        to: new Date().toISOString().split("T")[0],
      }
    } else {
      state.dataParams.period = period || state.dataParams.period;
      state.metric = metric || state.metric;
      state.dataParams.from = query.from || state.dataParams.from;
      state.dataParams.to = query.to || state.dataParams.to;
      state.dataParams.compare_from = query.compare_from || state.dataParams.compare_from;
      state.dataParams.compare_to = query.compare_to || state.dataParams.compare_to;
    }

    if (state.dataParams.date !== query.date) {
      state.dataParams.date = query.date || state.dataParams.date;
      state.dataParams.from = query.date || state.dataParams.from;
      state.dataParams.to = query.date || state.dataParams.to;
    }

    if (period !== "day" || period !== "custom") {
      state.dataParams.date = new Date().toISOString().split("T")[0];
    }

    getData();
    getChart();
    getLocation();
    getDevice();
    getTopPage();
  }
);
</script>

<template>
  <LayoutDefault>
    <div class="py-10">
      <Card class="flex-1">
        <template v-if="!state.isLoading.chart">
          <ChartInfo :stats="state.topStats" :previous-period="state.previousPeriod"/>
          <apexchart
            height="450"
            type="area"
            :options="state.chartOptions"
            :series="state.series"
          >
          </apexchart>
        </template>
        <template v-else>
          <div class="h-full w-full min-h-[450px] flex items-center justify-center">
            <img src="/src/assets/loading.svg" alt="loading" class="w-20 h-20"/>
          </div>
        </template>
      </Card>

      <div class="flex gap-5 mt-5 lg:flex-row flex-col">
        <Card class="w-full min-h-[500px]">
          <Tab title="Top Pages" :tabs="state.visitorTabs">
            <template #All>
              <template v-if="state.isLoading.topPage">
                <div class="h-full w-full flex items-center justify-center">
                  <img src="/src/assets/loading.svg" alt="loading" class="w-20 h-20"/>
                </div>
              </template>
              <TopBar v-else :column="state.topPage.keyPage" :data="state.topPage.data" />

              <!-- No Data -->
              <template v-if="state.topPage.data.length === 0">
                <div class="min-h-[400px] flex items-center justify-center">
                  <p class="text-gray-500">No data available</p>
                </div>
              </template>
            </template>
          </Tab>
        </Card>
        <Card class="w-full min-h-[500px]">
          <Tab title="Devices" :tabs="['Browser', 'OS']" @changeTab="handleChangeDeviceTab">
            <template #Browser>
              <template v-if="state.isLoading.device">
                <div class="h-full w-full flex items-center justify-center">
                  <img src="/src/assets/loading.svg" alt="loading" class="w-20 h-20"/>
                </div>
              </template>
              <TopBar v-else :column="state.device.keyBrowser" :data="state.device.data" />

              <!-- No Data -->
              <template v-if="state.device.data.length === 0">
                <div class="min-h-[400px] flex items-center justify-center">
                  <p class="text-gray-500">No data available</p>
                </div>
              </template>
            </template>
            <template #OS>
              <template v-if="state.isLoading.device">
                <div class="h-full w-full flex items-center justify-center">
                  <img src="/src/assets/loading.svg" alt="loading" class="w-20 h-20"/>
                </div>
              </template>
              <TopBar v-else :column="state.device.keyOS" :data="state.device.data" />
            </template>
          </Tab>
        </Card>
      </div>
      
      <div class="flex gap-5 mt-5 lg:flex-row flex-col">
        <Card class="w-full min-h-[500px]">
          <Tab title="Location" :tabs="['Map']">
            <template #Map>
              <template v-if="state.isLoading.location">
                <div class="h-full w-full flex items-center justify-center">
                  <img src="/src/assets/loading.svg" alt="loading" class="w-20 h-20"/>
                </div>
              </template>
              <GeoVisitor v-else :data="state.geoLocation || [{name: 'Indonesia', value: '0'}]" />
            </template>
          </Tab>
        </Card>
        <Card class="w-full min-h-[500px]">
          <Tab title="Location" :tabs="['Countries','Regions','Cities']" @changeTab="handleChangeLocationTab">
            <template #Countries>
              <template v-if="state.isLoading.location">
                <div class="h-full w-full flex items-center justify-center">
                  <img src="/src/assets/loading.svg" alt="loading" class="w-20 h-20"/>
                </div>
              </template>
              <TopBar v-else :column="state.location.keyCountry" :data="state.location.data" />

              <!-- No Data -->
              <template v-if="state.location.data.length === 0">
                <div class="min-h-[400px] flex items-center justify-center">
                  <p class="text-gray-500">No data available</p>
                </div>
              </template>
            </template>

            <template #Regions>
              <template v-if="state.isLoading.location">
                <div class="h-full w-full flex items-center justify-center">
                  <img src="/src/assets/loading.svg" alt="loading" class="w-20 h-20"/>
                </div>
              </template>
              <TopBar v-else :column="state.location.keyRegion" :data="state.location.data" />

              <!-- No Data -->
              <template v-if="state.location.data.length === 0">
                <div class="min-h-[400px] flex items-center justify-center">
                  <p class="text-gray-500">No data available</p>
                </div>
              </template>
            </template>

            <template #Cities>
              <template v-if="state.isLoading.location">
                <div class="h-full w-full flex items-center justify-center">
                  <img src="/src/assets/loading.svg" alt="loading" class="w-20 h-20"/>
                </div>
              </template>
              <TopBar v-else :column="state.location.keyCity" :data="state.location.data" />

              <!-- No Data -->
              <template v-if="state.location.data.length === 0">
                <div class="min-h-[400px] flex items-center justify-center">
                  <p class="text-gray-500">No data available</p>
                </div>
              </template>
            </template>
          </Tab>
        </Card>
      </div>
    </div>
  </LayoutDefault>
</template>
