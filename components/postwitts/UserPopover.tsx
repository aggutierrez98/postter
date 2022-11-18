import { auth, getUser } from "@firebase";
import { Popover, Transition } from "@headlessui/react";
import { useTranslation } from "hooks";
import { UserInterface } from "interfaces";
import Image from "next/image";
import defaultImage from "public/user-template.svg";
import React, { Fragment, useEffect, useState } from "react";

export const UserPopover = ({ userId, open }) => {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState<UserInterface>(null);

  useEffect(() => {
    getUser(userId).then((res) => {
      setUserInfo(res.data());
    });
  }, [userId]);

  return (
    <Popover className="relative">
      <Transition
        as={Fragment}
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 w-[250px] px-4 py-3 mt-3 top--32 left-0 bg-custom-primary rounded-md shadow-mh">
          <div className="flex w-full flex-col items-start ">
            <div className="bg-custom-primary flex items-center justify-center">
              <Image
                className="rounded-full"
                width={40}
                height={40}
                src={userInfo?.image ? userInfo.image : defaultImage}
              />
            </div>
            <span className="flex flex-col text-custom-text mt-[10px] mb-[5px] truncate w-full">
              <span className="font-bold">{userInfo?.name}</span>
              <span className=" text-custom-placeholder">@{userInfo?.tag}</span>
            </span>
            <span className=" text-custom-text truncate w-full">
              {userInfo?.biography ? userInfo.biography : "No biography"}
            </span>
            <div className="text-custom-text mt-[5px]">
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
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
