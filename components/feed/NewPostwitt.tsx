import { Fragment, SetStateAction, useLayoutEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TextAreaAutosize, NewPostwittActions } from "components";
import { useInput, useTranslation } from "hooks";
import { AddImage } from "./AddImage";
import { Session } from "next-auth";
import Image from "next/image";
import defaultImage from "public/user-template.svg";
import { Transition } from "@headlessui/react";

export const NewPostwitt = () => {
  const { data: session }: { data: Session } = useSession();
  const { t } = useTranslation();
  const [inputIsShowing, setInputIsShowing] = useState(false);
  useLayoutEffect(() => {
    setInputIsShowing(true);
  }, []);

  const {
    loading,
    addImage,
    addEmoji,
    selectedFile,
    showEmojis,
    fileImageRef: filePickerRef,
    setSelectedFile,
    setShowEmojis,
    text,
    newPostwittHandler,
    setText,
  } = useInput();

  return (
    <Transition
      show={inputIsShowing}
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <div
        className={`phone:px-3 py-3 flex space-x-1 phone:space-x-3 w-full scrollbar-hide ${
          loading && "opacity-60"
        }`}
      >
        <span>
          <Image
            width={44}
            height={44}
            src={session.user.image ? session.user.image : defaultImage}
            alt=""
            className="rounded-full cursor-pointer"
          />
        </span>
        <div className="flex-grow">
          <div className={`${selectedFile && "pb-7"} ${text && "space-y-2.5"}`}>
            <TextAreaAutosize
              value={text}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setText(e.target.value)
              }
              placeholder={t("whats_happening")}
              className="h-10 outline-none text-custom-text text-lg pl-[8px] pt-[10px] bg-transparent placeholder-custom-placeholder tracking-wide w-full"
            />
            {selectedFile && (
              <AddImage file={selectedFile} setFile={setSelectedFile} />
            )}
          </div>
          {!loading && (
            <div className="flex items-center justify-between pt-2">
              <NewPostwittActions
                addImageToPost={addImage}
                addEmoji={addEmoji}
                showEmojis={showEmojis}
                filePickerRef={filePickerRef}
                setShowEmojis={setShowEmojis}
              />
              <button
                className="bg-custom-alternative text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:opacity-80
              transition-all disabled:hover:bg-opacity-[0.75] disabled:opacity-50 disabled:cursor-default"
                disabled={!text && !selectedFile}
                onClick={newPostwittHandler}
              >
                Postwitt
              </button>
            </div>
          )}
        </div>
      </div>
    </Transition>
  );
};
