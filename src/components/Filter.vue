<script setup>
import Button from './Button.vue';
import Dropdown from './Dropdown.vue';
</script>

<template>
    <div class="flex items-center gap-5">
        <div>
            <Dropdown>
                <template #title>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5"/></svg>
                Search
                </template>
                <div>
                    <button>Most recent</button>
                    <button>Oldest</button>
                </div>
            </Dropdown>
        </div>
        <div class="flex items-center">
            <Button>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0" clip-rule="evenodd"/></svg>
            </Button>
            <Button>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10L8.22 6.28a.75.75 0 0 1 0-1.06" clip-rule="evenodd"/></svg>
            </Button>
        </div>
        <div>
            <Dropdown class="w-36">
                <template #title>
                    Sort By
                </template>
                <div>
                    <button>Most recent</button>
                    <button>Oldest</button>
                </div>
            </Dropdown>
        </div>
    </div>
</template>