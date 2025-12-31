import { defineConfig } from "vite";
export default defineConfig({
    server: {
        host: true,
        port: 5174,
        allowedHosts:[
            '0cf2c744d843.ngrok-free.app'
        ]
    },
    build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        newyear: 'newyear.html'
      }
    }
  }
    
})