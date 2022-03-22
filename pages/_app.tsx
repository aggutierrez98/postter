import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ErrorBoundary } from "react-error-boundary";
import { NextPage } from "next";
import { Fallback } from "components";
import { UserProvider, PostProvider } from "context";
import "../styles/globals.css";
import "../styles/emoji.css";

// TODO: Por hacer:
// 1) Cargado paginado de postwitts
// 2) Arreglar animaciones del transition de headlessui
// 3) Hacer funcionar barra de busqueda junto con la funcionalidad de explorar
// 4) Agregar logo propio de Postter tanto en LeftSideBar como en Login
// // 4) Cambiar los custom-placeholders de el RightSideBar
// // 8) Agregar features de mensajes y notificaciones

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
  return (
    <SessionProvider session={session}>
      <PostProvider>
        <UserProvider>
          <ErrorBoundary fallback={<Fallback />}>
            <Component {...pageProps} />
          </ErrorBoundary>
        </UserProvider>
      </PostProvider>
    </SessionProvider>
  );
}
