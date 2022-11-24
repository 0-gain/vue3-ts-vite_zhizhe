import mitt from "mitt";
export type ValidateFunc = () => boolean;
type Events = {
  "form-login": ValidateFunc;
  "isSame": boolean;
};
export const emitter = mitt<Events>();
