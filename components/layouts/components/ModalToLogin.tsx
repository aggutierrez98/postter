import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { UserContext, UserContextProps } from "context/users/UserContext";
import icon from "public/post.png";
import Link from "next/link";
import { useTranslation } from "hooks";
import Image from "next/image";

export const ModalToLogin = () => {
  const { modalToLoginIsOpen, setModalToLoginOpen } =
    useContext<UserContextProps>(UserContext);
  const { t } = useTranslation();

  return (
    <Transition.Root show={modalToLoginIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-[55] inset-0 overflow-auto"
        onClose={setModalToLoginOpen}
      >
        <div
          className="flex items-center justify-center min-h-[800px] sm:min-h-screen phone:pt-4 phone:px-4 phone:pb-20
         text-center sm:p-0"
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
            <Dialog.Overlay className="fixed inset-0 bg-custom-primary phone:bg-[#5b7083] phone:bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-custom-primary phone:rounded-2xl text-left phone:shadow-xl 
            transform transition-all sm:my-8 sm:align-middle sm:max-w-[650px] sm:w-full w-full h-screen phone:h-auto"
            >
              <div className="flex items-center px-1.5 py-2 border-b border-custom-secondary">
                <div
                  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                  onClick={() => {
                    setModalToLoginOpen(false);
                  }}
                >
                  <CloseOutlinedIcon className="h-[22px] text-custom-text" />
                </div>
              </div>
              <div className="px-4 pt-1 pb-10 sm:px-6 flex flex-col justify-center items-center">
                <div className="flex items-center justify-center h-16 mt-1 xl:mt-2 mb-5">
                  <Image src={icon} width={60} height={40} />
                  <h1 className="text-[40px] ml-3 text-[#1d9bf0]">Postter</h1>
                </div>
                <h2 className="text-[18px] sm:text-2xl md:text-3xl flex-grow-1 mb-10 max-w-[80%] text-custom-text">
                  {t("create_account")}
                </h2>
                <Link href="/auth/login" passHref>
                  <button
                    className="bg-custom-primary outline-custom-alternative outline outline-1 text-custom-text rounded-full w-[80%] 
                    h-[55px] text-md md:text-lg font-bold shadow-md hover:opacity-80 transition-all mb-5"
                  >
                    {t("login")}
                  </button>
                </Link>
                <Link href="/auth/register" passHref>
                  <button
                    className="bg-custom-alternative text-custom-text rounded-full w-[80%] h-[55px] text-md md:text-lg font-bold 
                    shadow-md hover:opacity-80 transition-all"
                  >
                    {t("register")}
                  </button>
                </Link>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
