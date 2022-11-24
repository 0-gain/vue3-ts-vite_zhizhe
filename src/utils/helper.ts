export const objToArr = <T>(obj: { [key: string]: T }) => {
  return Object.keys(obj).map((key) => obj[key]);
};

export const arrToObj = <T extends { _id?: string }>(arr: Array<T>) => {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current;
    }
    return prev;
  }, {} as { [key: string]: T });
};

// 上传图片之前校验规则[类型、大小]

interface CheckCondition {
  format?: string[];
  size?: number;
}

type ErrorType = "size" | "format" | null;
export const beforeUploadValidate = (file: File, condition: CheckCondition) => {
  const { format, size } = condition;
  const isValidFormat = format ? format.includes(file.type) : true;
  // 获取到的图片大小是以字节为单位，我们需要将字节转换为mb,1mb = 1024kb,1kb = 1024b
  const isValidSize = size ? file.size / 1024 / 1024 < size : true;
  let error: ErrorType = null;

  if (!isValidFormat) {
    error = "format";
  } else if (!isValidSize) error = "size";

  return {
    passed: isValidFormat && isValidSize,
    error,
  };
};
