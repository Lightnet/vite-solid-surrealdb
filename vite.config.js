// https://github.com/vitejs/vite/discussions/2785

// vite.config.ts
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
//import { resolve } from "path";

export default defineConfig({
  //optimizeDeps:{
    //disabled: true,
    //extensions: ['jsx', 'tsx'],
    //esbuildOptions: {
      //"jsx": "preserve",
      //"jsxImportSource": "solid-js",
      //"jsxInject": `import { JSX } from 'solid-js'`,
    //},
  //},
  plugins: [
    solidPlugin()
  ],
});