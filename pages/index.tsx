import Head from "next/head";
import { Feed, MainLayout } from "components";
import { useTranslation } from "hooks";
import { ReactElement } from "react";

const origin = typeof window === "undefined" ? "" : window.location.origin;

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("home")} / Postter</title>
        <meta name="description" content={t("meta_home_description")} />
        <meta property="og:title" content={`${t("home")} / Postter`} />
        <meta property="og:description" content={t("meta_home_description")} />
        <meta name="og:image" content={`${origin}/banner.jpg`} />
      </Head>
      <Feed />
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  const { trendingResults, followResults } = page.props;

  return (
    <MainLayout trendingResults={trendingResults} followResults={followResults}>
      {page}
    </MainLayout>
  );
};

export const getStaticProps = async () => {
  const trendingResults = await fetch("https://www.jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://www.jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );

  return {
    props: {
      trendingResults,
      followResults,
    },
  };
};
