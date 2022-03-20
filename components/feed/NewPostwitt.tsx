import { SetStateAction } from "react";
import { signOut, useSession } from "next-auth/react";
import { TextAreaAutosize, NewPostwittActions } from "components";
import { useInput } from "hooks";
import { AddImage } from "./AddImage";
import { Session } from "next-auth";
import Image from "next/image";
import defaultImage from "public/user-template.png";

export const NewPostwitt = () => {
  const { data: session }: { data: Session } = useSession();

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
          onClick={() =>
            signOut({
              callbackUrl: `${window.location.origin}/auth/login`,
            })
          }
        />
      </span>
      <div className="flex-grow">
        <div className={`${selectedFile && "pb-7"} ${text && "space-y-2.5"}`}>
          <TextAreaAutosize
            value={text}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setText(e.target.value)
            }
            placeholder="What's happening?"
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
  );
};
