import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ErrorBoundary } from "react-error-boundary";
import { NextPage } from "next";
import { Fallback, MainLayout } from "components";
import { UserProvider, PostProvider } from "context";
import "../styles/globals.css";
import "../styles/emoji.css";

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
  const getLayout = (page: ReactElement) => {
    const { trendingResults, followResults } = page.props;

    console.log({ trendingResults, followResults });

    return (
      <MainLayout
        trendingResults={trendingResults}
        followResults={followResults}
      >
        {page}
      </MainLayout>
    );
  };

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
