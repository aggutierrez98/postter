import { useOutsideAndEscapeKeyAlerter } from "hooks";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import dynamic from "next/dynamic";
import { useRef } from "react";
const Picker = dynamic(async () => {
  const { Picker } = await import("emoji-mart");
  // @ts-ignore
  await import("emoji-mart/css/emoji-mart.css");
  return Picker;
});

export const NewPostwittActions = ({
  addImageToPost,
  addEmoji,
  showEmojis,
  filePickerRef,
  setShowEmojis,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  useOutsideAndEscapeKeyAlerter(wrapperRef, buttonRef, setShowEmojis);

  return (
    <div className="flex items-center relative">
      <div className="icon" onClick={() => filePickerRef.current.click()}>
        <InsertPhotoOutlinedIcon className="text-alternative h-[22px]" />
        <input
          type="file"
          ref={filePickerRef}
          hidden
          onChange={addImageToPost}
          accept="image/png,image/jpeg,image/jpg"
        />
      </div>

      <div className="icon">
        <GifBoxOutlinedIcon className="text-alternative h-[22px]" />
      </div>

      <div
        ref={buttonRef}
        className="icon"
        onClick={() => setShowEmojis(!showEmojis)}
      >
        <InsertEmoticonOutlinedIcon className="text-alternative h-[22px]" />
      </div>

      <div className="icon">
        <EventOutlinedIcon className="text-alternative h-[22px]" />
      </div>
      {showEmojis && (
        <div
          style={{
            position: "absolute",
            marginTop: "465px",
            marginLeft: -40,
            maxWidth: "320px",
            borderRadius: "20px",
            zIndex: 100,
          }}
          ref={wrapperRef}
        >
          <Picker
            // @ts-ignore
            perLine={7}
            emoji="wave"
            emojiTooltip={true}
            className="emoji-custom"
            id="emoji-picker"
            onSelect={addEmoji}
            title="Postter"
            theme="dark"
          />
        </div>
      )}
    </div>
  );
};
