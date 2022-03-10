import { getProviders, SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import Head from "next/head";
import { FollowResultInterface, TrendingResultInterface } from "interfaces";
import { GetStaticPaths, GetStaticProps } from "next";

import {
  getHashtags,
  watchHastagsPostwitts,
} from "../../firebase/clients/hastags";
import { db } from "../../firebase/firebase.config";
import { HashtagPostwittsList } from "components/HashtagPostwittsList";
import { MainLayout } from "components/layouts/MainLayout";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
  providers: typeof SessionProvider;
  hashtag: string;
}

export default function HashtagPage({
  hashtag,
  trendingResults,
  followResults,
  providers,
}: Props) {
  const [hastagPostwitts, setHastagPostwitts] = useState([]);

  useEffect(() => {
    watchHastagsPostwitts(hashtag, setHastagPostwitts);
  }, [hashtag]);

  return (
    <MainLayout
      trendingResults={trendingResults}
      followResults={followResults}
      providers={providers}
    >
      <Head>
        <title>{hashtag} / Postter</title>
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

  console.log({ hashtag });

  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const providers = await getProviders();

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      hashtag,
    },
    // revalidate: 10,
  };
};
