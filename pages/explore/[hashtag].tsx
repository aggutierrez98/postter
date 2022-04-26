import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { FollowResultInterface, TrendingResultInterface } from "interfaces";
import { getHashtags } from "@f/index";
import { HashtagPostwittsList, MainLayout } from "components";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
  hashtag: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export default function HashtagPage({ hashtag }: Props) {
  return (
    <>
      <Head>
        <title>{hashtag} / Postter</title>
        <meta property="description" content={`${hashtag} postwitts`} />
        <meta property="og:title" content={`${hashtag} / Postter`} />
        <meta property="og:description" content={`${hashtag} postwitts`} />
        <meta name="og:image" content={`${origin}/banner.jpg`} />
      </Head>
      <HashtagPostwittsList hashtag={hashtag} />
    </>
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
