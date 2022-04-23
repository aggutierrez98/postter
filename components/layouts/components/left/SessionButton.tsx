import { Fragment } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Popover, Transition } from "@headlessui/react";
import defaultImage from "public/user-template.svg";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

export const SessionButton = () => {
  const {
    data: { user },
  } = useSession();

  return (
    <Popover className="flex flex-grow relative">
      {({ open }) => (
        <>
          <Popover.Button className="self-end justify-self-end text-custom-text flex height-full items-center justify-center hoverAnimation xl:-mr-5 mb-2">
            <Image
              width={40}
              height={40}
              src={user?.image ? user?.image : defaultImage}
              alt=""
              className="rounded-full"
            />
            <div className="hidden xl:inline leading-5 ml-2">
              <h4 className="font-bold truncate">{user?.name}</h4>
              <p className="text-custom-terciary truncate">@{user?.tag}</p>
            </div>
            <div className="hidden xl:inline ml-5">
              <MoreHorizOutlinedIcon />
            </div>
          </Popover.Button>

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
            <Popover.Panel className="absolute z-10 w-[250px] pt-1 bottom-20 bg-custom-primary rounded-md shadow-mh">
              <div className="flex w-full flex-col items-start ">
                <div className="bg-custom-primary flex items-center pl-4 border-b w-full border-custom-secondary pb-2 mb-2">
                  <Image
                    className="rounded-full"
                    width={40}
                    height={40}
                    src={user?.image ? user.image : defaultImage}
                  />
                  <div className="flex flex-col text-custom-text mt-[10px] mb-2 ml-3">
                    <span className="font-bold">{user?.name}</span>
                    <span className=" text-custom-placeholder">
                      @{user?.tag}
                    </span>
                  </div>
                </div>
                <button
                  className="text-custom-text text-left pl-4 p-2 mb-2 hover:bg-black dark:hover:bg-white hover:bg-opacity-[0.12] dark:hover:bg-opacity-[0.03] transition-all"
                  onClick={() =>
                    signOut({
                      callbackUrl: `${window.location.origin}/auth/login`,
                    })
                  }
                >
                  Cerrar la sesion de @{user?.tag}
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
