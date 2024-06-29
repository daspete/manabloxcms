// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt([
  {
    ignores: ['generated/**/*.*', 'ui/**/*.*'],
    rules: {
      'vue/no-mutating-props': 'off',
      'vue/no-v-html': 'off',
      // '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);
