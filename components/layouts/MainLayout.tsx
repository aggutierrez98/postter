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
import { PostContext } from "context/posts/PostContext";
import { UserContext } from "context/users/UserContext";
import { ReactElement, useContext } from "react";
import {
  FollowResultInterface,
  TrendingResultInterface,
} from "interfaces/index";
import Head from "next/head";
import { useToogleTheme, useTranslation } from "hooks";
import { useSession } from "next-auth/react";

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
  const {
    modalNewIsOpen,
    modalReplyIsOpen,
    modalConfirmIsOpen,
    modalLeftMenuIsOpen,
  } = useContext(PostContext);
  const { modalIsOpen: modalEditUserOpen, modalConfigIsOpen } =
    useContext(UserContext);
  useTranslation();
  useToogleTheme();
  const { data: session } = useSession();

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
        {modalNewIsOpen && <ModalNewPostwitt />}
        {modalReplyIsOpen && <ReplyModal />}
        {modalEditUserOpen && <ModalEditUser />}
        {modalConfirmIsOpen && <ModalConfirmation />}
        {modalLeftMenuIsOpen && <ResponsiveLeftMenu />}
        {modalConfigIsOpen && <ModalOptions />}
        {!session && <ModalLoggedOut />}
      </main>
    </div>
  );
};
