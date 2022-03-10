import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { watchHastags } from "../firebase/clients/hastags";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { db } from "../firebase/firebase.config";
import { HashtagCard } from "./HashtagCard";

export const ExploreFeed = ({ hashtagsFromServer }) => {
  const router = useRouter();
  const [hashtags, setHashtags] = useState(hashtagsFromServer);

  useEffect(() => {
    watchHastags(setHashtags);
  }, []);

  return (
    <div className=" border-l border-r border-secondary min-h-full">
      <div
        className="flex items-center px-1.5 py-2 border-b border-secondary text-white font-semibold 
        text-xl gap-x-4 sticky top-0 z-50 bg-primary"
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
        <div className="flex flex-col">Explore</div>
      </div>
      <div className="pb-72">
        {hashtags?.map((hashtag) => (
          <HashtagCard
            key={hashtag.hashtag}
            hashtag={hashtag.hashtag}
            count={hashtag.postwitts}
          />
        ))}
      </div>
    </div>
  );
};
