import * as esbuild from 'esbuild';
import { copyFileSync, mkdirSync } from 'fs';

const isWatch = process.argv.includes('--watch');

const DIST = 'dist/safebanner.js';
const PUBLIC = '../../apps/web/public/safebanner.js';

function copyToPublic() {
  try {
    copyFileSync(DIST, PUBLIC);
  } catch {
    // Public path may not exist in npm-only environments — that's fine
  }
}

const buildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  outfile: DIST,
  format: 'iife',
  target: ['es2020'],
  logLevel: 'info',
};

if (isWatch) {
  const ctx = await esbuild.context({
    ...buildOptions,
    plugins: [{
      name: 'copy-to-public',
      setup(build) {
        build.onEnd(() => copyToPublic());
      },
    }],
  });
  await ctx.watch();
  console.log('Watching for changes...');
} else {
  mkdirSync('dist', { recursive: true });
  await esbuild.build(buildOptions);
  copyToPublic();
}
