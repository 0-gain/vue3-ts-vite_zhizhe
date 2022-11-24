import { createVNode, render } from "vue";
import MessageVue from "./Message.vue";
import { MessageType } from "@/types/interface";

let timer: number;

export default ({ type, message }: { type: MessageType; message: string }) => {
  // 创建虚拟节点,创建的节点和props
  const vnode = createVNode(MessageVue, { type, message });
  // 准备一个dom容器
  const node = document.createElement("div");
  node.setAttribute("class", "message-container");
  document.body.appendChild(node);
  // 将虚拟节点渲染DOM容器中
  render(vnode, node);
  // 开启定时器
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    // 移除DOM容器内容
    render(null, node);
  }, 2000);
};
