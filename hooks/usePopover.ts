import { MouseEventHandler, useState } from "react";

export const usePopover = () => {
  const [open, setOpen] = useState(false);
  let timeout: NodeJS.Timeout;
  const timeoutDuration = 300;

  const onHover: MouseEventHandler = (e) => {
    clearTimeout(timeout);
    if (e.type === "mouseenter") {
      timeout = setTimeout(() => setOpen(true), timeoutDuration);
    } else if (e.type === "mouseleave") {
      timeout = setTimeout(() => setOpen(false), timeoutDuration);
    }
  };

  return { open, onHover };
};
