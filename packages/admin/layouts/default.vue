<script setup lang="ts">
const { darkModeEnabled } = useDarkmode();

useHead({
  htmlAttrs: {
    class: darkModeEnabled.value ? 'dark' : '',
  },
});
</script>

<template>
  <div class="flex min-h-screen w-full items-stretch">
    <AppSidebar />
    <AppSlidebar />
    <div class="flex-1 flex flex-col h-screen relative">
      <AppTopbar />
      <div class="content flex-1 overflow-hidden">
        <div class="flex h-full">
          <AppTree />
          <div class="overflow-y-auto flex-1 relative">
            <div class="flex w-full justify-center px-4 pb-8">
              <NuxtPage />
            </div>
          </div>
        </div>
      </div>
      <!-- <AppBottombar /> -->
    </div>
    <Toast position="top-center" />
  </div>
</template>
