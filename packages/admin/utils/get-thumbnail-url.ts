import type { Asset } from '~/generated/graphql/graphql';
const runtimeConfig = useRuntimeConfig();

type ThumbnailConfig = {
  width: number;
  height: number;
};

export const getThumbnailUrl = (
  asset: Asset,
  config: ThumbnailConfig = { width: 300, height: 300 },
) => {
  return `${runtimeConfig.public.THUMBNAIL_ENDPOINT}/${config.width}x${config.height}/smart/${asset.url}`;
};
