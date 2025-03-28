
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { componentTagger } from "lovable-tagger"
import fs from 'fs-extra'
import type { PluginOption } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    {
      name: 'copy-extension-files',
      apply: 'build' as const,
      closeBundle: async () => {
        // Copy manifest and icons to dist
        await fs.copy('public/manifest.json', 'dist/manifest.json');
        await fs.copy('public/icons', 'dist/icons');
        
        // Copy popup.html to dist
        await fs.copy('public/popup.html', 'dist/popup.html');
        
        // Create popup.css with combined styles for the extension
        const cssContent = `
/* Base extension styles */
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 400px;
  height: 500px;
  overflow: hidden;
}

#root {
  width: 100%;
  height: 100%;
}
`;
        await fs.writeFile('dist/popup.css', cssContent);
        
        console.log('Extension files copied to dist folder');
      }
    } as PluginOption
  ].filter(Boolean) as PluginOption[],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        popup: path.resolve(__dirname, 'src/popup.tsx'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'popup' ? 'popup.js' : '[name].[hash].js';
        },
      },
    },
    cssCodeSplit: false, // This ensures CSS is not split across chunks
  },
}))
