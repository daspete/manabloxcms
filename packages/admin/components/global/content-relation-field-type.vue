<script setup lang="ts">
const props = defineProps({
    field: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div>Content Relation field {{ field }}</div>
</template>