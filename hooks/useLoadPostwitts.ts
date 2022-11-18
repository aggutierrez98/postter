import { watchPostwitts, watchReposts } from "@firebase";
import { useEffect, useState } from "react";
import { usePaginatedLogic } from "./usePaginetedLogic";

export const useLoadPostwitts = () => {
  const [totalPostwitts, setTotalPostwitts] = useState([]);
  const [reposts, setReposts] = useState([]);
  const [postwitts, setPostwitts] = useState([]);

  const { hasMore, loading, setLoading, pageNumber, loadNextPage } =
    usePaginatedLogic(totalPostwitts.length);

  useEffect(() => {
    watchPostwitts(setTotalPostwitts, setLoading, pageNumber);
  }, [pageNumber, setLoading]);

  useEffect(() => {
    watchReposts(setReposts);
  }, []);

  useEffect(() => {
    setPostwitts(
      [...totalPostwitts, ...reposts].sort((a, b) => b.timestamp - a.timestamp)
    );
  }, [reposts, totalPostwitts]);

  return { postwitts, loading, loadNextPage, hasMore };
};
