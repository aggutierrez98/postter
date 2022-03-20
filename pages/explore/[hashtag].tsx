import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { FollowResultInterface, TrendingResultInterface } from "interfaces";
import { getHashtags, watchHastagsPostwitts } from "@f/index";
import { HashtagPostwittsList, MainLayout } from "components";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
  hashtag: string;
}

export default function HashtagPage({
  hashtag,
  trendingResults,
  followResults,
}: Props) {
  const [hastagPostwitts, setHastagPostwitts] = useState([]);

  useEffect(() => {
    watchHastagsPostwitts(hashtag, setHastagPostwitts);
  }, [hashtag]);

  return (
    <MainLayout trendingResults={trendingResults} followResults={followResults}>
      <Head>
        <title>{hashtag} / Postter</title>
        <meta property="og:description" content={`${hashtag} postwitts`} />
      </Head>
      <HashtagPostwittsList hashtag={hashtag} postwitts={hastagPostwitts} />
    </MainLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const hashtags = await getHashtags();
  const paths = hashtags.map((hashtag) => ({
    params: { hashtag: hashtag.hashtag },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { hashtag } = params;

  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );

  return {
    props: {
      trendingResults,
      followResults,
      hashtag,
    },
    // revalidate: 10,
  };
};
