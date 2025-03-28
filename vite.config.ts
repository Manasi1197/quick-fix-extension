
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { componentTagger } from "lovable-tagger"
import fs from 'fs-extra'

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
      apply: 'build',
      closeBundle: async () => {
        // Copy manifest and icons to dist
        await fs.copy('public/manifest.json', 'dist/manifest.json');
        await fs.copy('public/icons', 'dist/icons');
        
        // Copy popup.html to dist
        await fs.copy('public/popup.html', 'dist/popup.html');
        
        // Ensure popup.css exists in dist
        if (await fs.pathExists('public/popup.css')) {
          await fs.copy('public/popup.css', 'dist/popup.css');
        } else {
          // Create empty popup.css if it doesn't exist
          await fs.writeFile('dist/popup.css', '/* Extension styles */');
        }
        
        console.log('Extension files copied to dist folder');
      }
    }
  ].filter(Boolean),
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
  },
}))
