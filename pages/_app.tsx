import { ReactElement, ReactNode, useEffect } from "react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ErrorBoundary } from "react-error-boundary";
import { NextPage } from "next";
import { Fallback } from "components";
import { UserProvider, PostProvider } from "context";
import "../styles/globals.css";
import "../styles/emoji.css";
import { usePreserveScroll } from "hooks";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppPropsWithLayout): ReactElement {
  const getLayout = Component.getLayout || ((page) => page);

  usePreserveScroll();

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("helpers/braze").then(
        ({ initialize, openSession, requestImmediateDataFlush }) => {
          initialize(process.env.NEXT_PUBLIC_BRAZE_API_KEY, {
            baseUrl: process.env.NEXT_PUBLIC_BRAZE_SDK_ENDPOINT,
            enableLogging: true,
          });
          openSession();
          requestImmediateDataFlush();
        }
      );
    }
  }, []);

  return (
    <SessionProvider>
      <PostProvider>
        <UserProvider>
          <ErrorBoundary fallback={<Fallback />}>
            {getLayout(<Component {...pageProps} />)}
          </ErrorBoundary>
        </UserProvider>
      </PostProvider>
    </SessionProvider>
  );
}
