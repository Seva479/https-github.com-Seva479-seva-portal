import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, Plugin } from 'vite';
import postcss from 'postcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function mobileCompatibilityPlugin(): Plugin {
  return {
    name: 'mobile-compatibility',
    transformIndexHtml(html) {
      // Remove crossorigin attribute from stylesheet links to prevent CORS issues on mobile proxies/data-saver modes
      return html.replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/g, '<link rel="stylesheet" href="$1">');
    },
    generateBundle(_, bundle) {
      for (const fileName in bundle) {
        if (fileName.endsWith('.css')) {
          const chunk = bundle[fileName];
          if (chunk.type === 'asset' && typeof chunk.source === 'string') {
            try {
              const root = postcss.parse(chunk.source);
              // Unwrap all @layer rules so older mobile browsers that do not support @layer (Chrome < 99, Android WebView, iOS Safari < 15.4) can parse all CSS rules
              root.walkAtRules('layer', (atRule) => {
                atRule.replaceWith(atRule.nodes);
              });
              // Remove @property rules which cause older CSS parsers on Android to fail
              root.walkAtRules('property', (atRule) => {
                atRule.remove();
              });
              chunk.source = root.toResult().css;
            } catch (err) {
              console.warn('CSS transform error in mobileCompatibilityPlugin:', err);
            }
          }
        }
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [react(), tailwindcss(), mobileCompatibilityPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'es2020',
      sourcemap: false,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

