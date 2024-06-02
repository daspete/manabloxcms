import type {
  Asset,
  Content,
  ContentFieldInput,
  InputMaybe,
  User,
} from '~/generated/graphql/graphql';

export const mutateRelationFields = (
  fields: InputMaybe<Array<ContentFieldInput> | undefined>,
) => {
  if (!fields) return;

  for (let i = 0; i < fields?.length; i++) {
    const field = fields[i];

    if (field?.type === 'UserRelationField') {
      field.user = (field.user as unknown as User)?.id;
    }

    if (field?.type === 'AssetRelationField') {
      field.asset = (field.asset as unknown as Asset)?.id;
    }

    if (field?.type === 'ContentRelationField') {
      field.content = (field.content as unknown as Content)?.id;
    }

    if (field?.type === 'BlockItemField') {
      mutateRelationFields(field.block?.fields);
    }

    if (field?.type === 'BlockItemsField') {
      field.blocks?.forEach((block) => {
        mutateRelationFields(block.fields);
      });
    }
  }
};
