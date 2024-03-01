<script setup>
import { ref } from 'vue'

const activeTab = ref(0)

defineProps({
    title: String,
    tabs: Array,
})

</script>

<template>
    <div class="flex items-center justify-between">
        <h1 class="text-lg font-semibold text-gray-800 mb-2">{{ title }}</h1>
        <div class="flex items-center gap-2">
            <div v-for="(item, index) in tabs">
                <button :key="index" @click="activeTab = index" :class="{
                    'bg-primary-500 text-red-500': activeTab === index,
                    'text-neutral-500': activeTab !== index,
                }" class="rounded-md">{{ item }}</button>
            </div>
        </div>
    </div>

    <div class="mt-2">
        <slot :name="tabs[activeTab]" />
    </div>
</template>