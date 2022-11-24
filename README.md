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


## 完成表单组件

### validateForm
- 使用插槽将validateInput渲染出来
- 使用mitt使validateForm组件和自己插槽渲染的组件通信
- mitt需要是同一个mitt否则无效
### validateInput
- 实现v-model，父组件可以拿到用户输入的数据
- 实现input类型(password)
  - 禁用透传Attributes来实现
- 完成验证规则
  - 失去焦点验证事件

## 新建文章
### 上传图片组件
### 支持markdown编写文章组件