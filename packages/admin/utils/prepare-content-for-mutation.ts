import type { ContentInput, ContentType } from '~/generated/graphql/graphql';
import { mutateRelationFields } from './mutate-relation-fields';

export const prepareContentForMutation = (content: ContentInput) => {
  if ((content.type as unknown as ContentType)?.contentTypeId) {
    content.type = (content.type as unknown as ContentType).name;
  }
  mutateRelationFields(content.fields);

  return content;
};
