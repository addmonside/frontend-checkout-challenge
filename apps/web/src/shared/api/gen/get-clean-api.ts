// src/shared/api/get-clean-api.ts
import fs from 'node:fs';
import path from 'node:path';

const SOURCE_URL = 'http://127.0.0.1:4000/docs/json';

async function main() {
  const outputPath = process.argv[2];

  if (!outputPath) {
    console.error('Usage: tsx get-clean-api.ts <outputPath>');
    process.exit(1);
  }

  console.log(`Fetching OpenAPI spec from ${SOURCE_URL}...`);

  const response = await fetch(SOURCE_URL);

  if (!response.ok) {
    console.error(`Failed to fetch spec: ${response.status} ${response.statusText}`);
    process.exit(1);
  }

  const spec = await response.json();

  for (const pathItem of Object.values(spec.paths ?? {})) {
    delete (pathItem as Record<string, unknown>).options;
    delete (pathItem as Record<string, unknown>).head;
  }

  const resolvedOutputPath = path.resolve(outputPath);
  fs.mkdirSync(path.dirname(resolvedOutputPath), { recursive: true });
  fs.writeFileSync(resolvedOutputPath, JSON.stringify(spec, null, 2));

  console.log(`OPTIONS methods stripped, saved to ${resolvedOutputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
