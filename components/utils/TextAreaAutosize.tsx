import { useState, useEffect, useRef, ChangeEventHandler } from "react";

interface Props {
  minHeight?: string;
  [x: string]: any;
}

export const TextAreaAutosize = (props: Props) => {
  const { minHeight, ...restOfProps } = props;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>("");
  const [textAreaHeight, setTextAreaHeight] = useState<string>("");

  useEffect(() => {
    setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`);
  }, [text]);

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setTextAreaHeight("");
    setText(event.target.value);

    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <textarea
      {...restOfProps}
      ref={textAreaRef}
      style={{
        height: textAreaHeight,
        width: "100%",
        resize: "none",
        minHeight: minHeight || "auto",
      }}
      onChange={onChange}
    />
  );
};
