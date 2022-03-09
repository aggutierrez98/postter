import { Dialog, Transition } from "@headlessui/react";
import { PostContext } from "context/posts/PostContext";
import { deletePostwitt } from "../firebase/clients/postwitts";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import {
  userPinupPostwitt,
  userPinoffPostwitt,
} from "../firebase/clients/users";
import { useRouter } from "next/router";

export const ModalConfirmation = ({ postPage }: { postPage?: boolean }) => {
  const {
    setModalConfirmIsOpen,
    modalConfirmIsOpen,
    modalConfirmData,
    postwittId,
  } = useContext(PostContext);
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Transition
      as="div"
      show={modalConfirmIsOpen}
      enter="ease duration-1500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed z-50 inset-0 phone:pt-8 flex phone:items-center justify-center "
    >
      <Dialog
        as="div"
        className="fixed z-50 inset-0 phone:pt-8 flex phone:items-center justify-center "
        onClose={() => setModalConfirmIsOpen(false)}
      >
        <Dialog.Overlay className="fixed inset-0 bg-primary phone:bg-[#5b7083] phone:bg-opacity-40 transition-opacity">
          {loading && (
            <img
              className="absolute left-[60px] bottom-[60px] animate-spin  loading__image w-[80px]"
              src={"/loading.png"}
              alt="loading-image"
            />
          )}
        </Dialog.Overlay>
        <div
          className="inline-block align-bottom bg-primary rounded-2xl text-left p-[32px] phone:shadow-xl 
                transform transition-all sm:my-8 sm:align-middle sm:max-w-[320px] sm:w-full"
        >
          <div className="flex items-center justify-between px-1.5 py-2 flex-col text-text">
            <h2 className="text-2xl mb-2">{modalConfirmData.title}</h2>
            <p className="text-placeholder">{modalConfirmData.description}</p>
            <div className="flex flex-col mt-[24px]">
              <button
                onClick={() => {
                  if (modalConfirmData.action === "Delete") {
                    setLoading(true);
                    deletePostwitt(postwittId);
                    if (postPage) router.push("/");
                    setLoading(false);
                    setModalConfirmIsOpen(false);
                  }

                  if (modalConfirmData.action === "Pin on") {
                    setLoading(true);
                    userPinupPostwitt(postwittId, session.user.uid);
                    setLoading(false);
                    setModalConfirmIsOpen(false);
                  }

                  if (modalConfirmData.action === "Pin off") {
                    setLoading(true);
                    userPinoffPostwitt(session.user.uid);
                    setLoading(false);
                    setModalConfirmIsOpen(false);
                  }
                }}
                className={`w-[256px] h-[44px] ${
                  modalConfirmData.danger ? "bg-red-700" : "bg-alternative"
                } rounded-3xl mb-[12px]`}
              >
                {modalConfirmData.action}
              </button>
              <button
                onClick={() => {
                  setModalConfirmIsOpen(false);
                }}
                className="w-[256px] h-[44px] bg-placeholder rounded-3xl text-primary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
