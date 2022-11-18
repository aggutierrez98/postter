import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ErrorBoundary } from "react-error-boundary";
import { NextPage } from "next";
import { Fallback, MainLayout } from "components";
import { UserProvider, PostProvider } from "context";
import "../styles/globals.css";
import "../styles/emoji.css";
import { usePreserveScroll } from "hooks";
import { auth } from "@firebase";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout): ReactElement {
  const getLayout = Component.getLayout || ((page) => page);

  usePreserveScroll();

  return (
    <SessionProvider session={session}>
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
