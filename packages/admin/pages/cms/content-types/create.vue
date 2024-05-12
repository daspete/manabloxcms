<script setup lang="ts">
const contentType = ref({
  name: '',
  isPublishable: false,
  fields: []
});
</script>

<template>
  <div class="container pt-8">
    <Card>
      <template #title>
        Add a new content type
      </template>
      <template #content>
        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <div class="w-1/2">
              <FloatLabel>
                <InputText id="content-type-name" v-model="contentType.name" class="w-full" />
                <label for="content-type-name">Content type name</label>
              </FloatLabel>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <label for="ispublishable" class="mr-2">Is publishable</label>
                <InputSwitch inputId="ispublishable" v-model="contentType.isPublishable" />
              </div>
            </div>
          </div>
          <div>
            Fields
          </div>
          <div>

          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
