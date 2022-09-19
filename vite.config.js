// https://github.com/vitejs/vite/discussions/2785

// vite.config.ts
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { resolve } from "path";
import inject from '@rollup/plugin-inject'

export default defineConfig({
  //server: {
    //port:3000,
    //proxy: {  
    //}
  //},
  build: {
    commonjsOptions: {
      //include: [/node_modules/]
    },
    rollupOptions: {
			plugins: [inject({ Buffer: ['Buffer', 'buffer'] })],
		},
  },
  optimizeDeps: {
    esbuildOptions: {
        define: {
          global: "globalThis",
        },
        plugins: [
          
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true,
          }),
          
        ],
    },
  },
  resolve: {
    alias: {
      //process: "process/browser",
      //stream: "stream-browserify",
      //zlib: "browserify-zlib",
      //util: "util",
    },
  },
  plugins: [
    solidPlugin()
  ],
});