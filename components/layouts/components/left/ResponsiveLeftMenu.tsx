import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Fragment, useContext, useEffect, useState } from "react";
import defaultImage from "public/user-template.svg";
import { watchUser } from "@f/index";
import { PostContext, PostContextProps, UserContext } from "context";
import { UserInterface } from "interfaces";
import { LeftMenuLinkList } from "components";
import { useTranslation } from "hooks";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

export const ResponsiveLeftMenu = () => {
  const { setModalLeftMenuIsOpen, modalLeftMenuIsOpen } =
    useContext<PostContextProps>(PostContext);
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<UserInterface>(session?.user);
  const { t } = useTranslation();

  useEffect(() => {
    if (session) {
      watchUser(session?.user.uid, setUserInfo);
      return () => {
        watchUser(session?.user.uid, setUserInfo);
      };
    }
  }, [session?.user, session, modalLeftMenuIsOpen]);
  const { setModalConfigIsOpen, setIsLoadingScreen } = useContext(UserContext);

  return (
    <Transition.Root show={modalLeftMenuIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0"
        onClose={setModalLeftMenuIsOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0 translate-x-[-280px] "
          enterTo="opacity-100 translate-x-0"
          leave="ease-in duration-150"
          leaveFrom="opacity-100 translate-x-0 "
          leaveTo="opacity-0 translate-x-[-280px]"
        >
          <div className="flex items-start justify-start min-h-screen phone:hidden">
            <menu className=" bg-custom-primary shadow-xl transform transition-all sm:my-8 sm:align-middle w-[280px] h-screen">
              <div className="flex items-center justify-between px-1.5 py-2 border-b border-custom-secondary">
                <h3 className="text-custom-text text-lg font-bold ml-2 truncate">
                  {t("account")}
                </h3>
                <div
                  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                  onClick={() => {
                    setModalLeftMenuIsOpen(false);
                  }}
                >
                  <CloseOutlinedIcon className="h-[22px] text-custom-text" />
                </div>
              </div>
              <div className="flex pt-[16px] px-[16px] w-full flex-col items-start">
                {session && (
                  <>
                    <div
                      className="bg-custom-primary flex 
                    items-center justify-center"
                    >
                      <Image
                        className="rounded-full"
                        width={40}
                        height={40}
                        src={userInfo?.image ? userInfo.image : defaultImage}
                      ></Image>
                    </div>
                    <span className="flex flex-col text-custom-text mt-[16px] mb-[15px]">
                      <span className="font-bold">{userInfo?.name}</span>
                      <span className=" text-custom-placeholder">
                        @{userInfo?.tag}
                      </span>
                    </span>
                    <span className="text-custom-text font-bold truncate w-full">
                      {userInfo?.biography
                        ? userInfo.biography
                        : "No biography"}
                    </span>
                    <div className="text-custom-text mt-[10px]">
                      <span>
                        <span className="text-custom-text mr-1 font-bold">
                          {userInfo?.following ? userInfo.following.length : 0}
                        </span>
                        <span className="text-custom-placeholder">
                          {t("following")}
                        </span>
                      </span>
                      <span className="ml-5">
                        <span className="text-custom-text mr-1 font-bold">
                          {userInfo?.followers ? userInfo.followers.length : 0}
                        </span>
                        <span className="text-custom-placeholder">
                          {t("followers")}
                        </span>
                      </span>
                    </div>
                  </>
                )}
                <LeftMenuLinkList />
                <button
                  className="text-custom-text hover:font-bold flex items-center space-x-2 w-full py-[16px] focus-visible:outline-none 
                    focus-visible:font-bold"
                  onClick={() => {
                    setModalConfigIsOpen(true);
                  }}
                >
                  <SettingsIcon className="h-[20px] w-[20px]" />
                  <span className="inline text-[15px]">{t("settings")}</span>
                  <span className="hidden xl:inline">{t("options")}</span>
                </button>
                {session && (
                  <button
                    className="text-custom-text hover:font-bold flex items-center space-x-2 w-full py-[16px] focus-visible:outline-none 
                   focus-visible:font-bold"
                    onClick={async () => {
                      setIsLoadingScreen(true);
                      await signOut({
                        callbackUrl: `${window.location.origin}/auth/login`,
                      });
                      setIsLoadingScreen(false);
                    }}
                  >
                    <LogoutIcon className="h-[20px] w-[20px]" />
                    <span className="inline text-[15px]">{t("logout")}</span>
                    <span className="hidden xl:inline">{t("options")}</span>
                  </button>
                )}
              </div>
            </menu>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};
