export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useCookie('accesstoken');
  const refreshToken = useCookie('refreshtoken');
  const afterLoginTargetPath = useCookie('afterlogintargetpath');

  const fromPath = from.fullPath;

  if (!accessToken.value && !refreshToken.value) {
    afterLoginTargetPath.value = fromPath;

    return navigateTo('/login');
  }

  if (afterLoginTargetPath.value) {
    const targetPath = afterLoginTargetPath.value;
    afterLoginTargetPath.value = null;

    return navigateTo(targetPath);
  }
});
