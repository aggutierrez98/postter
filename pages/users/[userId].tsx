import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import {
  FollowResultInterface,
  TrendingResultInterface,
  UserInterface,
} from "interfaces";
import { getUser, watchUser, getUsersIds } from "@f/index";
import { Profile, MainLayout } from "components";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
  userData: UserInterface;
}

export default function UserPage({
  userData,
  trendingResults,
  followResults,
}: Props) {
  const [userInfo, setUserInfo] = useState<UserInterface>();
  useEffect(() => watchUser(userData.uid, setUserInfo), [userData?.uid]);

  return (
    <MainLayout trendingResults={trendingResults} followResults={followResults}>
      <Head>
        <title>
          {userInfo ? userInfo.name : userData.name} (
          {userInfo ? userInfo.tag : userData.tag}) / Postter
        </title>
        <meta
          property="og:description"
          content={`See ${userInfo?.name} profile`}
        />
      </Head>
      <Profile userData={userInfo ? userInfo : userData} />
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

  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  let userData = await getUser(userId);

  if (!userData) {
    return {
      notFound: true,
    };
  }

  userData = userData.data();

  return {
    props: {
      trendingResults,
      followResults,
      userData,
    },
    revalidate: 86400,
  };
};
