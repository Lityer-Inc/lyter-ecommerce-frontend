import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react({
      // configuration for react plugin
      version: 'detect',
    }),
    eslintPlugin({
      // configuration for eslint plugin
      cache: false
    })
  ]
});