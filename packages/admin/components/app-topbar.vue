<script setup lang="ts">
const tree = useTree();
const { darkModeEnabled, enableDarkMode, disableDarkMode } = useDarkmode();
const { me } = useMeQuery();
</script>

<template>
  <div
    class="topbar h-12 flex items-stretch bg-white dark:bg-surface-800 shadow-lg relative z-10"
  >
    <button v-ripple class="bg-primary px-4 text-white" @click="tree.toggle">
      <i class="i-mdi-file-tree" />
    </button>

    <SpaceSelector />

    <div class="flex-1" />
    <div class="flex items-center">
      <div class="flex gap-2 items-center">
        <div v-if="me">{{ me.email }}</div>
        <button class="flex items-center" @click="disableDarkMode">
          <i class="i-mdi-weather-sunny dark:text-white" />
        </button>
        <InputSwitch v-model="darkModeEnabled" />
        <button class="flex items-center" @click="enableDarkMode">
          <i class="i-mdi-weather-night dark:text-white" />
        </button>
      </div>
    </div>
  </div>
</template>
