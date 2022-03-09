import { SetStateAction } from "react";
import { signOut, useSession } from "next-auth/react";
import { TextAreaAutosize } from "components";
import { useInput } from "hooks";
import { AddImage } from "./AddImage";
import { NewPostwittActions } from "./NewPostwittActions";
import { Session } from "next-auth";

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
      <img
        src={session.user.image}
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer"
        onClick={() => signOut()}
      />
      <div className="flex-grow">
        <div className={`${selectedFile && "pb-7"} ${text && "space-y-2.5"}`}>
          <TextAreaAutosize
            value={text}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setText(e.target.value)
            }
            placeholder="What's happening?"
            className="bg-transparent h-10 outline-none text-text text-lg pl-[8px] pt-[10px] placeholder-placeholder tracking-wide w-full"
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
              className="bg-alternative text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-opacity-[0.75] 
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
