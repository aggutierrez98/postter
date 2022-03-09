import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { PostContext, PostContextProps } from "context/posts/PostContext";
import Image from "next/image";
import { useSession } from "next-auth/react";
import defaultImage from "public/banner.jpg";
import { watchUser } from "../firebase/clients/users";
import { db } from "../firebase/firebase.config";
import { UserInterface } from "../interfaces/index";
import { LeftMenuLinkList } from "./LeftMenuLinkList";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export const ResponsiveLeftMenu = () => {
  const { modalLeftMenuIsOpen, setModalLeftMenuIsOpen } =
    useContext<PostContextProps>(PostContext);
  const {
    data: { user },
  } = useSession();
  const [userInfo, setUserInfo] = useState<UserInterface>(user);

  useEffect(() => watchUser(user.uid, setUserInfo), [db, user]);

  return (
    <Transition.Root show={modalLeftMenuIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0"
        onClose={setModalLeftMenuIsOpen}
      >
        <div className="flex items-start justify-start min-h-screen phone:hidden ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className=" bg-primary shadow-xl 
            transform transition-all sm:my-8 sm:align-middle w-[280px] h-screen overflow-scroll"
            >
              <div className="flex items-center justify-between px-1.5 py-2 border-b border-secondary">
                <h3 className="text-text text-lg font-bold ml-2 truncate">
                  Account Information
                </h3>
                <div
                  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                  onClick={() => {
                    setModalLeftMenuIsOpen(false);
                  }}
                >
                  <CloseOutlinedIcon className="h-[22px] text-white" />
                </div>
              </div>
              <div className="flex pt-[16px] px-[16px] w-full flex-col items-start h-[70px]">
                <div
                  className="bg-primary flex 
                    items-center justify-center"
                >
                  <Image
                    className="rounded-full"
                    width={40}
                    height={40}
                    src={userInfo ? userInfo.image : defaultImage}
                  ></Image>
                </div>
                <span className="flex flex-col text-text mt-[16px] mb-[15px]">
                  <span className="font-bold">{userInfo?.name}</span>
                  <span className=" text-placeholder">@{userInfo?.tag}</span>
                </span>
                <span className=" text-text font-bold">
                  {userInfo.biography ? userInfo.biography : "No biography"}
                </span>
                <div className="text-text mt-[10px]">
                  <span>
                    <span className="text-text mr-1 font-bold">
                      {userInfo.following ? userInfo.following.length : 0}
                    </span>
                    <span className="text-placeholder">Following</span>
                  </span>
                  <span className="ml-5">
                    <span className="text-text mr-1 font-bold">
                      {userInfo.followers ? userInfo.followers.length : 0}
                    </span>
                    <span className="text-placeholder">Followers</span>
                  </span>
                </div>
                <LeftMenuLinkList userInfo={userInfo} />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};