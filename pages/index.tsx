import Head from "next/head";
import { getProviders, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Feed } from "components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home / Postter</title>
      </Head>
      <Feed />
    </>
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
