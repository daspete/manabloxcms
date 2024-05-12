<script setup lang="ts">
const props = defineProps({
    field: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div>Date field {{ field }}</div>
</template>