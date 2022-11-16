## vite配置别名

- npm install @types/node --save-dev
  ```javascript
  // vite.config.js/ts
  import { defineConfig } from "vite";
  import vue from "@vitejs/plugin-vue";
  
  import { join } from "path";
  
  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        "@": join(__dirname, "src"),
      },
    },
  });
  
  
  // tsconfig.json
  {
      "compilerOptions":{
          ...,
          "baseUrl":'.',
          "paths":{
              "@/*":["src/*"]
          }
      }
  }
  ```

