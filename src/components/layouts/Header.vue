<script setup>
import Filter from '../Filter.vue'
</script>


<template>
    <header class="h-20 bg-white flex items-center">
        <nav class="container mx-auto flex justify-between">
            <!-- Logo -->
            <div class="logo text-2xl font-semibold">AMI <span class="text-red-500">Analytics</span></div>

            <!-- Filter -->
            <Filter />
        </nav>
    </header>
</template>