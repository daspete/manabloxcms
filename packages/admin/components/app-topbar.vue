<script setup lang="ts">
const tree = useTree();
// const { darkModeEnabled, enableDarkMode, disableDarkMode } = useApp();
</script>

<template>
  <div class="topbar h-12 flex items-stretch bg-white shadow-lg relative z-10">
    <button v-ripple class="bg-primary px-4 text-white" @click="tree.toggle">
      <i class="i-mdi-file-tree" />
    </button>
    <!-- <div class="flex-1"></div>
    <div class="flex items-center">
      <div class="flex gap-2 items-center">
        <button @click="disableDarkMode"><i class="i-mdi-weather-sunny" /></button>
        <InputSwitch v-model="darkModeEnabled" />
        <button @click="enableDarkMode"><i class="i-mdi-weather-night" /></button>
      </div>
    </div> -->
  </div>
</template>
