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
      <section className="pb-72">
        {hashtags?.map((hashtag: HashtagInterface) => (
          <HashtagCard
            key={hashtag.hashtag}
            hashtag={hashtag.hashtag}
            count={hashtag.postwitts}
          />
        ))}
      </section>
    </div>
  );
};
