import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://manablox-public:3000/graphql',
  documents: ['**/*.vue'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './generated/graphql/': {
      preset: 'client',
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
