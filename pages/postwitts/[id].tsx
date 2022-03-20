import { QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  FollowResultInterface,
  PostwittInterface,
  TrendingResultInterface,
} from "interfaces";
import {
  fetchPostwitt,
  getPostwittIds,
  watchPostwitt,
  watchPostwittReplies,
} from "@f/index";
import { Postwitt, MainLayout } from "components";

interface Props {
  postData: any;
  trendingResults: TrendingResultInterface[];
  followResults: FollowResultInterface[];
}

export default function PostwittPage({
  postData,
  trendingResults,
  followResults,
}: Props) {
  const [postwitt, setPostwitt] = useState<PostwittInterface>();
  const [replies, setReplies] = useState<
    PostwittInterface[] | QueryDocumentSnapshot[]
  >([]);
  const router: NextRouter = useRouter();
  const { id }: { id?: string } = router.query;

  useEffect(() => watchPostwitt(id, setPostwitt), [id]);
  useEffect(() => watchPostwittReplies(id, setReplies), [id]);

  return (
    <MainLayout trendingResults={trendingResults} followResults={followResults}>
      <Head>
        <title>
          {postwitt ? postwitt.userName : postData.userName} on Postter: "
          {postwitt ? postwitt.text : postData.text}"
        </title>
        <meta property="og:description" content={`See postwitt information`} />
      </Head>

      <div className="border-l border-r border-custom-secondary min-h-full">
        <div
          className="flex items-center px-1.5 py-2 border-b border-custom-secondary text-custom-text font-semibold 
            text-xl gap-x-4 sticky top-0 z-50 bg-custom-primary"
        >
          <div
            className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
            onClick={() => {
              router.back();
              router.push("/");
            }}
          >
            <ArrowBackIcon className="h-5 text-custom-text" />
          </div>
          Postwitt
        </div>
        <Postwitt
          postwittId={id}
          postwitt={postwitt ? postwitt : postData}
          timestampFromServer={!postwitt && postData.timestamp}
          postPage
        />
        {replies.length > 0 && (
          <div className="pb-72">
            {replies.map((reply: DocumentData) => {
              return (
                <Postwitt
                  key={reply.id}
                  postwittId={reply.id}
                  postwitt={reply.data()}
                />
              );
            })}
          </div>
        )}
      </div>
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
