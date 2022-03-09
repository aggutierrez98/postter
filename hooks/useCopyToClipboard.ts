import { useState } from "react";

export const useCopyToClipboard = () => {
  const [value, setValue] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setValue(text);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      console.log(error);
    }
  };

  return { copyToClipboard, data: { value, success } };
};
