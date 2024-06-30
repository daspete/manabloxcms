import type { HookResult } from 'nuxt/schema';

export default defineNuxtPlugin(() => {});

type ContentHookParams = {
  parentId?: string;
  contentId?: string;
};

declare module '#app' {
  interface RuntimeNuxtHooks {
    'content:created': (contentCreatedParams: ContentHookParams) => HookResult;
    'content:updated': (contentUpdatedParams: ContentHookParams) => HookResult;
    'content:deleted': (contentCreatedParams: ContentHookParams) => HookResult;
  }
}
