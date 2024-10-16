import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist', // Diretório de saída
        sourcemap: true, // Crie sourcemaps para facilitar a depuração
    },
    server: {
        port: 3001, // Porta do servidor de desenvolvimento
    },
});