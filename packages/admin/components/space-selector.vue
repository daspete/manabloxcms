<script setup lang="ts">
const { spaces } = useSpacesQuery();
const { currentSpace, setCurrentSpace } = useCurrentSpace();

watch(spaces, (spaces) => {
  if (spaces.items.length === 1 && !currentSpace.value) {
    setCurrentSpace(spaces.items[0]);
  }
});

const spaceSelectorMenu = ref();
const toggleSpaceSelector = (event: MouseEvent) => {
  spaceSelectorMenu.value.toggle(event);
};
</script>

<template>
  <div v-if="spaces.items.length > 1" class="flex items-center pl-4">
    <Button
      :severity="currentSpace?.name ? 'secondary' : 'danger'"
      aria-haspopup="true"
      aria-controls="space-selector"
      @click="toggleSpaceSelector"
    >
      <div class="text-sm">
        <span v-if="currentSpace?.name">
          Selected space:
          <span class="font-bold ml-2">{{ currentSpace.name }}</span>
        </span>
        <span v-else>Select a space</span>
      </div>
    </Button>

    <Menu
      id="space-selector"
      ref="spaceSelectorMenu"
      :popup="true"
      :model="
        spaces.items.map((space) => ({
          label: space.name,
          command: () => setCurrentSpace(space),
        }))
      "
    />
  </div>
</template>
