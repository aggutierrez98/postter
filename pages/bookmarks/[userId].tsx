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
import { db } from "../../firebase/firebase.config";
import { BookmarksFeed } from "components/BookmarksFeed";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
  providers: typeof SessionProvider;
  userId: string;
  bookmarks: string[];
}

export default function BookmarksPage({ userId, bookmarks }: Props) {
  const [userInfo, setUserInfo] = useState<UserInterface>();

  useEffect(() => watchUser(userId, setUserInfo), [db]);

  return (
    <>
      <Head>
        <title>Bookmarks / Postter</title>
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
  const providers = await getProviders();
  const userData = await getUser(userId);
  const { bookmarks } = userData.data();

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
