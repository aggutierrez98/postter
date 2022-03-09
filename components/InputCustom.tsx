import { useState } from "react";

interface Props {
  label: string;
  focusClasses?: string;
  textarea?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  charsLimit?: number;
  limitClassName?: string;
  [x: string]: any;
}

export const InputCustom = ({
  focusClasses,
  label,
  textarea,
  containerClassName,
  labelClassName,
  charsLimit,
  limitClassName,
  onChange,
  ...props
}: Props) => {
  const [charsLenght, setCharsLenght] = useState<number>(null);

  return (
    <div className={containerClassName}>
      <label className={labelClassName}>
        <p>{label}</p>
        {charsLimit && typeof charsLenght === "number" && (
          <p className={`${charsLenght >= charsLimit ? limitClassName : ""}`}>
            {charsLenght} / {charsLimit}
          </p>
        )}
      </label>
      {textarea ? (
        <textarea
          {...props}
          maxLength={charsLimit}
          onChange={(e) => {
            if (onChange) onChange(e);
            setCharsLenght(e.target.value.length);
          }}
          onFocus={(e) => {
            setCharsLenght(e.target.value.length);
            e.target.parentElement.classList.add(...focusClasses.split(" "));
          }}
          onBlur={(e) => {
            setCharsLenght(null);
            e.target.parentElement.classList.remove(...focusClasses.split(" "));
          }}
        />
      ) : (
        <input
          {...props}
          maxLength={charsLimit}
          onChange={(e) => {
            if (onChange) onChange(e);
            setCharsLenght(e.target.value.length);
          }}
          onFocus={(e) => {
            setCharsLenght(e.target.value.length);
            e.target.parentElement.classList.add(...focusClasses.split(" "));
          }}
          onBlur={(e) => {
            setCharsLenght(null);
            e.target.parentElement.classList.remove(...focusClasses.split(" "));
          }}
        />
      )}
    </div>
  );
};
