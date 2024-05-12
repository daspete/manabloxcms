<script setup lang="ts">
const props = defineProps({
    field: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div>Asset relation field {{ field }}</div>
</template>