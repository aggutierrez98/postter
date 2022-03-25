import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { FollowResultInterface, TrendingResultInterface } from "interfaces";
import { fetchPostwitt, getPostwittIds } from "@f/index";
import { MainLayout, PostwittFeed } from "components";
import { useTranslation } from "hooks";

interface Props {
  postData: any;
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export default function PostwittPage({
  postData,
  trendingResults,
  followResults,
}: Props) {
  const { t } = useTranslation();

  return (
    <MainLayout trendingResults={trendingResults} followResults={followResults}>
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
          content={postData.image ? postData.image : `${origin}/banner.svg`}
        />
      </Head>
      <PostwittFeed postData={postData} />
    </MainLayout>
  );
}

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

  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
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
    // revalidate: 10,
  };
};
