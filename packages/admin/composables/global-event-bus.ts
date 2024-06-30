export const useGlobalEventBus = () => {
  const nuxtHooks = useNuxtApp().hooks;

  return {
    emit: nuxtHooks.callHook,
    on: nuxtHooks.hook,
  };
};
