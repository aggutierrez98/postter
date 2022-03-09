import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ErrorBoundary } from "react-error-boundary";
import { PostProvider } from "context/posts/PostContext";
import { UserProvider } from "context/users/UserContext";
import "../styles/globals.css";
import "../styles/emoji.css";
import { NextPage } from "next";
import Fallback from "components/FallbackComponent";
import getLayoutForEveryPage from "helpers/getLayout";

// TODO: Por hacer:
// 1) Agregar opciones de login
// 2) Agregar logo propio de Postter tanto en LeftSideBar como en Login
// 4) Implementar configuraciones en mas opciones: 1ero->Idioma, 2ndo-> Modo claro/oscuro
// 5) Cambiar los placeholders de el RightSideBar
// 7) Arreglar animaciones del transition de headlessui
// 8) Hacer funcionar barra de busqueda junto con la funcionalidad de explorar
// 9) Cargado paginado de postwitts
// 10) Agregar features de mensajes y notificaciones

type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout): ReactElement {
  const getLayout = getLayoutForEveryPage;

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
