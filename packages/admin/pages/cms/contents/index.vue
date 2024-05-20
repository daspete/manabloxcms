<script setup lang="ts">
import type { Content, ContentType } from "~/generated/graphql/graphql";
import deleteContentMutation from "~/graphql/contents/delete-content.mutation.gql";

const { loading, contents, refetch } = useContentsQuery();
const router = useRouter();
const confirm = useConfirm();
const toast = useToast();

const isDeleting = ref(false);

const createContentOfType = (contentType: ContentType) => {
  router.push(`/cms/contents/create/${contentType.name}`);
};

const deleteContent = async (content: Partial<Content>) => {
  isDeleting.value = true;

  const { mutate } = await useMutation(deleteContentMutation, {
    variables: { contentId: content.contentId },
  });

  try {
    await mutate();
    toast.add({
      severity: "success",
      summary: "Success",
      detail: `Content type ${content.title} deleted.`,
      life: 2000,
    });
    refetch();
  } catch (err: any) {
    toast.add({
      severity: "error",
      summary: "Error while deleting content type",
      detail: err.message,
      life: 3000,
    });
  } finally {
    isDeleting.value = false;
  }
};

const confirmContentDeletion = (event: any, content: Content) => {
  confirm.require({
    target: event.currentTarget,
    group: "deleteContentGroup",
    message: `Content ${content.title} will be deleted.`,
    accept: () => {
      deleteContent(content);
    },
    reject: () => {},
  });
};
</script>

<template>
  <div class="container">
    <div class="flex py-8 justify-between items-center">
      <div class="text-2xl font-bold">Contents</div>
      <ContentTypeSelectionMenu
        :showBlockTypes="false"
        @select="createContentOfType"
      />
    </div>

    <div>
      <div class="shadow">
        <DataTable
          :value="contents"
          stripedRows
          removableSort
          :loading="loading"
          :rows="5"
          paginator
          paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
        >
          <template #paginatorstart>
            <Button
              type="button"
              label="Reload"
              icon="i-mdi-reload"
              rounded
              size="small"
              @click="refetch"
            />
          </template>

          <template #paginatorend></template>

          <template #empty>No content added yet.</template>

          <Column field="title" header="Title" sortable>
            <template #body="{ data }">
              <div>
                <NuxtLink :to="`/cms/contents/${data.type}/${data.contentId}`">
                  <div>{{ data.title }}</div>
                  <div class="text-xs">Content ID: {{ data.contentId }}</div>
                </NuxtLink>
              </div>
            </template>
          </Column>

          <Column field="slug" header="Slug">
            <template #body="{ data }">
              <div>{{ data.slug }}</div>
            </template>
          </Column>

          <Column field="type" header="Type">
            <template #body="{ data }">
              <div>{{ data.type }}</div>
            </template>
          </Column>

          <Column class="w-16">
            <template #body="{ data }">
              <Button
                @click="confirmContentDeletion($event, data)"
                icon="i-mdi-trash"
                text
                severity="secondary"
                size="large"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <ConfirmPopup group="deleteContentGroup">
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

    <BlockUI :blocked="isDeleting" fullScreen />
  </div>
</template>
