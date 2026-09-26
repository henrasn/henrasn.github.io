import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { adminSavePlugin } from './config/admin-save-plugin.ts'

export default defineConfig({
  plugins: [tailwindcss(), react(), adminSavePlugin()],
})
