<script setup lang="ts">
const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});
if (!props.field.dateSettings) {
  props.field.dateSettings = {};
}

if(props.field.dateSettings.minDate) {
  props.field.dateSettings.minDate = new Date(props.field.dateSettings.minDate);
}

if(props.field.dateSettings.maxDate) {
  props.field.dateSettings.maxDate = new Date(props.field.dateSettings.maxDate);
}

if(props.field.dateSettings.excludedDates) {
  props.field.dateSettings.excludedDates = props.field.dateSettings.excludedDates.map((date: string) => new Date(date));
}

if(props.field.dateSettings.defaultValue) {
  props.field.dateSettings.defaultValue = new Date(props.field.dateSettings.defaultValue);
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <FieldTypeSettings :field="field" />

    <div class="flex gap-8 justify-stretch">
      <div class="flex gap-2 items-center flex-1">
        <label for="min-date">Min date</label>
        <Calendar v-model="field.dateSettings.minDate" id="min-date" :showTime="field.dateSettings.useTime" hourFormat="24" class="flex-1" dateFormat="dd. MM yy" />
      </div>
      <div class="flex gap-2 items-center flex-1">
        <label for="max-date">Max date</label>
        <Calendar v-model="field.dateSettings.maxDate" id="max-date" :showTime="field.dateSettings.useTime" hourFormat="24" class="flex-1" dateFormat="dd. MM yy" />
      </div>
      <div class="flex gap-2 items-center flex-1">
        <label for="excluded-dates">Excluded dates</label>
        <Calendar v-model="field.dateSettings.excludedDates" id="excluded-dates" selectionMode="multiple" :manualInput="false" :showTime="field.dateSettings.useTime" hourFormat="24" class="flex-1" dateFormat="dd. MM yy" />
      </div>
    </div>

    <div class="flex gap-8">
      <div class="flex gap-4 items-center">
        <InputSwitch id="use-time" v-model="field.dateSettings.useTime" />
        <label for="use-time">Use time</label>
      </div>
    </div>

    <div class="flex gap-8">
      <div class="flex gap-2 items-center w-1/3 pr-5">
        <label for="default-date">Default value</label>
        <Calendar v-model="field.dateSettings.defaultValue" id="default-date" :showTime="field.dateSettings.useTime" hourFormat="24" class="flex-1" dateFormat="dd. MM yy" />
      </div>
    </div>
  </div>
</template>
