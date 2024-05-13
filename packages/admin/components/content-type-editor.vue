<script setup lang="ts">
import { v4 as uuid4 } from 'uuid';
import { useConfirm } from "primevue/useconfirm";
import { clone } from '~/utils/clone';

const appConfig = useAppConfig();
const confirm = useConfirm();

const props = defineProps({
  contentType: {
    type: Object,
    required: true
  }
});

const expandedFieldTypes = ref([]);

const fieldSelectionMenu = ref();
const toggleFieldTypeDropdown = (event: Event) => {
  fieldSelectionMenu.value.toggle(event);
}

const addField = (type: string) => {
  props.contentType.fields.push({
    fieldId: uuid4(),
    ...clone(appConfig.content.fieldTypes[type.replace('Type', '')].default)
  });
}

const onContentTypeFieldOrder = (event: Event) => {
  props.contentType.fields = event.value;
}

const collapseAllFieldTypes = () => {
  expandedFieldTypes.value = null;
}

const fieldSelectionMenuItems = Object.keys(appConfig.content.fieldTypes).map((fieldType) => {
  const fieldTypeSettings = appConfig.content.fieldTypes[fieldType.replace('Type', '')];

  return {
    label: fieldTypeSettings.label,
    icon: fieldTypeSettings.icon,
    command: () => { addField(fieldType); }
  }
});

const deleteFieldByFieldId = (fieldId) => {
  props.contentType.fields = props.contentType.fields.filter((field) => {
    return field.fieldId !== fieldId;
  })
}

const confirmFieldDeletion = (event, field) => {
  confirm.require({
    target: event.currentTarget,
    group: 'deleteFieldGroup',
    message: `Field ${ field.name ? field.name : '' } will be deleted.`,
    accept: () => {
      deleteFieldByFieldId(field.fieldId)
    },
    reject: () => {}
  })
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 items-center">
      <div class="flex-1">
        <FloatLabel>
          <InputText id="content-type-name" v-model="contentType.name" class="w-full" />
          <label for="content-type-name">Content type name</label>
        </FloatLabel>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label for="ispublishable" class="mr-2">Is publishable</label>
          <InputSwitch inputId="ispublishable" v-model="contentType.isPublishable" />
        </div>
      </div>
    </div>



    <div>
      <DataTable v-model:expandedRows="expandedFieldTypes" :value="contentType.fields" dataKey="fieldId"
        :reorderableColumns="true" @rowReorder="onContentTypeFieldOrder">
        <template #header>
          <div class="flex justify-between items-center">
            <div class="text-xl font-bold">
              Fields
            </div>
            <div class="flex gap-2">
              <Button text icon="i-mdi-minus" size="small" label="Collapse All" @click="collapseAllFieldTypes" />
              <div>
                <Button type="button" label="Add new" @click="toggleFieldTypeDropdown" icon="i-mdi-plus" size="small"
                  aria-haspopup="true" aria-controls="field-selection-menu" severity="secondary" />
                <Menu ref="fieldSelectionMenu" id="field-selection-menu" :popup="true" :model="fieldSelectionMenuItems" />
              </div>
            </div>
          </div>
        </template>
        <template #empty>
          No fields added yet.
        </template>
        <Column rowReorder class="w-4" :reorderableColumn="false" />
        <Column expander class="w-4" />
        <Column field="name" header="Name">
          <template #body="{ data }">
            <div class="flex gap-2 items-center">
              <span v-if="data.name">{{ data.name }}</span>
              <Tag v-else value="Unnamed field" severity="danger" />
              <Tag v-if="data.fieldSettings.isRequired" value="Required" severity="success" />
            </div>
            <div class="text-xs">Field ID: {{ data.fieldId }}</div>
          </template>
        </Column>
        <Column field="type" header="Type" class="w-64">
          <template #body="{ data }">
            <Chip :label="data.type.replace('Type', '')"
              :icon="appConfig.content.fieldTypes[data.type.replace('Type', '')].icon" />
          </template>
        </Column>
        <Column class="w-16">
          <template #body="{ data }">
            <Button @click="confirmFieldDeletion($event, data)" icon="i-mdi-trash" text severity="secondary" size="large" />
          </template>
        </Column>

        <template #expansion="{ data }">
          <div class="pt-4 pb-16 px-8 ml-20">
            <component :field="data" :is="data.type" />
          </div>
        </template>
      </DataTable>
    </div>
    <ConfirmPopup group="deleteFieldGroup">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="px-4 py-2">
          <div class="text-center font-bold">Are you sure?</div>
          <div>{{ message.message }}</div>
          <div class="flex gap-2 items-center justify-center mt-2">
            <Button label="Yes" size="small" icon="i-mdi-check" severity="danger" @click="acceptCallback" />
            <Button label="No" size="small" icon="i-mdi-window-close" severity="success" @click="rejectCallback" />
          </div>
        </div>
      </template>
    </ConfirmPopup>
  </div>
</template>
