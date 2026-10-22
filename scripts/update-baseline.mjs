// Approve the current build as the new DOM baseline: copies the prerendered page to reference/baseline.html.
// Run only after an intentional, reviewed design change (`yarn baseline:update`), then commit the file.
import fs from 'node:fs';

fs.copyFileSync('.next/server/app/index.html', 'reference/baseline.html');
console.log('reference/baseline.html updated from the current build');
