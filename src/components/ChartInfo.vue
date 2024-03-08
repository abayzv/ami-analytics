<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const props = defineProps({
    stats: Object,
    previousPeriod: Object
})

const snakeToTitle = (str) => {
    return str
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
    });
};

const compareRangeDate = computed(() => {
    return formatDate(props.previousPeriod[0]) + " - " + formatDate(props.previousPeriod[1]);
});

const rangeDate = computed(() => {
    return formatDate(route.query.from) + " - " + formatDate(route.query.to);
});

</script>

<template>
    <div class="lg:flex gap-5 mb-5 hidden">
        <div v-for="(item, index) in Object.keys(props.stats)" class="border-neutral-200 px-5" :class="{
            'border-r': index === 0,
            'border-l': index !== 0 && index !== 1,
        }">
            <div class="text-neutral-400 cursor-pointer hover:text-blue-500"
                @click="router.push({query: {metric: item}})">
                {{ snakeToTitle(item) }}
            </div>
            <div class="flex justify-between">
                <div class="font-bold text-xl">{{ props.stats[item].value }}</div>
                <div v-if="!route.query.comparison" class="flex items-center gap-1 text-sm" :class="{
                    'text-green-500': props.stats[item].changePercent > 0,
                    'text-red-500': props.stats[item].changePercent < 0,
                }">
                    <svg v-if="props.stats[item].changePercent > 0" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569z"/></svg>            
                    <span class="text-neutral-600">{{ props.stats[item].changePercent }}%</span>
                </div>
            </div>
            <div v-if="route.query.comparison" class="text-sm">
                {{ rangeDate }}
            </div>
        </div>
    </div>
    <div v-if="route.query.comparison" class="flex gap-5 mb-5">
        <div v-for="(item, index) in Object.keys(props.stats)" class="border-neutral-200 px-5" :class="{
            'border-r': index === 0,
            'border-l': index !== 0 && index !== 1,
        }">
            <div class="text-neutral-400 cursor-pointer hover:text-blue-500"
                @click="router.push({query: {metric: item}})">
                {{ snakeToTitle(item) }}
            </div>
            <div class="flex justify-between text-neutral-300">
                <div class="font-bold text-xl">{{ props.stats[item].previous }}</div>
                <div v-if="!route.query.comparison" class="flex items-center gap-1 text-sm" :class="{
                    'text-green-500': props.stats[item].changePercent > 0,
                    'text-red-500': props.stats[item].changePercent < 0,
                }">
                    <svg v-if="props.stats[item].changePercent > 0" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569z"/></svg>            
                    <span class="text-neutral-600">{{ props.stats[item].changePercent }}%</span>
                </div>
            </div>
            <div class="text-neutral-400 text-sm">{{ compareRangeDate }}</div>
        </div>
    </div>
</template>
