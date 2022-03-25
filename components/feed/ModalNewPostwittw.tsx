import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { PostContext, PostContextProps } from "context/posts/PostContext";
import { NewPostwitt } from "components";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export const ModalNewPostwitt = () => {
  const { setModalNewIsOpen, modalNewIsOpen } =
    useContext<PostContextProps>(PostContext);

  return (
    <Transition.Root show={modalNewIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 phone:pt-8 overflow-auto"
        onClose={setModalNewIsOpen}
      >
        <div
          className="flex items-start justify-center min-h-[800px] sm:min-h-screen phone:pt-4 phone:px-4 phone:pb-20
         text-center sm:block sm:p-0"
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
            <Dialog.Overlay className="fixed inset-0 bg-custom-primary  phone:bg-[#5b7083] phone:bg-opacity-40 transition-opacity" />
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
            transform transition-all sm:my-8 sm:align-middle sm:max-w-[550px] sm:w-full w-full h-screen phone:h-auto"
            >
              <div className="flex items-center px-1.5 py-2 border-b border-custom-secondary">
                <div
                  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                  onClick={() => {
                    setModalNewIsOpen(false);
                  }}
                >
                  <CloseOutlinedIcon className="h-[22px] text-custom-text" />
                </div>
              </div>
              <div className="px-4 pt-5 pb-2.5 sm:px-6 ">
                <NewPostwitt />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
