<script setup lang="ts">
const props = defineProps({
    block: {
        type: Object,
        required: true
    }
});

const { loading, contentType } = useContentTypeQuery({ name: props.block.type });

const isInitializing = ref(true);

watch(contentType, () => {
    if(props.block.fields.length === 0){
        initContentFields(contentType.value, props.block);   
    }
    isInitializing.value = false;
});

const blockFields = computed(() => {
  return props.block.fields.filter((field) => {
    return !!getFieldType(contentType.value, field);
  });
});
</script>

<template>
    <div>
        <div v-if="isInitializing">Please wait, block is initializing</div>
        <div v-else class="flex flex-col gap-4">
            <component
                v-for="field in blockFields"
                :key="field.fieldId"
                :is="field.type"
                :fieldType="getFieldType(contentType, field)"
                :field="field"
            />
        </div>
    </div>
</template>