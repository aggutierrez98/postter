import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { watchHastags } from "@firebase/index";
import { HashtagCard } from "components";
import { HashtagInterface } from "interfaces";

export const ExploreFeed = ({ hashtagsFromServer }) => {
  const router = useRouter();
  const [hashtags, setHashtags] = useState(hashtagsFromServer);

  useEffect(() => {
    watchHastags(setHashtags);
  }, []);

  return (
    <div className=" border-l border-r border-custom-secondary min-h-full">
      <div
        className="flex items-center px-1.5 py-2 border-b border-custom-secondary text-custom-text font-semibold 
        text-xl gap-x-4 sticky top-0 z-50 bg-custom-primary"
      >
        <div
          className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
          onClick={() => {
            router.back();
            router.push("/");
          }}
        >
          <ArrowBackIcon className="h-5 text-custom-text" />
        </div>
        <div className="flex flex-col">Explore</div>
      </div>
      <div className="pb-72">
        {hashtags?.map((hashtag: HashtagInterface) => (
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
