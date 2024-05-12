<script setup lang="ts">
const props = defineProps({
    field: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div>Boolean field {{ field }}</div>
</template>