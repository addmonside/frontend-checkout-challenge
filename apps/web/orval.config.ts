import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'src/shared/api/gen/schema-clean.json',
    },
    output: {
      mode: 'tags-split',
      target: 'src/shared/api/gen',
      schemas: 'src/shared/api/gen/model',
      client: 'react-query',
      httpClient: 'fetch',
      override: {
        mutator: {
          path: 'src/shared/api/client-fetch/client-fetch.ts',
          name: 'customFetch',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
