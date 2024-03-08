<script setup>
import { onMounted, ref, watch } from 'vue';
import Button from './Button.vue';
import Dropdown from './Dropdown.vue';
import Select from './Select.vue';
import { useRouter, useRoute } from 'vue-router';
import FormDate from './Form/FormDate.vue';

const router = useRouter();
const route = useRoute();
const options = [
    {
        value: 'day',
        label: 'Today'
    },
    {
        value: '7d',
        label: 'Last 7 days'
    },
    {
        value: '30d',
        label: 'Last 30 days'
    },
    {
        value: '1m',
        label: 'Last Month'
    },
    {
        value: 'custom',
        label: 'Custom'
    },
    {
        value: 'compare',
        label: 'Compare'
    }
]
const comparisonOptions = [
    {
        value: 'previous_period',
        label: 'Previous Period'
    },
    {
        value: 'custom_range',
        label: 'Custom Range'
    }
]

const filter = ref(route.query.period || 'day');
const comparison = ref('previous_period');
const date = ref([new Date(route.query.from || new Date().toISOString().split("T")[0]), new Date(route.query.to || new Date().toISOString().split("T")[0])]);
const compareDate = ref([new Date(route.query.compare_from || new Date().toISOString().split("T")[0]), new Date(route.query.compare_to || new Date().toISOString().split("T")[0])]);
const openMenu = ref(false);

const prevDate = () => {
    const yesterday = new Date(route.query.date || new Date().toISOString().split("T")[0]);
    yesterday.setDate(yesterday.getDate() - 1);
    router.push({ query: { date: yesterday.toISOString().split("T")[0] } });
}

const nextDate = () => {
    const tomorrow = new Date(route.query.date || new Date().toISOString().split("T")[0]);
    tomorrow.setDate(tomorrow.getDate() + 1);
    router.push({ query: { date: tomorrow.toISOString().split("T")[0] } });
}

const onClose = () => {
    comparison.value = 'previous_period';
}

watch(filter, (value) => {
    if (value == 'custom') {
        openMenu.value = true;
    }

    if (value == 'compare') {
        return router.push({ query: { ...route.query, comparison: comparison.value, from: date.value[0].toISOString().split("T")[0], to: date.value[1].toISOString().split("T")[0] } });
    }

    router.push({ query: { period: value } });
})

watch(date, (value) => {
    if (route.query.comparison) {
        return router.push({ query: { comparison: route.query.comparison, from: value[0].toISOString().split("T")[0], to: value[1].toISOString().split("T")[0] } })
    }

    router.push({ query: { period: 'custom', from: value[0].toISOString().split("T")[0], to: value[1].toISOString().split("T")[0] } });
})

watch(comparison, (value) => {
    if (value == 'custom_range') {
        return router.push({ query: { ...route.query, comparison: value, compare_from: compareDate.value[0].toISOString().split("T")[0], compare_to: compareDate.value[1].toISOString().split("T")[0] } });
    }

    const { compare_from, compare_to, ...query } = route.query;
    router.push({ query: { ...query, comparison: value } });
})

watch(compareDate, (value) => {
    router.push({ query: { ...route.query, compare_from: value[0].toISOString().split("T")[0], compare_to: value[1].toISOString().split("T")[0] } });
})

onMounted(() => {
    if (route.query.comparison) {
        filter.value = 'compare';
    }

    if (route.query.compare_from || route.query.compare_to) {
        comparison.value = 'custom_range';
    }
})
</script>

<template>
    <div class="flex items-center gap-5">
        <!-- <div>
            <Dropdown>
                <template #title>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5"/></svg>
                Search
                </template>
<div>
    <button>Most recent</button>
    <button>Oldest</button>
</div>
</Dropdown>
</div> -->
        <div class="flex items-center gap-2" v-if="filter === 'day'">
            <Button @click="prevDate">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
                    <path fill="currentColor" fill-rule="evenodd"
                        d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0"
                        clip-rule="evenodd" />
                </svg>
            </Button>
            <Button @click="nextDate">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
                    <path fill="currentColor" fill-rule="evenodd"
                        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10L8.22 6.28a.75.75 0 0 1 0-1.06"
                        clip-rule="evenodd" />
                </svg>
            </Button>
        </div>
        <div>
            <!-- <Dropdown class="w-36">
                <template #title>
                    Sort By
                </template>
                <div>
                    <button>Most recent</button>
                    <button>Oldest</button>
                </div>
            </Dropdown> -->
            <Select :options="options" v-model="filter" />
        </div>
        <div v-if="filter == 'custom'">
            <FormDate range v-model="date" :open="openMenu" />
        </div>
        <div v-if="filter == 'compare'" class="flex items-center gap-2">
            <div class="w-1/2">
                <FormDate range v-model="date" :open="openMenu" />
            </div>
            <span>vs.</span>
            <Select v-if="comparison === 'previous_period'" :options="comparisonOptions" v-model="comparison" />

            <template v-else>
                <div class="w-1/2">
                    <FormDate range v-model="compareDate" :open="openMenu" />
                </div>
                <Button @click="onClose">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"/><path stroke-linecap="round" d="M29.657 18.343L18.343 29.657m0-11.314l11.314 11.314"/></g></svg>
                </Button>
            </template>
        </div>
    </div>
</template>