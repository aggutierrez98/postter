import { getProviders, SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import Head from "next/head";
import {
  FollowResultInterface,
  TrendingResultInterface,
  UserInterface,
} from "interfaces";
import { GetStaticPaths, GetStaticProps } from "next";
import { getUser, watchUser } from "../../firebase/clients/users";
import { getUsersIds } from "../../firebase/clients/users";
import { BookmarksFeed } from "components/BookmarksFeed";
import { MainLayout } from "components/layouts/MainLayout";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
  providers: typeof SessionProvider;
  userId: string;
  bookmarks: string[];
}

export default function BookmarksPage({
  userId,
  bookmarks,
  trendingResults,
  followResults,
  providers,
}: Props) {
  const [userInfo, setUserInfo] = useState<UserInterface>();

  useEffect(() => watchUser(userId, setUserInfo), [userId]);

  return (
    <MainLayout
      trendingResults={trendingResults}
      followResults={followResults}
      providers={providers}
    >
      <Head>
        <title>Bookmarks / Postter</title>
        <meta
          property="og:description"
          content={`Bookmarks from ${userInfo?.name}`}
        />
      </Head>
      <BookmarksFeed
        bookmarks={userInfo?.bookmarks || bookmarks}
        userInfo={userInfo}
      />
    </MainLayout>
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

  console.log({ userId });

  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const userData = await getUser(userId);
  const bookmarks = userData.data().bookmarks || [];

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      userId,
      bookmarks,
    },
    // revalidate: 10,
  };
};
