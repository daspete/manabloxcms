import type { ContentType, SpaceInput } from '~/generated/graphql/graphql';
import { mutateRelationFields } from './mutate-relation-fields';

export const prepareSpaceForMutation = (space: SpaceInput) => {
  if (space.settingsBlockType) {
    space.settingsBlockType = (
      space.settingsBlockType as unknown as ContentType
    ).contentTypeId;
  }
  if (space.settings?.type) {
    mutateRelationFields(space.settings.fields);
  }

  return space;
};
