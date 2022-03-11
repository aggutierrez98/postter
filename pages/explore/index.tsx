import { getProviders, SessionProvider } from "next-auth/react";
import Head from "next/head";
import { FollowResultInterface, TrendingResultInterface } from "interfaces";
import { GetStaticProps } from "next";
import { getHashtags } from "../../firebase/clients/hastags";
import { ExploreFeed } from "components";
import { MainLayout } from "components/layouts/MainLayout";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
  providers: typeof SessionProvider;
  hashtags: {
    hashtag: string;
    postwitts: number;
  };
}

export default function BookmarksPage({
  hashtags,
  trendingResults,
  followResults,
  providers,
}: Props) {
  return (
    <MainLayout
      trendingResults={trendingResults}
      followResults={followResults}
      providers={providers}
    >
      <Head>
        <title>Explore / Postter</title>
        <meta
          property="og:description"
          content="Search for most popular hashtags"
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
  const providers = await getProviders();
  const hashtags = await getHashtags();

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      hashtags,
    },
    // revalidate: 10,
  };
};
