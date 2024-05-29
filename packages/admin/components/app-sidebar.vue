<script setup lang="ts">
const isOpen = ref(false);
</script>

<template>
  <div
    :class="`sidebar ${isOpen ? 'w-32' : 'w-16'} bg-surface-950 flex flex-col items-center shadow-lg transition-all`"
  >
    <NuxtLink
      to="/"
      class="flex justify-center items-center h-12"
      title="ManaBlox"
    >
      <div class="text-primary font-extrabold text-2xl -rotate-6 ml-1">M</div>
      <div class="text-white font-extrabold text-2xl rotate-6 relative -left-1">
        B
      </div>
    </NuxtLink>
    <div>
      <Button
        text
        aria-label="Filter"
        title="Toggle menubar"
        @click="isOpen = !isOpen"
      >
        <i
          class="i-mdi-chevron-right transition-all"
          :class="isOpen ? 'rotate-180' : ''"
        />
      </Button>
    </div>

    <div>
      <NuxtLink to="/cms/content-types">
        <Button text aria-label="Filter" title="Toggle menubar">
          <i class="i-mdi-file-cog-outline text-primary" />
        </Button>
      </NuxtLink>
    </div>
  </div>
</template>
