import { LeftSidebar } from "components/LeftSidebar";
import { Login } from "components/Login";
import { ModalConfirmation } from "components/ModalConfirmation";
import { ModalEditUser } from "components/ModalEditUser";
import { ModalNewPostwitt } from "components/ModalNewPostwittw";
import { ReplyModal } from "components/ReplyModal";
import { ResponsiveLeftMenu } from "components/ResponsiveLeftMenu";
import { RightSidebar } from "components/RightSidebar";
import { PostContext, PostContextProps } from "context/posts/PostContext";
import { UserContext, UserContextProps } from "context/users/UserContext";
import { newUser, userExists } from "../../firebase/clients/users";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactElement, useContext, useEffect, useState } from "react";
import {
  FollowResultInterface,
  TrendingResultInterface,
} from "../../interfaces/index";
import Head from "next/head";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
  providers: typeof SessionProvider;
  children: ReactElement[] | ReactElement;
}

export const MainLayout = ({
  trendingResults,
  followResults,
  children,
  providers,
}: Props) => {
  const {
    modalNewIsOpen,
    modalReplyIsOpen,
    modalConfirmIsOpen,
    modalLeftMenuIsOpen,
  } = useContext<PostContextProps>(PostContext);
  const { modalIsOpen: modalEditUserOpen } =
    useContext<UserContextProps>(UserContext);
  const { data: session } = useSession();
  const [exist, setExist] = useState<boolean>(true);
  const origin = typeof window === "undefined" ? "" : window.location.origin;

  useEffect(() => {
    if (session) {
      userExists(session?.user.uid, setExist);
      if (!exist) {
        newUser(session?.user);
      }
    }
  }, [exist, session]);

  if (!session) return <Login providers={providers} />;

  return (
    <div>
      <Head>
        <meta property="og:title" content="Posster" />
        <meta property="og:image" content={`${origin}/banner.jpg`} />;
      </Head>
      <main className="bg-primary min-h-screen flex justify-center mx-auto max-h-screen">
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
      </main>
    </div>
  );
};
