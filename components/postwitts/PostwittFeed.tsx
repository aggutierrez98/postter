import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { watchPostwitt } from "@f/index";
import { Postwitt, RepliesList } from "components";
import { PostwittInterface } from "interfaces";

export const PostwittFeed = ({ postData }) => {
  const [postwitt, setPostwitt] = useState<PostwittInterface>(postData);
  const router = useRouter();
  const { id }: { id?: string } = router.query;

  useEffect(() => watchPostwitt(id, setPostwitt), [id]);

  return (
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
        postwitt={postwitt}
        timestampFromServer={postData.timestamp}
        postPage
      />
      <RepliesList postId={id} />
    </div>
  );
};
