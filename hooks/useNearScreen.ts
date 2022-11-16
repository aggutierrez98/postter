import { MutableRefObject, useCallback, useRef } from "react";

interface Props {
  distance?: string;
  loading?: boolean;
  hasMore?: boolean;
  callback?: Function;
  deps?: [any];
  loadNextPage?: Function;
}

export const useNearScreen = ({
  distance = "100px",
  loading = false,
  hasMore = true,
  callback,
  loadNextPage,
}: Props) => {
  const call = useRef(callback);

  const observer: MutableRefObject<any> = useRef();
  const obsRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      Promise.resolve(
        typeof IntersectionObserver !== "undefined"
          ? IntersectionObserver
          : import("intersection-observer")
      ).then(() => {
        observer.current = new IntersectionObserver(
          (entries) => {
            if (
              (entries[0].isIntersecting && hasMore) ||
              entries[0].boundingClientRect.bottom < 0
            ) {
              if (loadNextPage) loadNextPage();
              if (call.current) call.current();
            }
          },
          {
            rootMargin: distance,
          }
        );
        if (node) observer.current.observe(node);
      });
    },
    [loading, hasMore, loadNextPage, distance, call]
  );

  return { obsRef };
};
