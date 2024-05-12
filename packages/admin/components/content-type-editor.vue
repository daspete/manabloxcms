<script setup lang="ts">
import { v4 as uuid4 } from 'uuid';

const appConfig = useAppConfig();

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
  switch (type) {
    case 'StringFieldType':
      props.contentType.fields.push({
        fieldId: uuid4(),
        name: '',
        type: 'StringFieldType',
        fieldSettings: {
          isRequired: false
        },
        stringSettings: {}
      });
      break;
    case 'BooleanFieldType':
      props.contentType.fields.push({
        fieldId: uuid4(),
        name: '',
        type: 'BooleanFieldType',
        fieldSettings: {
          isRequired: false
        },
        booleanSettings: {}
      });
      break;
    case 'NumberFieldType':
      props.contentType.fields.push({
        fieldId: uuid4(),
        name: '',
        type: 'NumberFieldType',
        fieldSettings: {
          isRequired: false
        },
        numberSettings: {}
      });
      break;
    case 'DateFieldType':
      props.contentType.fields.push({
        fieldId: uuid4(),
        name: '',
        type: 'DateFieldType',
        fieldSettings: {
          isRequired: false
        },
        dateSettings: {}
      });
      break;
    case 'UserRelationFieldType':
      props.contentType.fields.push({
        fieldId: uuid4(),
        name: '',
        type: 'UserRelationFieldType',
        fieldSettings: {
          isRequired: false
        },
        userSettings: {}
      });
      break;
    case 'AssetRelationFieldType':
      props.contentType.fields.push({
        fieldId: uuid4(),
        name: '',
        type: 'AssetRelationFieldType',
        fieldSettings: {
          isRequired: false
        },
        assetSettings: {}
      });
      break;
    case 'ContentRelationFieldType':
      props.contentType.fields.push({
        fieldId: uuid4(),
        name: '',
        type: 'ContentRelationFieldType',
        fieldSettings: {
          isRequired: false
        },
        contentSettings: {}
      });
      break;
  }
}

const onContentTypeFieldOrder = (event: Event) => {
  props.contentType.fields = event.value;
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

    <div class="flex justify-between items-center">
      <div class="text-xl font-bold pt-8 pb-4">
        Fields
      </div>
      <div>
        <Button type="button" label="Add new" @click="toggleFieldTypeDropdown" icon="i-mdi-plus" size="small"
          aria-haspopup="true" aria-controls="field-selection-menu" severity="secondary" />
        <Menu ref="fieldSelectionMenu" id="field-selection-menu" :popup="true" :model="[
          {
            label: appConfig.content.fieldTypes.StringField.label,
            icon: appConfig.content.fieldTypes.StringField.icon,
            command: () => { addField('StringFieldType') }
          },
          {
            label: appConfig.content.fieldTypes.BooleanField.label,
            icon: appConfig.content.fieldTypes.BooleanField.icon,
            command: () => { addField('BooleanFieldType') }
          },
          {
            label: appConfig.content.fieldTypes.NumberField.label,
            icon: appConfig.content.fieldTypes.NumberField.icon,
            command: () => { addField('NumberFieldType') }
          },
          {
            label: appConfig.content.fieldTypes.DateField.label,
            icon: appConfig.content.fieldTypes.DateField.icon,
            command: () => { addField('DateFieldType') }
          },
          {
            label: appConfig.content.fieldTypes.UserRelationField.label,
            icon: appConfig.content.fieldTypes.UserRelationField.icon,
            command: () => { addField('UserRelationFieldType') }
          },
          {
            label: appConfig.content.fieldTypes.AssetRelationField.label,
            icon: appConfig.content.fieldTypes.AssetRelationField.icon,
            command: () => { addField('AssetRelationFieldType') }
          },
          {
            label: appConfig.content.fieldTypes.ContentRelationField.label,
            icon: appConfig.content.fieldTypes.ContentRelationField.icon,
            command: () => { addField('ContentRelationFieldType') }
          }
        ]" />
      </div>
    </div>

    <div>
      <DataTable v-model:expandedRows="expandedFieldTypes" :value="contentType.fields" dataKey="fieldId"
        :reorderableColumns="true" @rowReorder="onContentTypeFieldOrder">
        <template #empty>
          No fields asset yet.
        </template>
        <Column rowReorder class="w-4" :reorderableColumn="false" />
        <Column expander class="w-4" />
        <Column field="name" header="Name">
          <template #body="{ data }">
            <div class="flex gap-2 items-center">
              <span>{{ data.name ? data.name : 'unnamed' }}</span>
              <Tag v-if="data.fieldSettings.isRequired" value="Required" severity="success" />
            </div>

          </template>
        </Column>
        <Column field="type" header="Type" class="w-64">
          <template #body="{ data }">
            <Chip :label="data.type.replace('Type', '')"
              :icon="appConfig.content.fieldTypes[data.type.replace('Type', '')].icon" />
          </template>
        </Column>

        <template #expansion="{ data }">
          <div class="py-4">
            <component :field="data" :is="data.type" />
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>
