import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { watchPostwitt } from "@firebase";
import { Postwitt, RepliesList, Header } from "components";
import { PostwittInterface } from "interfaces";

export const PostwittFeed = ({ postData }) => {
  const [postwitt, setPostwitt] = useState<PostwittInterface>(postData);
  const router = useRouter();
  const { id }: { id?: string } = router.query;

  useEffect(() => watchPostwitt(id, setPostwitt), [id]);

  return (
    <div className="border-l border-r border-custom-secondary min-h-full">
      <Header title="Postwitt" />
      <Postwitt
        postwittId={id}
        postwitt={postwitt}
        timestampFromServer={postData.timestamp}
        postPage
      />
      <RepliesList postId={id} />
    </div>
  );
};
