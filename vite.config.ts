import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/*" },
      { find: "@service", replacement: "/src/service" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@router", replacement: "/src/router" },
      { find: "@validation", replacement: "/src/utils/validations.ts" },
      { find: "@modals", replacement: "/src/components/modals" },
      { find: "@store", replacement: "/src/store/index" },
      { find: "@notification", replacement: "/src/utils/notification.ts" },
      { find: "@auth-interface", replacement: "/src/interfaces/auth.ts" },
      { find: "@services-interface", replacement: "/src/interfaces/services.ts" },
      { find: "@orders-interface", replacement: "/src/interfaces/orders.ts" },
      { find: "@global-interface", replacement: "/src/interfaces/global.ts" },
      { find: "@data-service", replacement: "/src/utils/data-service.ts" },
      { find: "@table", replacement: "/src/components/ui/table" },
    ],
  },
})
