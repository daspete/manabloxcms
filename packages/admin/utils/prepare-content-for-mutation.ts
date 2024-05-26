import type {
  Asset,
  ContentFieldInput,
  ContentInput,
  InputMaybe,
  User,
} from '~/generated/graphql/graphql';

export const prepareContentForMutation = (content: ContentInput) => {
  const mutateRelationFields = (
    fields: InputMaybe<Array<ContentFieldInput> | undefined>,
  ) => {
    if (!fields) return;

    for (let i = 0; i < fields?.length; i++) {
      const field = fields[i];

      if (field?.type === 'UserRelationField') {
        field.user = (field.user as unknown as User).id;
      }

      if (field?.type === 'AssetRelationField') {
        field.asset = (field.asset as unknown as Asset).id;
      }
    }
  };

  mutateRelationFields(content.fields);

  return content;
};
