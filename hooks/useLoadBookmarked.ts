import { watchBookmarkedPostwitts } from "@f/index";
import { useEffect, useState } from "react";
import { usePaginatedLogic } from "./usePaginetedLogic";

export const useLoadBookmarked = (bookmarks: string[]) => {
  const [postwitts, setPostwitts] = useState([]);

  const { hasMore, loading, setLoading, pageNumber, loadNextPage } =
    usePaginatedLogic(postwitts.length);

  useEffect(
    () =>
      watchBookmarkedPostwitts(bookmarks, setPostwitts, setLoading, pageNumber),
    [bookmarks, pageNumber, setLoading]
  );
  return { postwitts, loading, loadNextPage, hasMore };
};
