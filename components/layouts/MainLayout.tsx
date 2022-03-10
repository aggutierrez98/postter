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
import Head from "next/head";
import { ReactElement, useContext, useEffect, useState } from "react";
import {
  FollowResultInterface,
  TrendingResultInterface,
} from "../../interfaces/index";

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

  useEffect(() => {
    userExists(session?.user.uid, setExist);

    if (!exist) {
      newUser(session?.user);
    }
  }, []);

  if (!session) return <Login providers={providers} />;

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300&display=swap"
          rel="stylesheet"
        />
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
