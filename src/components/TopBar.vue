<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
    title: String,
    column: Array,
    data: Array,
    percentage: Boolean,
})

const  route = useRoute()
const router = useRouter()

const totalData = computed(() => {
    return props.data.reduce((acc, cur) => acc + cur[props.column[1].toLowerCase()], 0)
})

const higherData = computed(() => {
    return props.data.reduce((acc, cur) => acc[props.column[1].toLowerCase()] > cur[props.column[1].toLowerCase()] ? acc : cur)
})

const getPercentage = (value) => {
    return (value / higherData.value.visitors) * 100
}

const getPercentageFromTotal = (value) => {
    return (value / totalData.value) * 100
}

const sortDatas = computed(() => {
    return props.data.sort((a, b) => b[props.column[1].toLowerCase()] - a[props.column[1].toLowerCase()])
})

const filterData = (data) => {
    router.push({ query: { ...route.query, [props.column[0].toLowerCase()] : data } })
}
</script>

<template>
    <div class="flex w-full gap-5 text-sm text-neutral-600">
        <div v-for="(item, indexKey) in column" :key="indexKey" :class="{
            'flex-1': indexKey === 0,
            'text-end': indexKey !== 0,
        }">
            <div class="font-medium text-neutral-400 mb-2">{{ item }}</div>
            <ul class="flex flex-col gap-2">
                <li v-for="(data, index) in sortDatas" :key="index" class="py-2 cursor-pointer" :class="{
                    'px-2 bg-neutral-100 rounded': indexKey === 0,
                }" :style="{
    width: indexKey === 0 ? `${getPercentage(data.visitors)}%` : 'auto'
}" @click="filterData(data[item.toLowerCase()])">
                    {{ data[item.toLowerCase()] }}
                </li>
            </ul>
        </div>
        <div v-if="percentage" class="text-end">
            <div class="font-medium text-neutral-400 mb-2">%</div>
            <ul class="flex flex-col gap-2">
                <li v-for="(data, index) in sortDatas" :key="index" class="py-2">
                    {{ getPercentageFromTotal(data.visitors).toFixed(2) }}
                </li>
            </ul>
        </div>
    </div>
</template>