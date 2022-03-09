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
import { Profile } from "components/Profile";
import { db } from "../../firebase/firebase.config";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
  providers: typeof SessionProvider;
  userData: UserInterface;
}

export default function UserPage({ userData }: Props) {
  const [userInfo, setUserInfo] = useState<UserInterface>();
  useEffect(() => watchUser(userData.uid, setUserInfo), [db]);

  return (
    <>
      <Head>
        <title>
          {userInfo ? userInfo.name : userData.name} (
          {userInfo ? userInfo.tag : userData.tag}) / Postter
        </title>
      </Head>
      <Profile userData={userInfo ? userInfo : userData} />
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
  let userData = await getUser(userId);
  userData = userData.data();
  return {
    props: {
      trendingResults,
      followResults,
      providers,
      userData,
    },
    // revalidate: 10,
  };
};
