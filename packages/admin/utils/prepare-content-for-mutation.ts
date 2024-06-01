import type { ContentInput } from '~/generated/graphql/graphql';
import { mutateRelationFields } from './mutate-relation-fields';

export const prepareContentForMutation = (content: ContentInput) => {
  mutateRelationFields(content.fields);

  return content;
};
