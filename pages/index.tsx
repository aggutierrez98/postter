import Head from "next/head";
import { Feed, MainLayout } from "components";
import {
  TrendingResultInterface,
  FollowResultInterface,
} from "interfaces/index";
import { useTranslation } from "hooks";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export default function Home({ trendingResults, followResults }: Props) {
  const { t } = useTranslation();

  return (
    <MainLayout trendingResults={trendingResults} followResults={followResults}>
      <Head>
        <title>{t("home")} / Postter</title>
        <meta name="description" content={t("meta_home_description")} />
        <meta property="og:title" content={`${t("home")} / Postter`} />
        <meta property="og:description" content={t("meta_home_description")} />
        <meta name="og:image" content={`${origin}/banner.jpg`} />
      </Head>
      <Feed />
    </MainLayout>
  );
}

export const getServerSideProps = async () => {
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
