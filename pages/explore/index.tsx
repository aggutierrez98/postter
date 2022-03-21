import Head from "next/head";
import { FollowResultInterface, TrendingResultInterface } from "interfaces";
import { GetStaticProps } from "next";
import { getHashtags } from "@f/index";
import { ExploreFeed, MainLayout } from "components";
import { useTranslation } from "hooks";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
  hashtags: {
    hashtag: string;
    postwitts: number;
  };
}

export default function BookmarksPage({
  hashtags,
  trendingResults,
  followResults,
}: Props) {
  const { t } = useTranslation();

  return (
    <MainLayout trendingResults={trendingResults} followResults={followResults}>
      <Head>
        <title>{t("explore")} / Postter</title>
        <meta name="description" content={t("meta_explore_description")} />
        <meta
          property="og:description"
          content={t("meta_explore_description")}
        />
      </Head>
      <ExploreFeed hashtagsFromServer={hashtags} />
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const hashtags = await getHashtags();

  return {
    props: {
      trendingResults,
      followResults,
      hashtags,
    },
    // revalidate: 10,
  };
};
