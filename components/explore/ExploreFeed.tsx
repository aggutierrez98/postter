import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { watchHastags } from "@firebase";
import { HashtagCard, Header } from "components";
import { HashtagInterface } from "interfaces";
import { useTranslation } from "hooks";

export const ExploreFeed = ({ hashtagsFromServer }) => {
  const [hashtags, setHashtags] = useState(hashtagsFromServer);
  const { t } = useTranslation();

  useEffect(() => {
    watchHastags(setHashtags);
  }, []);

  return (
    <div className=" border-l border-r border-custom-secondary min-h-full">
      <Header title={t("explore")} />
      {hashtags.length > 0 ? (
        <section className="pb-72">
          {hashtags?.map((hashtag: HashtagInterface) => (
            <HashtagCard
              key={hashtag.hashtag}
              hashtag={hashtag.hashtag}
              count={hashtag.postwitts}
            />
          ))}
        </section>
      ) : (
        <section className="flex items-center justify-center flex-col h-[150px] w-full ">
          <h2 className="text-xl bg-custom-alternative px-8 py-4 text-custom-primary rounded-[10px]">
            {t("no_hashtags_already")}
          </h2>
        </section>
      )}
    </div>
  );
};
