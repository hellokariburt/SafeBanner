import * as esbuild from 'esbuild';

const isWatch = process.argv.includes('--watch');

// Output directly to web app's public folder
const buildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  outfile: '../../apps/web/public/safebanner.js',
  format: 'iife',
  target: ['es2020'],
  logLevel: 'info',
};

if (isWatch) {
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();
  console.log('Watching for changes...');
} else {
  await esbuild.build(buildOptions);
}
