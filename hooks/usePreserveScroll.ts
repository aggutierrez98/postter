import { useRouter } from "next/router";
import { useEffect, useRef, useCallback } from "react";

export const usePreserveScroll = () => {
  const router = useRouter();
  const scrollPositions = useRef<{ [url: string]: number }>({});
  const isBack = useRef(false);

  const onRouteChangeStart = useCallback(() => {
    const url = router.pathname;
    const scollY = document.getElementById("main")?.scrollTop;
    scrollPositions.current[url] = scollY || 0;
  }, [router.pathname]);

  const onRouteChangeComplete = (url: any) => {
    if (isBack.current) {
      document.getElementById("main")?.scroll({
        top: scrollPositions.current[url],
      });
    } else {
      document.getElementById("main")?.scroll({
        top: 0,
      });
    }
    isBack.current = false;
  };

  useEffect(() => {
    router.beforePopState(() => {
      isBack.current = true;
      return true;
    });

    router.events.on("routeChangeStart", onRouteChangeStart);
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart);
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [router, onRouteChangeStart]);
};
