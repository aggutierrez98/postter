import Head from "next/head";
import { getProviders, getSession, SessionProvider } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Feed } from "components";
import { MainLayout } from "components/layouts/MainLayout";
import { FollowResultInterface, TrendingResultInterface } from "interfaces";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
  providers: typeof SessionProvider;
  hashtag: string;
}

export default function Home({
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
        <title>Home / Postter</title>
        <meta
          property="og:description"
          content="Get in touch making posts with your friends"
        />
      </Head>
      <Feed />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
};
