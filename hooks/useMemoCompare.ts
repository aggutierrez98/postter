import { useEffect, useRef } from "react";

export const useMemoCompare = (
  next: any,
  compare: { (a: any, b: any): boolean; (arg0: undefined, arg1: any): any }
) => {
  const previousRef = useRef();
  const previous = previousRef.current;
  const isEqual = compare(previous, next);
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });
  return isEqual ? previous : next;
};
