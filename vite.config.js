// vite.config.ts
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
//import gunPlugin from "./vite-plugin-gun.js"

export default defineConfig({
  //server: {
    //port:3000,
    //proxy: {  
    //}
  //},
  plugins: [
    solidPlugin()
  ],
});