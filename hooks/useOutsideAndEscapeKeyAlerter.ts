import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";

export const useOutsideAndEscapeKeyAlerter = (
  wrapperRef: MutableRefObject<HTMLElement>,
  buttonRef: MutableRefObject<HTMLElement>,
  setRender: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const shouldUnmount =
        !wrapperRef?.current?.contains(event.target as Node) &&
        !buttonRef?.current?.contains(event.target as Node);
      if (shouldUnmount) setRender(false);
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setRender(false);
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, setRender, buttonRef]);
};
