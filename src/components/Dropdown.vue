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
        <Button @click="state.isOpen = !state.isOpen" class="w-full flex justify-center items-center gap-5">
            <slot name="title" />
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M13.418 7.859a.695.695 0 0 1 .978 0a.68.68 0 0 1 0 .969l-3.908 3.83a.697.697 0 0 1-.979 0l-3.908-3.83a.68.68 0 0 1 0-.969a.695.695 0 0 1 .978 0L10 11z"/></svg>
        </Button>
        <div v-if="state.isOpen" class="absolute z-10 w-48 py-2 mt-2 bg-white rounded-md shadow-lg">
            <slot />
        </div>
    </div>
</template>