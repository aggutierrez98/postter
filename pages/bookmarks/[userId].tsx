import { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  FollowResultInterface,
  TrendingResultInterface,
  UserInterface,
} from "interfaces";
import { getUser, watchUser, getUsersIds } from "@f/index";
import { BookmarksFeed, MainLayout } from "components";
import { useTranslation } from "hooks";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
  userId: string;
  bookmarks: string[];
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export default function BookmarksPage({ userId, bookmarks }: Props) {
  const [userInfo, setUserInfo] = useState<UserInterface>();
  const { t } = useTranslation();
  useEffect(() => watchUser(userId, setUserInfo), [userId]);

  return (
    <>
      <Head>
        <title>{t("bookmarks")} / Postter</title>
        <meta
          property="description"
          content={t(`bookmarks from ${userInfo?.name}`)}
        />
        <meta property="og:title" content={`${t("bookmarks")} / Postter`} />
        <meta
          property="og:description"
          content={t(`bookmarks from ${userInfo?.name}`)}
        />
        <meta name="og:image" content={`${origin}/banner.jpg`} />
      </Head>
      <BookmarksFeed
        bookmarks={userInfo?.bookmarks || bookmarks}
        userInfo={userInfo}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getUsersIds();
  const paths = ids.map((id: string) => ({
    params: { userId: id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { userId } = params;

  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const userData = await getUser(userId);

  if (!userData) {
    return {
      notFound: true,
    };
  }

  const bookmarks = userData.data().bookmarks || [];

  return {
    props: {
      trendingResults,
      followResults,
      userId,
      bookmarks,
    },
    // revalidate: 10,
  };
};
