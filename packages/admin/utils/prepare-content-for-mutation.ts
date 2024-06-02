import type { ContentInput, ContentType } from '~/generated/graphql/graphql';
import { mutateRelationFields } from './mutate-relation-fields';

export const prepareContentForMutation = (content: ContentInput) => {
  if ((content.type as unknown as ContentType)?.contentTypeId) {
    content.type = (content.type as unknown as ContentType).contentTypeId;
  }

  if (content.parent) {
    content.parent = (content.parent as unknown as ContentInput).contentId;
  }

  mutateRelationFields(content.fields);

  return content;
};
