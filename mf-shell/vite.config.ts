import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        mf_characters: 'http://localhost:3001/assets/remoteEntry.js',
        mf_character_detail: 'http://localhost:3002/assets/remoteEntry.js',
      },

      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  server: {
    port: 3000,
    cors: true

  },
})
