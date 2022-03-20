import { MainLayout } from "components/layouts/MainLayout";
import { FollowResultInterface, TrendingResultInterface } from "interfaces";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
}

const custom404 = ({ trendingResults, followResults }: Props) => {
  return (
    <MainLayout trendingResults={trendingResults} followResults={followResults}>
      <Head>
        <title>Page not found</title>
        <meta
          name="description"
          content="Page you are looking for is not found"
        />
        <meta
          property="og:description"
          content="Page you are looking for is not found"
        />
      </Head>
      <div className="flex items-center justify-center flex-col h-[250px] w-full">
        <h2 className="text-custom-text text-2xl">Page not found</h2>
        <Link href="/" passHref>
          <button className="mt-4 flex py-2 px-4 bg-custom-alternative rounded-full text-custom-text hover:opacity-80 transition-all">
            Go back to main page
          </button>
        </Link>
      </div>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
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
    },
  };
};

export default custom404;
