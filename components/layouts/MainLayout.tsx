import {
  LeftSidebar,
  ModalConfirmation,
  ModalEditUser,
  ModalNewPostwitt,
  ReplyModal,
  ResponsiveLeftMenu,
  RightSidebar,
  ModalOptions,
  ModalLoggedOut,
} from "components";
import { ReactElement, useCallback, useContext, useEffect } from "react";
import {
  FollowResultInterface,
  TrendingResultInterface,
} from "interfaces/index";
import { useSession } from "next-auth/react";
import { useToogleTheme, useTranslation } from "hooks";
import { useRouter } from "next/router";
import { PostContext, UserContext } from "context";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
  children: ReactElement[] | ReactElement;
}

export const MainLayout = ({
  trendingResults,
  followResults,
  children,
}: Props) => {
  useTranslation();
  useToogleTheme();
  const { data: session } = useSession();
  const { events } = useRouter();

  const {
    setModalLeftMenuIsOpen,
    setModalNewIsOpen,
    setModalReplyIsOpen,
    setModalConfirmIsOpen,
  } = useContext(PostContext);
  const { setModalConfigIsOpen, setIsOpen } = useContext(UserContext);

  const close = useCallback(() => {
    setModalLeftMenuIsOpen(false);
    setModalNewIsOpen(false);
    setModalReplyIsOpen(false);
    setModalConfirmIsOpen(false);
    setModalConfigIsOpen(false);
    setIsOpen(false);
  }, [
    setModalLeftMenuIsOpen,
    setModalNewIsOpen,
    setModalReplyIsOpen,
    setModalConfirmIsOpen,
    setModalConfigIsOpen,
    setIsOpen,
  ]);

  useEffect(() => {
    events.on("routeChangeStart", close);
    return () => {
      events.off("routeChangeStart", close);
    };
  }, [close, events]);

  return (
    <div>
      <main className="bg-custom-primary min-h-screen flex justify-center mx-auto max-h-screen">
        <LeftSidebar />
        <div
          id="main"
          className="flex flex-grow overflow-y-auto md:pr-10 justify-start xl:justify-end 3xl:justify-start relative"
        >
          <div className="w-[600px] min-w-0 max-w-2xl flex-grow min-h-full">
            {children}
          </div>
          <RightSidebar
            trendingResults={trendingResults}
            followResults={followResults}
          />
        </div>
        <ModalNewPostwitt />
        <ReplyModal />
        <ModalEditUser />
        <ModalConfirmation />
        <ResponsiveLeftMenu />
        <ModalOptions />

        {!session && <ModalLoggedOut />}
      </main>
    </div>
  );
};
