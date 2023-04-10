import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import replace from '@rollup/plugin-replace'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    replace({
      'require.context': () => null,
      preventAssignment: true,
    }),
  ],

  server: {
    port: 3000,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:5000',
    //   },

    //   '/uploads': {
    //     target: 'http://localhost:5000',
    //   },
    // },
  },
})
