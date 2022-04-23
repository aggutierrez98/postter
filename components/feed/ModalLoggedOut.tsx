import { Dialog } from "@headlessui/react";
import { useTranslation } from "hooks";
import Link from "next/link";

export const ModalLoggedOut = () => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={true}
      as="footer"
      className="hidden phone:block fixed z-50 bottom-0 w-full h-[72px] shadow-mh"
      onClose={() => {}}
    >
      <div className="bg-custom-primary shadow-xl transform transition-all h-full text-custom-text flex items-center justify-between">
        <h2 className="ml-5 md:ml-24 text-[16px] sm:text-lg md:text-xl lg:ml-48 xl:ml-[30%] flex-grow-1">
          {t("dont_miss")}
        </h2>
        <div className="mr-2 md:mr-20">
          <Link href="/auth/login" passHref>
            <button
              className="bg-custom-primary outline-custom-alternative outline outline-1 text-custom-text rounded-full w-24 md:w-32 xl:w-40 
                    h-[40px] text-md md:text-lg font-bold shadow-md hover:opacity-80 transition-all"
            >
              {t("login")}
            </button>
          </Link>
          <Link href="/auth/register" passHref>
            <button
              className="ml-3 bg-custom-alternative text-custom-text rounded-full w-24 md:w-32 xl:w-40 h-[40px] text-md md:text-lg font-bold 
                    shadow-md hover:opacity-80 transition-all"
            >
              {t("register")}
            </button>
          </Link>
        </div>
      </div>
    </Dialog>
  );
};
