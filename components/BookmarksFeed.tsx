import { DocumentData } from "firebase/firestore";
import { Postwitt } from "./Postwitt";
import { useEffect, useState } from "react";
import { watchBookmarkedPostwitts } from "../firebase/clients/postwitts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { UserInterface } from "interfaces";

interface Props {
  bookmarks: string[];
  userInfo: UserInterface;
}

export const BookmarksFeed = ({ bookmarks, userInfo }: Props) => {
  const router = useRouter();
  const [postwitts, setPostwitts] = useState([]);

  useEffect(
    () => watchBookmarkedPostwitts(bookmarks, setPostwitts),
    [bookmarks]
  );

  return (
    <div className="border-l border-r border-secondary min-h-full">
      <div
        className="flex items-center px-1.5 py-2 border-b border-secondary text-white font-semibold 
            text-xl gap-x-4 top-0 z-50 bg-primary"
      >
        <div
          className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
          onClick={() => {
            router.back();
            router.push("/");
          }}
        >
          <ArrowBackIcon className="h-5 text-white" />
        </div>
        <div className="flex flex-col mb-1">
          Bookmarks
          <span className="text-placeholder text-sm leading-[8px]">
            @{userInfo?.tag}
          </span>
        </div>
      </div>
      <div className="pb-72">
        {postwitts.map((postwitt: DocumentData) => {
          return (
            <Postwitt
              key={postwitt.id}
              postwittId={postwitt.id}
              postwitt={postwitt.data()}
            />
          );
        })}
      </div>
    </div>
  );
};
