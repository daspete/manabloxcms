<script setup lang="ts">
import { v4 as uuid4 } from 'uuid';
import { vDraggable } from 'vue-draggable-plus';
import { useConfirm } from 'primevue/useconfirm';
import { clone } from '~/utils/clone';
import type { ContentTypeFieldUnion } from '~/generated/graphql/graphql';
import type { ContentConfig } from '~/app.config';

const appConfig = useAppConfig() as ContentConfig;
const confirm = useConfirm();

const props = defineProps({
  contentType: {
    type: Object,
    required: true,
  },
});

if (!props.contentType.fields) {
  props.contentType.fields = [];
}

const fieldSelectionMenu = ref();
const toggleFieldTypeDropdown = (event: Event) => {
  fieldSelectionMenu.value.toggle(event);
};

const getFieldTypeKey = (type: string) => {
  return type.replace('Type', '') as keyof typeof appConfig.content.fieldTypes;
};

const addField = (type: string) => {
  props.contentType.fields.push({
    fieldId: uuid4(),
    ...clone(appConfig.content.fieldTypes[getFieldTypeKey(type)].default),
  });
};

const fieldSelectionMenuItems = Object.keys(appConfig.content.fieldTypes).map(
  (fieldType) => {
    const fieldTypeSettings =
      appConfig.content.fieldTypes[getFieldTypeKey(fieldType)];

    return {
      label: fieldTypeSettings.label,
      icon: fieldTypeSettings.icon,
      command: () => {
        addField(fieldType);
      },
    };
  },
);

const deleteFieldByFieldId = (fieldId: string) => {
  props.contentType.fields = props.contentType.fields.filter(
    (field: ContentTypeFieldUnion) => {
      return field.fieldId !== fieldId;
    },
  );
};

const confirmFieldDeletion = (
  event: MouseEvent,
  field: ContentTypeFieldUnion,
) => {
  if (!event.currentTarget) return;

  confirm.require({
    target: event.currentTarget as HTMLElement,
    group: 'deleteFieldGroup',
    message: `Field ${field.name ? field.name : ''} will be deleted.`,
    accept: () => {
      deleteFieldByFieldId(field.fieldId);
    },
    reject: () => {},
  });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4">
      <div class="flex-1">
        <label for="content-type-name">Content type name</label>
        <InputText
          id="content-type-name"
          v-model="contentType.name"
          class="w-full"
        />
      </div>

      <div class="flex flex-col gap-2 w-64">
        <div class="flex items-center justify-between mt-7">
          <label for="isBlockType" class="mr-2">Is a block type</label>
          <InputSwitch
            v-model="contentType.isBlockType"
            input-id="isBlockType"
          />
        </div>
      </div>
    </div>

    <div v-if="!contentType.isBlockType" class="flex gap-16 items-center">
      <div class="flex items-center justify-between">
        <label for="hasSlug" class="mr-2">Has slug</label>
        <InputSwitch v-model="contentType.hasSlug" input-id="hasSlug" />
      </div>

      <div v-if="contentType.hasSlug" class="flex items-center justify-between">
        <label for="ispublishable" class="mr-2">Is publishable</label>
        <InputSwitch
          v-model="contentType.isPublishable"
          input-id="ispublishable"
        />
      </div>
      <div v-if="contentType.hasSlug" class="flex items-center justify-between">
        <label for="canBeVisibleInMenu" class="mr-2"
          >Can be visible in menu</label
        >
        <InputSwitch
          v-model="contentType.canBeVisibleInMenu"
          input-id="canBeVisibleInMenu"
        />
      </div>
      <div class="flex items-center justify-between">
        <label for="isVisibleInTree" class="mr-2"
          >Is visible in content tree</label
        >
        <InputSwitch
          v-model="contentType.isVisibleInTree"
          input-id="isVisibleInTree"
        />
      </div>
    </div>

    <div class="flex justify-between items-center">
      <div class="text-xl font-bold">Fields</div>
      <div class="flex gap-2">
        <div>
          <Button
            type="button"
            label="Add new"
            icon="i-mdi-plus"
            size="small"
            aria-haspopup="true"
            aria-controls="field-selection-menu"
            severity="secondary"
            @click="toggleFieldTypeDropdown"
          />
          <Menu
            id="field-selection-menu"
            ref="fieldSelectionMenu"
            :popup="true"
            :model="fieldSelectionMenuItems"
          />
        </div>
      </div>
    </div>

    <div>
      <div v-if="!contentType.fields?.length">No fields added yet.</div>

      <Accordion
        v-else
        v-draggable="[
          contentType.fields,
          //@ts-ignore
          { handle: '.drag-handle', animation: 150 },
        ]"
        :multiple="true"
      >
        <AccordionTab v-for="field in contentType.fields" :key="field.fieldId">
          <template #header>
            <div class="flex items-center gap-2 w-full">
              <div class="drag-handle">
                <Button
                  class="w-12 h-4"
                  icon="i-mdi-menu"
                  text
                  rounded
                  severity="secondary"
                />
              </div>

              <div class="flex-1">
                <div class="flex gap-2 items-center">
                  <span v-if="field.name" class="font-bold">{{
                    field.name
                  }}</span>
                  <Tag v-else value="Unnamed field" severity="danger" />
                  <Tag
                    v-if="field.fieldSettings.isRequired"
                    value="Required"
                    severity="success"
                  />
                </div>
                <div class="text-xs text-gray-400">
                  Field ID: {{ field.fieldId }}
                </div>
              </div>

              <div class="w-64">
                <Chip
                  :label="
                    appConfig.content.fieldTypes[getFieldTypeKey(field.type)]
                      .label
                  "
                  class="text-sm"
                  :icon="
                    appConfig.content.fieldTypes[getFieldTypeKey(field.type)]
                      .icon
                  "
                />
              </div>

              <div class="w-12">
                <Button
                  class="w-12 relative"
                  icon="i-mdi-trash"
                  text
                  rounded
                  severity="secondary"
                  @click="confirmFieldDeletion($event, field)"
                />
              </div>
            </div>
          </template>

          <div>
            <div class="pt-4 pb-16 px-8 ml-6">
              <component :is="field.type" :field="field" />
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>

    <ConfirmPopup group="deleteFieldGroup">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="px-4 py-2">
          <div class="text-center font-bold">Are you sure?</div>
          <div>{{ message.message }}</div>
          <div class="flex gap-2 items-center justify-center mt-2">
            <Button
              label="Yes"
              size="small"
              icon="i-mdi-check"
              severity="danger"
              @click="acceptCallback"
            />
            <Button
              label="No"
              size="small"
              icon="i-mdi-window-close"
              severity="success"
              @click="rejectCallback"
            />
          </div>
        </div>
      </template>
    </ConfirmPopup>
  </div>
</template>
