<script setup>
import { reactive } from 'vue';


const state = reactive({
    info: [
        {
            name: 'Unique Visitors',
            value: '1,200',
            lastValue: '-1'
        },
        {
            name: 'Total Visitors',
            value: '2,000',
            lastValue: '2'
        },
        {
            name: 'Bounce Rate',
            value: '60%',
            lastValue: '5'
        },
        {
            name: 'Page Views',
            value: '5,000',
            lastValue: '-14'
        }
    ]
})
</script>

<template>
    <div class="flex gap-5 mb-5">
        <div v-for="(item, index) in state.info" class="border-neutral-200 px-5" :class="{
            'border-r': index === 0,
            'border-l': index !== 0 && index !== 1
        }">
            <div class="text-neutral-400">{{ item.name }}</div>
            <div class="flex justify-between">
                <div class="font-bold text-xl">{{ item.value }}</div>
                <div class="flex items-center gap-1 text-sm" :class="{
                    'text-green-500': item.lastValue > 0,
                    'text-red-500': item.lastValue < 0
                }">
                    {{ item.lastValue > 0 ? '+' : '' }}{{ item.lastValue }}%
                </div>
            </div>
        </div>
    </div>
</template>