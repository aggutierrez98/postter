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
import { isInitialized } from "@braze/web-sdk";

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
        ({
          initialize,
          openSession,
          requestImmediateDataFlush,
          subscribeToInAppMessage,
          getUser,
          showInAppMessage,
          requestPushPermission,
          isPushPermissionGranted,
          isPushSupported,
          isPushBlocked,
          ControlMessage,
          InAppMessage,
        }) => {
          console.log(isInitialized());

          if (!isInitialized()) {
            initialize(process.env.NEXT_PUBLIC_BRAZE_API_KEY, {
              baseUrl: process.env.NEXT_PUBLIC_BRAZE_SDK_ENDPOINT,
              enableLogging: true,
              allowUserSuppliedJavascript: true,
            });
            openSession();
            requestImmediateDataFlush();
          }

          console.log({ userId: getUser().getUserId() });

          subscribeToInAppMessage((message) => {
            console.log(message);

            if (message instanceof ControlMessage) {
              console.log("Control message received");
              return showInAppMessage(message);
            }

            if (message instanceof InAppMessage) {
              console.log("In-app message received");
              const extras = message.extras;
              if (extras) {
                for (const key in extras) {
                  console.log(`key: ${key}, value: ${extras[key]}`);
                }
              }
            }

            showInAppMessage(message);
          });

          // ✅ Push setup
          if ("serviceWorker" in navigator && window.Notification) {
            navigator.serviceWorker
              .register("/service-worker.js")
              .then(() => {
                if (isPushSupported()) {
                  if (isPushPermissionGranted()) {
                    console.log("Push permission granted");
                  } else {
                    requestPushPermission((endpoint, publicKey, userAuth) => {
                      console.log({
                        endpoint,
                        publicKey,
                        userAuth,
                      });
                    });
                    // requestPushPermission(registration, {
                    //   vapidPublicKey: BRAZE_VAPID_PUBLIC_KEY,
                    // });
                  }
                }
              })
              .catch((err) =>
                console.error("Braze SW registration failed:", err)
              );
          }
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
