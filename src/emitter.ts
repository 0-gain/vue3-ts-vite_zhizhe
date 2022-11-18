import mitt from "mitt";
export type ValidateFunc = () => boolean;
type Events = {
  "form-login": ValidateFunc;
};
export const emitter = mitt<Events>();
