import { Fragment, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { PostContext, UserContext } from "context";
import {
  deletePostwitt,
  userPinupPostwitt,
  userPinoffPostwitt,
} from "@f/index";
import { LoadingCircle } from "components/layouts";
import { useTranslation } from "hooks";

export const ModalConfirmation = ({ postPage }: { postPage?: boolean }) => {
  const {
    setModalConfirmIsOpen,
    modalConfirmData,
    postwittId,
    modalConfirmIsOpen,
  } = useContext(PostContext);
  const { setLoadingChanges } = useContext(UserContext);
  const { data: session } = useSession();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Transition as="div" show={modalConfirmIsOpen}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 phone:pt-8 flex phone:items-center justify-center "
        onClose={() => setModalConfirmIsOpen(false)}
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
          <Dialog.Overlay className="fixed inset-0 bg-custom-primary phone:bg-[#5b7083] phone:bg-opacity-40 transition-opacity">
            <LoadingCircle />
          </Dialog.Overlay>
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className="inline-block align-bottom bg-custom-primary rounded-2xl text-left p-[32px] phone:shadow-xl 
                transform transition-all sm:my-8 sm:align-middle sm:max-w-[320px] sm:w-full"
          >
            <div className="flex items-center justify-between px-1.5 py-2 flex-col text-custom-text">
              <h2 className="text-2xl mb-2">{modalConfirmData?.title}</h2>
              <p className="text-custom-placeholder">
                {modalConfirmData?.description}
              </p>
              <div className="flex flex-col mt-[24px]">
                <button
                  onClick={async () => {
                    if (modalConfirmData?.action === "delete") {
                      setLoadingChanges(true);
                      await deletePostwitt(postwittId);
                      if (postPage) router.push("/");
                      setLoadingChanges(false);
                      setModalConfirmIsOpen(false);
                    }

                    if (modalConfirmData?.action === "pin_on") {
                      setLoadingChanges(true);
                      await userPinupPostwitt(postwittId, session.user.uid);
                      setLoadingChanges(false);
                      setModalConfirmIsOpen(false);
                    }

                    if (modalConfirmData?.action === "pin_off") {
                      setLoadingChanges(true);
                      await userPinoffPostwitt(session.user.uid);
                      setLoadingChanges(false);
                      setModalConfirmIsOpen(false);
                    }
                  }}
                  className={`w-[256px] h-[44px] ${
                    modalConfirmData?.danger
                      ? "bg-red-700"
                      : "bg-custom-alternative"
                  } rounded-3xl mb-[12px] text-white`}
                >
                  {t(modalConfirmData?.action)}
                </button>
                <button
                  onClick={() => {
                    setModalConfirmIsOpen(false);
                  }}
                  className="w-[256px] h-[44px] bg-custom-placeholder rounded-3xl text-custom-primary"
                >
                  {t("cancel")}
                </button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
