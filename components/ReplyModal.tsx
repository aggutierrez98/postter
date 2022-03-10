import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { TextAreaAutosize, TimeFormated } from "components";
import { db } from "../firebase/firebase.config";
import { useSession } from "next-auth/react";
import { PostContext, PostContextProps } from "context/posts/PostContext";
import { NewPostwittActions } from "./NewPostwittActions";
import { useInput } from "hooks";
import { AddImage } from "./AddImage";
import { Session } from "next-auth";
import { watchPostwitt } from "../firebase/clients/postwitts";
import { PostwittInterface } from "interfaces";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export const ReplyModal = () => {
  const { data: session }: { data: Session } = useSession();
  const { modalReplyIsOpen, setModalReplyIsOpen, postwittId } =
    useContext<PostContextProps>(PostContext);
  const [postwitt, setPostwitt] = useState<PostwittInterface>();

  const {
    addImage,
    addEmoji,
    showEmojis,
    fileImageRef: filePickerRef,
    setShowEmojis,
    selectedFile,
    setSelectedFile,
    text,
    setText,
    replyPostwittHandler,
  } = useInput();

  useEffect(() => {
    watchPostwitt(postwittId, setPostwitt);
    return () => {
      watchPostwitt(postwittId, setPostwitt);
      // setShowEmojis(false);
    };
  }, [postwittId, setShowEmojis]);

  return (
    <Transition.Root show={modalReplyIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 phone:pt-8 overflow-auto"
        onClose={setModalReplyIsOpen}
      >
        <div
          className="items-start justify-center min-h-[800px] sm:min-h-screen phone:pt-4 phone:px-4 pb-20
         text-center flex p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-primary phone:bg-[#5b7083] phone:bg-opacity-40 transition-opacity" />
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
              className="flex flex-col align-bottom bg-primary rounded-2xl text-left  phone:shadow-xl 
            transform transition-all phone:my-8  max-w-xl phone:h-auto h-screen min-w-0 "
            >
              <div className="flex items-center px-1.5 py-2 border-b border-secondary w-full">
                <div
                  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                  onClick={() => setModalReplyIsOpen(false)}
                >
                  <CloseOutlinedIcon className="h-[22px] text-white" />
                </div>
              </div>
              <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                <div className="w-full">
                  <div className="text-placeholder flex relative">
                    <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-secondary" />
                    <img
                      src={postwitt?.userImg}
                      alt=""
                      className="h-11 w-11 rounded-full mr-2"
                    />
                    <div className="w-5/6">
                      <div className="inline-block group">
                        <h4 className="font-bold text-[15px] sm:text-base text-text inline-block">
                          {postwitt?.userName}
                        </h4>
                        <span className="ml-1.5 text-sm sm:text-[15px]">
                          @{postwitt?.tag}
                        </span>
                      </div>{" "}
                      .{" "}
                      <span className="hover:underline text-sm sm:text-[15px]">
                        {postwitt && (
                          <TimeFormated
                            time={
                              new Date(postwitt?.timestamp.toDate().toString())
                            }
                          />
                        )}
                      </span>
                      <p className="text-text text-[15px] sm:text-base break-words ">
                        {postwitt?.text}
                      </p>
                    </div>
                  </div>
                  <div className="mt-7 flex space-x-3 w-full">
                    <img
                      src={session.user.image}
                      alt=""
                      className="h-11 w-11 rounded-full"
                    />
                    <div className={`flex-grow mt-2 ${selectedFile && "pb-7"}`}>
                      <TextAreaAutosize
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Postwitt your reply"
                        rows="2"
                        className="bg-transparent outline-none text-text text-lg placeholder-placeholder tracking-wide 
                        w-full min-h-[80px]"
                      />
                      {selectedFile && (
                        <AddImage
                          file={selectedFile}
                          setFile={setSelectedFile}
                        />
                      )}
                      <div className="flex items-center justify-between pt-2.5">
                        <NewPostwittActions
                          addImageToPost={addImage}
                          addEmoji={addEmoji}
                          showEmojis={showEmojis}
                          filePickerRef={filePickerRef}
                          setShowEmojis={setShowEmojis}
                        />
                        <button
                          className="bg-alternative text-white rounded-full px-4 py-1.5 font-bold shadow-md 
                          hover:bg-opacity-[.75] transition-all disabled:hover:bg-alternative disabled:opacity-50 disabled:cursor-default"
                          type="submit"
                          onClick={replyPostwittHandler}
                          disabled={!text.trim()}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
