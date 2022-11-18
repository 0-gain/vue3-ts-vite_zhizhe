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

## 完成Dropdown组件

## 完成表单组件

### validateForm
### validateInput
- 实现v-model，父组件可以拿到用户输入的数据
- 实现input类型(password)
  - 禁用透传Attributes来实现
- 完成验证规则
  - 失去焦点验证事件

## 需要解决的疑问
- 为什么一定要先app.use(router)再app.mount(#app)