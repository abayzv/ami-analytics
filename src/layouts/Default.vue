<script setup>
import Header from '../components/layouts/Header.vue'

</script>

<template>
    <Header />
    <main class="container mx-auto">
        <slot />
    </main>
</template>

<style>

.container {
    max-width: 1200px;
}

</style>