// // import {
// //   watchPostwittLikes,
// //   watchPostwittReplies,
// //   watchPostwittReposts,
// // } from "firebase/clients";
import {
  watchPostwittLikes,
  watchPostwittReplies,
  watchPostwittReposts,
} from "../firebase";
import { DocumentData } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useLayoutEffect, useState } from "react";

interface Props {
  idOriginal: string;
  repostedBy: string;
  postwittId: string;
}

export const usePostwitt = ({ idOriginal, repostedBy, postwittId }: Props) => {
  const { data: session } = useSession();
  const [replies, setReplies] = useState<DocumentData[]>([]);
  const [likes, setLikes] = useState<DocumentData[]>([]);
  const [liked, setLiked] = useState<boolean>(false);
  const [reposted, setReposted] = useState(false);
  const [reposts, setReposts] = useState([]);

  const [isPostwittShown, setIsPostwittShown] = useState(false);
  useLayoutEffect(() => {
    setIsPostwittShown(true);
  }, []);

  useEffect(() => {
    watchPostwittReplies(repostedBy ? idOriginal : postwittId, setReplies);
    return () => {
      setReplies([]);
    };
  }, [postwittId, repostedBy, idOriginal]);
  useEffect(() => {
    watchPostwittLikes(repostedBy ? idOriginal : postwittId, setLikes);
    return () => {
      setLikes([]);
    };
  }, [postwittId, repostedBy, idOriginal]);
  useEffect(() => {
    watchPostwittReposts(repostedBy ? idOriginal : postwittId, setReposts);
    return () => {
      setReposts([]);
    };
  }, [postwittId, repostedBy, idOriginal]);
  useEffect(() => {
    setLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1);
    return () => {
      setLiked(false);
    };
  }, [likes, session?.user.uid]);
  useEffect(() => {
    setReposted(
      reposts.findIndex(
        (repost) => repost.data().userId === session?.user.uid
      ) !== -1
    );
    return () => {
      setReposted(false);
    };
  }, [reposts, session?.user.uid]);

  return {
    replies,
    likes,
    liked,
    reposted,
    reposts,
    isPostwittShown,
  };
};
