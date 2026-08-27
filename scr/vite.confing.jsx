import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import netlifyPlugin from '@netlify/vite-plugin-react-router';

export default defineConfig({
  plugins: [react(), netlifyPlugin()],
});