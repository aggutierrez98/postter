import Head from "next/head";
import { FollowResultInterface, TrendingResultInterface } from "interfaces";
import { GetStaticProps } from "next";
import { getHashtags } from "@firebase";
import { ExploreFeed, MainLayout } from "components";
import { useTranslation } from "hooks";
import { ReactElement } from "react";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
  hashtags: {
    hashtag: string;
    postwitts: number;
  };
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export default function BookmarksPage({ hashtags }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("explore")} / Postter</title>
        <meta name="description" content={t("meta_explore_description")} />
        <meta property="og:title" content={t("explore")} />
        <meta
          property="og:description"
          content={t("meta_explore_description")}
        />
        <meta name="og:image" content={`${origin}/banner.jpg`} />
      </Head>
      <ExploreFeed hashtagsFromServer={hashtags} />
    </>
  );
}

BookmarksPage.getLayout = function getLayout(page: ReactElement) {
  const { trendingResults, followResults } = page.props;

  return (
    <MainLayout trendingResults={trendingResults} followResults={followResults}>
      {page}
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const trendingResults = await fetch("https://www.jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://www.jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const hashtags = await getHashtags();

  return {
    props: {
      trendingResults,
      followResults,
      hashtags,
    },
    revalidate: 86400,
  };
};
