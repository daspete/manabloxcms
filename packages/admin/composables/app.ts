const darkModeEnabled = ref(false);

export const useApp = () => {
  const toggleDarkMode = () => {
    darkModeEnabled.value = !darkModeEnabled.value;
  };

  const enableDarkMode = () => {
    darkModeEnabled.value = true;
  };

  const disableDarkMode = () => {
    darkModeEnabled.value = false;
  };

  watch(() => darkModeEnabled.value, (value) => {

    if (value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  return {
    darkModeEnabled,
    toggleDarkMode,
    enableDarkMode,
    disableDarkMode,
  };
};
