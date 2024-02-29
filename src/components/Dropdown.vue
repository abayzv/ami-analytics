<script setup>
import { reactive } from 'vue';
import Button from './Button.vue';

defineProps({
    title: String,
})

const state = reactive({
    isOpen: false,
})
</script>

<template>
    <div v-auto-animate class="relative">
        <Button @click="state.isOpen = !state.isOpen" class="w-full flex justify-center items-center">
            <slot name="title" />
        </Button>
        <div v-if="state.isOpen" class="absolute z-10 w-48 py-2 mt-2 bg-white rounded-md shadow-lg">
            <slot />
        </div>
    </div>
</template>