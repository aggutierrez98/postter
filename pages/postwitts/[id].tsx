import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { FollowResultInterface, TrendingResultInterface } from "interfaces";
import { fetchPostwitt, getPostwittIds } from "@firebase";
import { MainLayout, PostwittFeed } from "components";
import { useTranslation } from "hooks";
import { ReactElement } from "react";

interface Props {
  postData: any;
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export default function PostwittPage({ postData }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t(`${postData.userName} on Postter: ${postData.text}`)}</title>
        <meta name="description" content={t("meta_postwitt_description")} />
        <meta
          property="og:title"
          content={t(` ${postData.userName} on Postter: ${postData.text}`)}
        />
        <meta
          property="og:description"
          content={t("meta_postwitt_description")}
        />
        <meta
          name="og:image"
          content={postData.image ? postData.image : `${origin}/banner.jpg`}
        />
      </Head>
      <PostwittFeed postData={postData} />
    </>
  );
}

PostwittPage.getLayout = function getLayout(page: ReactElement) {
  const { trendingResults, followResults } = page.props;

  return (
    <MainLayout trendingResults={trendingResults} followResults={followResults}>
      {page}
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getPostwittIds();
  const paths = ids.map((id: string) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { id } = params;

  const trendingResults = await fetch("https://www.jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://www.jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const postSnapshot = await fetchPostwitt(id);

  if (!postSnapshot) {
    return {
      notFound: true,
    };
  }

  const postData = {
    ...postSnapshot,
    timestamp: postSnapshot.timestamp.toDate().toString(),
  };

  return {
    props: {
      trendingResults,
      followResults,
      postData,
    },
    revalidate: 86400,
  };
};
