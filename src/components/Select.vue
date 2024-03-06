<script setup>
defineProps({
    options: Array,
    modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

</script>

<template>
    <div v-auto-animate class="relative">
        <!-- Create Select Component -->
        <select class="w-full py-2 px-3 border border-neutral-200 rounded-md cursor-pointer" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
            <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.label }}</option>
        </select>
    </div>
</template>