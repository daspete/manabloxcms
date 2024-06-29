import type { Space } from '~/generated/graphql/graphql';
const currentSpace = ref<Space | null>(null);

export const useCurrentSpace = () => {
  return {
    currentSpace,
    setCurrentSpace: (space: Space) => {
      currentSpace.value = space;
    },
  };
};
