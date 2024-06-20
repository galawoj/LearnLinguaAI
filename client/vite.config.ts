import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {  
    proxy: { // Przesunięto do środka server
      '/api': {
        target: 'http://localhost:3000/api', // Adres serwera backendowego
        changeOrigin: true,
        secure: false,
         rewrite: (path) => path.replace(/^\/api/, ''), // Opcjonalne, aby usunąć '/api' z przekierowanych żądań
      },
    },
  },
 
 base:'/LearnLinguaAI_build/',

});
