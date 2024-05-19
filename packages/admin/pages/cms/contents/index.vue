<script setup lang="ts">
const router = useRouter();

const createContentType = (contentType) => {
  router.push(`/cms/contents/create/${ contentType.name }`)
};
</script>

<template>
  <div class="container">
    <div class="flex py-8 justify-between items-center">
      <div class="text-2xl font-bold">Contents</div>
      <ContentTypeSelectionMenu @select="createContentType" />
    </div>

    <div>contents</div>
  </div>
</template>
