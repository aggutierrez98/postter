import { ChangeEvent, MouseEvent, useContext, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { PostContext, PostContextProps } from "context/posts/PostContext";
import { newPostwitt } from "../firebase/clients/postwitts";

export const useInput = () => {
  const { setModalReplyIsOpen, setModalNewIsOpen, postwittId } =
    useContext<PostContextProps>(PostContext);
  const [loading, setLoading] = useState<boolean>(false);
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>(null);
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const { data: session } = useSession<boolean>();
  const [text, setText] = useState<string>("");

  const getHastags = (text: string) => {
    const hastagRegex = /\B(#[a-zA-Z-0-9]+\b)(?!;)/g;
    const hastags: string[] = [];
    text.replace(hastagRegex, (hash: string) => {
      hastags.push(hash.slice(1).charAt(0).toUpperCase() + hash.slice(2));
      return hash;
    });
    return hastags;
  };

  const newPostwittHandler = async () => {
    if (loading) return;
    setLoading(true);

    const hashtags = getHastags(text);

    await newPostwitt(session.user, {
      text,
      file: selectedFile,
      hashtags,
    });

    setLoading(false);
    setShowEmojis(false);
    setSelectedFile(null);
    setText("");
    setModalNewIsOpen(false);
  };

  const replyPostwittHandler = async (e: MouseEvent<HTMLElement>) => {
    if (loading) return;
    setLoading(true);
    e.preventDefault();

    await newPostwitt(
      session.user,
      {
        text,
        file: selectedFile,
      },
      postwittId
    );

    setModalReplyIsOpen(false);
    setLoading(false);
    setText("");
    setSelectedFile(null);
  };

  const addImage = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (ev: ProgressEvent<FileReader>) => {
      setSelectedFile(ev.target.result.toString());
    };
  };

  const addEmoji = (event: { unified: string }) => {
    const sym = event.unified.split("-");
    const codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    setText(text + emoji);
  };

  return {
    fileImageRef: filePickerRef,
    showEmojis,
    addImage,
    addEmoji,
    loading,
    selectedFile,
    setSelectedFile,
    setShowEmojis,
    newPostwittHandler,
    replyPostwittHandler,
    text,
    setText,
  };
};
