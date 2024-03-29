import { ReactElement, useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import {
  FollowResultInterface,
  TrendingResultInterface,
  UserInterface,
} from "interfaces";
import { getUser, watchUser, getUsersIds } from "@firebase";
import { MainLayout, Profile } from "components";
import { useTranslation } from "hooks";

interface Props {
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
  userData: UserInterface;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export default function UserPage({ userData }: Props) {
  const [userInfo, setUserInfo] = useState<UserInterface>();
  useEffect(() => watchUser(userData.uid, setUserInfo), [userData?.uid]);
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>
          {userInfo ? userInfo.name : userData.name} (
          {userInfo ? userInfo.tag : userData.tag}) / Postter
        </title>
        <meta name="description" content={t(`${userInfo?.name} profile`)} />
        <meta
          property="og:title"
          content={` ${userInfo ? userInfo.name : userData.name} (${
            userInfo ? userInfo.tag : userData.tag
          }) / Postter`}
        />
        <meta
          property="og:description"
          content={t(`${userInfo ? userInfo.name : userData.name} profile`)}
        />
        <meta
          name="og:image"
          content={
            userInfo?.bannerImg
              ? userInfo.bannerImg
              : userData.bannerImg
              ? userData.bannerImg
              : `${origin}/banner.jpg`
          }
        />
      </Head>
      <Profile userData={userInfo ? userInfo : userData} />
    </>
  );
}

UserPage.getLayout = function getLayout(page: ReactElement) {
  const { trendingResults, followResults } = page.props;

  return (
    <MainLayout trendingResults={trendingResults} followResults={followResults}>
      {page}
    </MainLayout>
  );
};

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

  const trendingResults = await fetch("https://www.jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://www.jsonkeeper.com/b/WWMJ").then(
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
