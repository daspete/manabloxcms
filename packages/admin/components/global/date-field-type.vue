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

if (props.field.dateSettings.minDate) {
  props.field.dateSettings.minDate = new Date(props.field.dateSettings.minDate);
}

if (props.field.dateSettings.maxDate) {
  props.field.dateSettings.maxDate = new Date(props.field.dateSettings.maxDate);
}

if (props.field.dateSettings.excludedDates) {
  props.field.dateSettings.excludedDates =
    props.field.dateSettings.excludedDates.map(
      (date: string) => new Date(date),
    );
}

if (props.field.dateSettings.defaultValue) {
  props.field.dateSettings.defaultValue = new Date(
    props.field.dateSettings.defaultValue,
  );
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <FieldTypeSettings :field="field" />

    <div class="flex gap-8 justify-stretch">
      <div class="flex gap-2 items-center flex-1">
        <label for="min-date">Min date</label>
        <Calendar
          id="min-date"
          v-model="field.dateSettings.minDate"
          :show-time="field.dateSettings.useTime"
          hour-format="24"
          class="flex-1"
          date-format="dd. MM yy"
        />
      </div>
      <div class="flex gap-2 items-center flex-1">
        <label for="max-date">Max date</label>
        <Calendar
          id="max-date"
          v-model="field.dateSettings.maxDate"
          :show-time="field.dateSettings.useTime"
          hour-format="24"
          class="flex-1"
          date-format="dd. MM yy"
        />
      </div>
      <div class="flex gap-2 items-center flex-1">
        <label for="excluded-dates">Excluded dates</label>
        <Calendar
          id="excluded-dates"
          v-model="field.dateSettings.excludedDates"
          selection-mode="multiple"
          :manual-input="false"
          :show-time="field.dateSettings.useTime"
          hour-format="24"
          class="flex-1"
          date-format="dd. MM yy"
        />
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
        <Calendar
          id="default-date"
          v-model="field.dateSettings.defaultValue"
          :show-time="field.dateSettings.useTime"
          hour-format="24"
          class="flex-1"
          date-format="dd. MM yy"
        />
      </div>
    </div>
  </div>
</template>
