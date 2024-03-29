import { watchPostwittReplies } from "@firebase";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { PostwittInterface } from "interfaces";
import { useEffect, useState } from "react";
import { usePaginatedLogic } from "./usePaginetedLogic";

export const useLoadPostwittsReplies = ({ postId }) => {
  const [replies, setReplies] = useState<
    PostwittInterface[] | QueryDocumentSnapshot[]
  >([]);
  const { hasMore, loading, setLoading, pageNumber, loadNextPage } =
    usePaginatedLogic(replies.length);

  useEffect(() => {
    watchPostwittReplies(postId, setReplies, setLoading, pageNumber);

    return () => setReplies([]);
  }, [postId, setLoading, pageNumber]);

  return { replies, loading, loadNextPage, hasMore };
};
