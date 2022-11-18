import { watchHastagsPostwitts } from "@firebase";
import { useEffect, useState } from "react";
import { usePaginatedLogic } from "./usePaginetedLogic";

export const useLoadHashtagPostwitts = ({ hashtag }) => {
  const [postwitts, setPostwitts] = useState([]);

  const { hasMore, loading, setLoading, pageNumber, loadNextPage } =
    usePaginatedLogic(postwitts.length);

  useEffect(() => {
    watchHastagsPostwitts(hashtag, setPostwitts, setLoading, pageNumber);
  }, [hashtag, pageNumber, setLoading]);

  return { postwitts, loading, loadNextPage, hasMore };
};
