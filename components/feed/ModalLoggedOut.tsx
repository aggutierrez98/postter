import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "hooks";
import Link from "next/link";
import { Fragment, useLayoutEffect, useState } from "react";

export const ModalLoggedOut = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-y-[72px]"
      enterTo="opacity-100 translate-y-0"
    >
      <Dialog
        open={isOpen}
        as="footer"
        className="fixed z-50 bottom-0 w-full phone:h-[72px] h-[95px] shadow-mh"
        onClose={() => {}}
      >
        <div className="bg-custom-primary shadow-xl transform transition-all h-full text-custom-text flex items-center justify-between">
          <h2 className="ml-5 md:ml-24 text-[16px] sm:text-lg md:text-xl lg:ml-48 xl:ml-[30%] flex-grow-1">
            {t("dont_miss")}
          </h2>
          <div className="mr-2 md:mr-20 flex items-center phone:flex-row flex-col">
            <Link href="/auth/login" passHref>
              <button
                className="bg-custom-primary outline-custom-alternative outline outline-1 text-custom-text rounded-full w-28 md:w-32 xl:w-40 
                h-[30px] phone:h-[40px] text-md md:text-lg font-bold shadow-md hover:opacity-80 transition-all"
              >
                {t("login")}
              </button>
            </Link>
            <Link href="/auth/register" passHref>
              <button
                className="phone:ml-3 mt-2 phone:m-0 bg-custom-alternative text-custom-text rounded-full w-28 md:w-32 xl:w-40 h-[30px] phone:h-[40px] text-md
                md:text-lg font-bold shadow-md hover:opacity-80 transition-all"
              >
                {t("register")}
              </button>
            </Link>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
