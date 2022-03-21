import Head from "next/head";
import { Feed } from "components";
import { MainLayout } from "components/layouts/MainLayout";
import {
  TrendingResultInterface,
  FollowResultInterface,
} from "interfaces/index";
import { getToken } from "next-auth/jwt";
import { useTranslation } from "hooks";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
}

export default function Home({ trendingResults, followResults }: Props) {
  const { t } = useTranslation();

  return (
    <MainLayout trendingResults={trendingResults} followResults={followResults}>
      <Head>
        <title>{t("home")} / Postter</title>
        <meta name="description" content={t("meta_home_description")} />
        <meta property="og:description" content={t("meta_home_description")} />
      </Head>
      <Feed />
    </MainLayout>
  );
}

export const getServerSideProps = async ({ req }) => {
  const session = await getToken({ req, secret: process.env.JWT_SECRET_SEED });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

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
