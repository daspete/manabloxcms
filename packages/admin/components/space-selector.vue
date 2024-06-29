<script setup lang="ts">
const { spaces } = useSpacesQuery();
const { currentSpace, setCurrentSpace } = useCurrentSpace();

watch(spaces, (spaces) => {
  if (spaces.items.length === 1 && !currentSpace.value) {
    setCurrentSpace(spaces.items[0]);
    console.log(currentSpace.value);
  }
});
</script>

<template>
  <div v-if="spaces.items.length > 1" class="flex items-center pl-4">
    Space selector
  </div>
</template>
