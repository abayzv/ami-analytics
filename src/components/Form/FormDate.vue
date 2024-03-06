<script setup>
import { onMounted, ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
    modelValue: Date | Array,
    range: Boolean,
    open: Boolean,
})

const humanizeDate = (date) => {
    // format to "Sun, 01 Mar"
    return new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    })
}

const formatDate = (date) => {
    if (!props.range) {
        return humanizeDate(new Date(date))
    } else {
        if (humanizeDate(date[0]) === humanizeDate(date[1])) return humanizeDate(date[0])
        return humanizeDate(date[0]) + ' - ' + humanizeDate(date[1])
    }
}

const emit = defineEmits(['update:modelValue'])

const updateValue = (data) => {
    emit('update:modelValue', data)
}

const dateValue = ref(props.modelValue)
const datepicker = ref(null)

onMounted(() => {
    if (props.open) {
        datepicker.value.openMenu()
    }
})
</script>

<template>
    <VueDatePicker ref="datepicker" v-model="dateValue" :range="props.range" :format="formatDate" @update:modelValue="updateValue" :max-date="new Date()" />
</template>