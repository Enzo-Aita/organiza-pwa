import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
 plugins: [
   react(),
   VitePWA({
     registerType: 'autoUpdate',
     includeAssets: [
       'android-chrome-192x192.png',
       'android-chrome-512x512.png',
       'apple-touch-icon.png',
       'favicon.ico',
       'favicon-16x16.png',
       'favicon-32x32.png',
       'robots.txt',
       'apple-touch-icon.png',
     ],
     manifest: {
       name: 'ORGANIZA+',
       short_name: 'Gerenciador de Finanças',
       description: 'Aplicativo utilizando ReactJS e PWA',
       theme_color: '#622799ff',
       background_color: '#8B8B8C',
       display: 'standalone',
       icons: [
         {
           src: 'icons/android-chrome-192x192.png',
           sizes: '192x192',
           type: 'image/png',
         },
         {
           src: 'icons/android-chrome-512x512.png',
           sizes: '512x512',
           type: 'image/png',
         },
         {
          src: 'icons/apple-touch-icon.png',
          type:'image/png'
         },
         {
          src: 'icons/favicon-16x16.png',
          sizes: '16'
         }
       ],
     },
   }),
 ],
});




