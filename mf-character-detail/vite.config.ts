import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'characterDetail',
      filename: 'remoteEntry.js',
      exposes: {
        './CharacterDetail': './src/CharacterDetail.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  server: {
    port: 3002,
    cors: true

  },
});
